import React, { Component,PureComponent,createRef,Fragment,createContext } from 'react';
import $ from 'jquery';
import './index.css';
import RActions from 'r-actions';
const {getPercentByValue,getClient,eventHandler,getStartByStep,fix} = new RActions();
const ctx = createContext();
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.dom = createRef();
    this.touch = 'ontouchstart' in document.documentElement;
    this.styleName = this.getStyleName();
    this.state = {
      points:this.props.points
    };
    var step = this.props.step.toString();
    var dotPos = step.indexOf('.');
    this.fixValue = dotPos === -1?0:step.length - dotPos - 1;
  }
  static getDerivedStateFromProps(props,state){
    return {points:props.points}
  }
  update(points,final,context){
    var {onchange,ondrag} = this.props;
    if(final && onchange){onchange(context)}
    else if(ondrag){ondrag(context)}
    else{
      this.setState({points});
    }
  } 
  componentDidMount(){
    var position = $(this.dom.current).css('position');
    if(position === 'static'){$(this.dom.current).css('position','relative');}
  }
  getStyleName() {
    var {direction='right'} = this.props;
    if (direction === "right") { 
      return{Thickness:'width',StartSide:'left',direction:'row'};
    }
    else if (direction === "left") { 
      return{Thickness:'width',StartSide:'right',direction:'row-reverse'}; 
    }
    else if (direction === "down") { 
      return{Thickness:'height',StartSide:'top',direction:'column'};
    }
    else if (direction === "up") { 
      return{Thickness:'height',StartSide:'bottom',direction:'column-reverse'};
    }
  } 
  getOffset(mousePosition,size,e){
    var {direction:d,start,end,step} = this.props,client = getClient(e),offset;
    if(d === 'left'){offset = mousePosition.x - client.x;}
    else if(d === 'right'){offset = client.x - mousePosition.x;}
    else if(d === 'up'){offset = mousePosition.y - client.y;}
    else if(d === 'down'){offset = client.y - mousePosition.y;}
    return  Math.round((end - start) * offset / size / step) * step;
  }
  getClassName(className){
    var {direction} = this.props;
    var oriention = direction==="left" || direction === "right" ? "horizontal" : "vertical";
    return 'r-slider ' + oriention + (className && typeof className === 'string'?' ' + className:'')
  }
  getValue(value){return typeof value === 'function'?value(this.props):value; }
  getStyle(){
    var {style = {},backgroundColor} = this.props;
    return $.extend({},{background:this.getValue(backgroundColor)},style);
  }
  getValidPoints(points,min,max){
    for(var i = 0; i < points.length; i++){
      var point = points[i];
      if(point.value < min){point.value = min;}
      if(point.value > max){point.value = max;}
    }
  }
  render() {
    var {className,id,start,end,min = start,max = end} = this.props;
    var {points} = this.state;
    this.getValidPoints(points,min,max);
    var contextValue = {...this.props};
    contextValue.points = points;
    contextValue.styleName = this.styleName; 
    contextValue.update = this.update.bind(this);
    contextValue.getValue = this.getValue.bind(this);
    contextValue.getOffset = this.getOffset.bind(this);
    contextValue.touch = this.touch;
      return (
        <ctx.Provider value={contextValue}>
          <div style={this.getStyle()} className={this.getClassName(className)} ref={this.dom} id={id}>
            <SliderContainer />
          </div>
        </ctx.Provider>
      );
  }
}
Slider.defaultProps = {
  start:0,step:1,end:100,points:[{value:0}],direction:'right',labels:[],
  margin:0,labelPosition:{x:0,y:0}
}
class SliderContainer extends Component { 
  static contextType = ctx;
  constructor(props) {
    super(props);
    this.dom = createRef()
  }
  render() {
    return (
      <div className='r-slider-container' ref={this.dom}>
        <RSliderPins />
        <RSliderLabels />
        <Line />
        <Ranges />
      </div>
    );
  }
}
class RSliderPins extends Component{
  static contextType = ctx;
  getPins(){
    var {start,end,pin} = this.context;
    var {step,style} = pin;
    var value = getStartByStep(start,step);
    var key = 0;
    var pins = [];
    var Style = typeof style === 'function'?function(val){return style(val)}:function(val){return style}; 
    while (value <= end) {
      pins.push(<RSliderPin value={value} key={key} style={Style(value)}/>);
      value += step;
      key++;
    }
    return pins;
  }
  render(){
    var {pin = {}} = this.context;
    var {step} = pin;
    if(!step){return '';}
    return(<div className='r-slider-pins'>{this.getPins()}</div>);
  }
}
class RSliderPin extends Component{
  static contextType = ctx;
  getStyle(style){
    var {styleName,start,end} = this.context;
    var {StartSide} = styleName;
    var {value} = this.props;
    return $.extend({},{
      [StartSide]:getPercentByValue(value,start,end) + '%',
    },style);
  }
  render(){
    var {value,style} = this.props;
    return (
      <div className="r-slider-pin" style={this.getStyle(style)}></div>
    );
  }
}
class RSliderLabels extends Component{
  static contextType = ctx;
  getLabelsByStep(){
    var {start,label = {},end} = this.context;
    var {items = [],step,style} = label;
    var customLabels = items.map((item)=>{return item.value});
    var Style = typeof style === 'function'?function(val){return style(val)}:function(val){return style}; 
    var Labels = [];
    var value = getStartByStep(start,step); 
    var key = 0;
    while (value <= end) {
      var index = customLabels.indexOf(value);
      if(index === -1){
        Labels.push(
          <RSliderLabel key={key} label={{value,text:value}} style={Style(value)}/>
        );
      }
      value += step;
      value = parseFloat(value.toFixed(6))
      key++;
    }
    return Labels;
  }
  getLabels(){
    var {label = {},start,end,pin} = this.context;
    var {items = [],style} = label;
    var Labels = [];
    var Style = typeof style === 'function'?function(val){return style(val)}:function(val){return style}; 
    for(var i = 0; i < items.length; i++){
      var item = items[i];
      if(item.value < start || item.value > end){continue;}
      Labels.push(<RSliderLabel label={item} key={item.value + 'label'} style={Style(item.value)}/>);
    }
    return Labels;
  }
  render(){
    var {label = {}} = this.context;
    var {step} = label;
    return (
      <div className='r-slider-labels'>
        {step && this.getLabelsByStep()}
        {this.getLabels()}
      </div>
    );
  }
}

class RSliderLabel extends Component{
  static contextType = ctx;
  getStyle(style){
    var {styleName,start,end,getValue} = this.context;
    var {StartSide} = styleName;
    var {value,color} = this.props.label;
    return $.extend({},{
      [StartSide]:getPercentByValue(value,start,end) + '%',
      color:getValue(color)
    },style);
  }
  click(e){
    var {points,update} = this.context;
    var {value} = this.props.label;
    //get nearest point to this value
    var point = points[0];
    var diff = Math.abs(points[0].value - value);
    for(var i = 1; i < points.length; i++){
      if(Math.abs(points[i].value - value) < diff){point = points[i];}
    }
    point.value = value;
    update(points,true,this.context);
  }
  render(){
    var {label,style} = this.props;
    var {text,id,className} = label;
    return (
      <div
        id={id} 
        className={`r-slider-label${className?' ' + className:''}`} 
        style={this.getStyle(style)} 
        onClick={this.click.bind(this)} 
      >
        {text}
      </div>
    );
  }
}

class Line extends Component{
  static contextType = ctx;
  render(){return(<div className="r-slider-line"></div>);}
} 
class Ranges extends Component{
  static contextType = ctx;
  render(){
    const {points,styleName} = this.context;
    var ranges = points.map((value,i)=>{return <Range index={i} key={i}/>});
    return(
      <div className="r-slider-ranges" style={{flexDirection:styleName.direction}}>
        {ranges}
        <Range key={points.length} index={points.length}/>
      </div>
    );
  }
}
class Range extends Component{
  static contextType = ctx;
  
  render(){
    var {points,showPoint} = this.context;
    var {index} = this.props;
    var length = points.length; 
    return(
      <Fragment>
        <RSiderSpace index={index} />
        {index < length && showPoint !== false && <RSliderPoint index={index} />}
      </Fragment>
    );
  }
} 
class RSiderSpace extends Component{
  static contextType = ctx;
  constructor(props){
    super(props);
    this.dom = createRef();
  }
  getStyle(){
    var {start,min = start,end,max = end,points} = this.context;
    var {index} = this.props;
    var value = index === points.length?max:points[index].value;
    var beforeValue = index === 0?start:points[index - 1].value ;
    var percent = getPercentByValue(value,start,end);
    var beforePercent = getPercentByValue(beforeValue,start,end);
    return {flexGrow:(percent - beforePercent),};
  }
  getFillStyle() {
    var {points,endRange,getValue} = this.context;
    var {index} = this.props;
    var value = index === points.length?endRange:points[index];
    return {
      background:value && getValue(value.fillColor)
    };
  }
  mouseDown(e){
    this.moved = false;
    var {points,showValue,start,end,min=start,max=end,styleName,changable} = this.context;
    if(changable === false){return;}
    var {Thickness} = styleName;
    var length = points.length;
    var space = $(this.dom.current);
    var container = space.parents('.r-slider-container');
    var {index} = this.props;
    $('.r-slider-point-container').css({zIndex:10});
    space.next('.r-slider-point-container').css({zIndex:100});
    space.prev('.r-slider-point-container').css({zIndex:100});
    
    if(showValue !== false){
      container.find('.r-slider-value').show();
    }
    if(index === 0){
      this.decreaseAll();
    }
    else if(index === length){
      this.increaseAll();
    }
    else{
      this.startOffset = {
        mousePosition:getClient(e),
        startLimit:index === 1?min:points[index - 2].value,
        endLimit:index === length - 1?max:points[index + 1].value,
        index,
        startValue:points[index - 1].value,
        endValue:points[index].value,
        size: container[Thickness]()
      };
      eventHandler('window','mousemove',$.proxy(this.mouseMove,this));
      
    }
    eventHandler('window','mouseup',$.proxy(this.mouseUp,this));
  }
  mouseMove(e){
    var {points,update,getOffset} = this.context;
    var {mousePosition,index,size,startValue,endValue,startLimit,endLimit} = this.startOffset;
    var offset = getOffset(mousePosition,size,e);
    var lastPoint = points[index - 1],point = points[index];
    if(lastPoint.value === offset + startValue){return;}
    if(point.value === offset + endValue){return;}
    this.moved = true;
    lastPoint.value = offset + startValue;
    point.value = offset + endValue;
    if(lastPoint.value < startLimit){
      lastPoint.value = startLimit;
      point.value = fix(startLimit + (endValue - startValue),this.fixValue);
    }
    if(point.value > endLimit){
      point.value = endLimit;
      lastPoint.value = fix(endLimit - (endValue - startValue),this.fixValue);
    }
    console.log('ok')
    update(points,false,this.context);
  }
  mouseUp(){
    eventHandler('window','mousemove',this.mouseMove,'unbind');
    eventHandler('window','mouseup',this.mouseUp,'unbind');
    var {update,showValue,points} = this.context;
    if(showValue !== 'fix'){
      var space = $(this.dom.current);
      space.parents('.r-slider-container').find('.r-slider-value').hide();
    }
    if(this.moved){update(points,true,this.context);}
  }
  decreaseAll(){
    var {start,min = start,step,points,update} = this.context;
    var offset = Math.min(step,points[0].value - min);
    for(var i = 0; i < points.length; i++){
      points[i].value -= offset;
      points[i].value = fix(points[i].value,this.fixValue)

    }
    this.moved = true;
    //update(points,true,this.context);
  }
  increaseAll(){
    var {end,max=end,step,points,update} = this.context;
    var offset = Math.min(step,max - points[points.length - 1].value);
    for(var i = 0; i < points.length; i++){
      points[i].value += offset;
      points[i].value = fix(points[i].value,this.fixValue)

    }
    this.moved = true;
    //update(points,true,this.context);
  }
  render(){
    const {points,showFill,endRange,touch} = this.context;
    var {index} = this.props;
    var length = points.length;
    var value = index === length?endRange:points[index];
    if(showFill === false){return '';}
    var props = {[touch?'onTouchStart':'onMouseDown']:this.mouseDown.bind(this)}
    return(
      <div ref={this.dom} className="r-slider-space" style={this.getStyle()} {...props}>
        <div className="r-slider-fill" data-index={index} style={this.getFillStyle()}>
        </div>
        <div className="r-slider-text">{value && value.text?value.text:''}</div>
      </div>
    );
  } 
} 

class RSliderPoint extends Component{
  static contextType = ctx;
  constructor(props){
    super(props);
    this.dom = createRef();
  }
  getStyle() {
    const {points,styleName,start,end} = this.context;
    var {index} = this.props;
    return {
      [styleName.StartSide]:getPercentByValue(points[index].value,start,end) + '%',
    };
  }
  getNumberStyle(){
    const {showValue} = this.context;
    return {
      display:showValue !== 'fix'?'none':'block',
    };
  }
  mouseDown(e){
    this.moved = false;
    var {update,changable,start,end,points,min=start,max=end,showValue,styleName,onpointmousedown} = this.context;
    var {Thickness} = styleName;
    var {index} = this.props;
    if(changable === false){return;} 
    var button = $(this.dom.current);
    $('.r-slider-point-container').css({zIndex:10});
    button.css({zIndex:100});
    var container = button.parents('.r-slider-container');
    if(showValue !== false){
      container.find('.r-slider-value').show();
    }
    var value = points[index].value;
    this.startOffset = {
      mousePosition:getClient(e),
      startLimit:index === 0?min:points[index - 1].value,
      endLimit:index === points.length - 1?max:points[index + 1].value, 
      index,value,
      size: container[Thickness]()
    };
    if(onpointmousedown){onpointmousedown(this.context)}
    if(points.length === 1 && start === 0 && end === 1){
      points[0].value = points[0].value === 0?1:0;
      update(points,true,this.context);
    }
    else{
      eventHandler('window','mousemove',$.proxy(this.mouseMove,this));
    }
    eventHandler('window','mouseup',$.proxy(this.mouseUp,this));
  }
  mouseMove(e){
    var {update,points,getOffset} = this.context;
    var {mousePosition,size,value,startLimit,endLimit,index} = this.startOffset;
    var point = points[index];
    var newValue = parseFloat(value) + getOffset(mousePosition,size,e);
    if(newValue < startLimit){newValue = startLimit;}
    if(newValue > endLimit){newValue = endLimit;}
    if(point.value === newValue){return;}
    this.moved = true;
    point.value = fix(newValue,this.fixValue);
    update(points,false,this.context);
  }
  mouseUp(){
    eventHandler('window','mousemove',this.mouseMove,'unbind');
    eventHandler('window','mouseup',this.mouseUp,'unbind');
    var {showValue,update,points} = this.context;
    if(showValue !== 'fix'){
      var button = $(this.dom.current);
      button.parents('.r-slider-container').find('.r-slider-value').hide();
    }
    if(this.moved){
      update(points,true,this.context);
    }
  }
  render(){
    var {index} = this.props;
    var {points,showValue,showButton,getValue,touch} = this.context;
    if(showButton === false){return '';}
    var value = points[index]; 
    var props = {[touch?'onTouchStart':'onMouseDown']:this.mouseDown.bind(this),className:"r-slider-point-container"};
    return(
      <div ref={this.dom} style={this.getStyle()} {...props}>
        <div className={`r-slider-point${value.className?' ' + value.className:''}`} style={typeof value.style === 'function'?value.style(value):value.style}>
          {
          showValue !== false && 
          <div style={this.getNumberStyle()} className="r-slider-value">{value.value}</div>
        }
        {getValue(value.html) || ''}
        </div>
      </div>
    );
  }
} 
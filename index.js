import React, { Component,createRef,Fragment,createContext } from 'react';
import $ from 'jquery';
const SliderContext = createContext();
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.dom = createRef();
    this.state = {
      points:this.props.points
    }
  }
  update(points){
    this.setState({points});
  }
  componentDidMount(){
    var position = $(this.dom.current).css('position');
    if(position === 'static'){$(this.dom.current).css('position','relative');}
  }
  getPercentByValue(value) {
    const {start,end} = this.props;
    return 100 * (value - start) / (end - start);
  }
  getStyleName() {
    var {direction='right'} = this.props;
    var sn = {
      Thickness : (direction === 'left' || direction === 'right')?'width':'height',
      Thickness_r : (direction === 'left' || direction === 'right')?'height':'width',
      OtherSide : (direction === 'left' || direction === 'right')?'top':'left',
      OtherSide_r : (direction === 'left' || direction === 'right')?'bottom':'right',
      Axis : (direction === 'left' || direction === 'right')?'x':'y',
      Sign : (direction === 'right' || direction === 'down')?1:-1,
    }
    if (direction === "right") { sn['StartSide'] = "left", sn['EndSide'] = "right";}
    else if (direction === "left") { sn['StartSide'] = "right", sn['EndSide'] = "left"; }
    else if (direction === "down") { sn['StartSide'] = "top", sn['EndSide'] = "bottom"; }
    else if (direction === "up") { sn['StartSide'] = "bottom", sn['EndSide'] = "top"; }
    return sn;
  }
  getClassName(className){
    var {direction = 'right'} = this.props;
    var oriention = direction==="left" || direction === "right" ? "horizontal" : "vertical";
    return 'r-slider ' + oriention + (className && typeof className === 'string'?' ' + className:'')
  }
  getStyle(){
    var {style = {}} = this.props;
    return $.extend({},{overflow:'hidden'},style);
  }
  render() {
    var {className,id} = this.props;
    var contextValue = {...this.props};
    contextValue.styleName = this.getStyleName();
    contextValue.getPercentByValue = this.getPercentByValue.bind(this);
    contextValue.update = this.update.bind(this)
      return (
        <SliderContext.Provider value={contextValue}>
          <div style={this.getStyle()} className={this.getClassName(className)} ref={this.dom} id={id}>
            <SliderContainer />
          </div>
        </SliderContext.Provider>
      );
  }
}

class SliderContainer extends Component {
  static contextType = SliderContext;
  constructor(props) {
    super(props);
    this.dom = createRef()
  }
  
  getStyle(){
    var {margin = 20,styleName} = this.context;
    var {Thickness,Thickness_r,StartSide,OtherSide} = styleName;
    var size = this.context['point_' + Thickness] || 10; 
    var size_r = this.context['point_' + Thickness_r] || 10; 
    var obj = {position:'absolute'};
    obj[StartSide] = ((size / 2) + margin) + 'px';
    obj[OtherSide] = 'calc(50% - ' + (size_r / 2) + 'px)';
    obj[Thickness] = 'calc(100% - ' + (size + (margin * 2)) + 'px';
    obj[Thickness_r] = size_r + 'px';
    obj['userSelect'] = 'none';
    return obj;
  }
  /**
   * @param {d} string (direction of slider)
   */
  
  getLabelStyle(value){
    var {styleName,getPercentByValue,labelPosition = {}} = this.context;
    var {StartSide} = styleName;
    var {x = 0, y = 0} = labelPosition;
    return {position: 'absolute',
      lineHeight: 0,
      textAlign:'center',
      width:'4px',
      height:'4px',
      [StartSide]:getPercentByValue(value) + '%',
      transform:'translate(' + x + 'px,' + y + 'px)'
    }
  }
  getPinStyle(value){
    var {styleName,getPercentByValue,thickness = 2} = this.context;
    var {Thickness,Thickness_r,OtherSide,StartSide} = styleName;
    return {
      position:'absolute',
      [Thickness]:'1px',
      [Thickness_r]:thickness + 4,
      [OtherSide]:'calc(50% - ' + ((thickness + 4) / 2) + 'px)',
      [StartSide]:getPercentByValue(value) + '%'
    };
    obj;
    return obj;
  }
  render() {
    const {points,pinStep,start,end,labelStep,endRange,end,max=end} = this.context;
    var ranges = points.map((value,i)=>{return <Range index={i} key={i}/>});
    if(pinStep){
      var pins = [];
      var pinValue = start;
      var pinIndex = 0;
      while (pinValue <= end) {
        pins.push(<div className="r-slider-pin" style={this.getPinStyle(pinValue)} key={pinIndex}></div>);
        pinValue += pinStep;
        pinIndex++;
      }
    }
    if(labelStep){
      var labels = [];
      var labelValue = start;
      var labelIndex = 0;
      while (labelValue <= end) {
        labels.push(
          <div className="r-slider-label" style={this.getLabelStyle(labelValue)} key={labelIndex}>
            <div style={{width:'200px',position:'absolute',left:'-100px'}}>{labelValue}</div>
          </div>
        );
        labelValue += labelStep;
        labelIndex++;
      }
    }
    return (
      <div className='r-slider-container' style={this.getStyle()} ref={this.dom}>
        {pinStep && pins}
        {labelStep && labels}
        <Line />
        {ranges}
        {<Range index={points.length}/>}
      </div>
    );
  }
}

class Line extends Component{
  static contextType = SliderContext;
  constructor(props){
    super(props);
  }
  getStyle(){
    var {styleName,thickness = 2} = this.context;
    var {StartSide,OtherSide,Thickness,Thickness_r} = styleName;
    return {
      position:'absolute',
      [StartSide]:0,
      [OtherSide]:'calc(50% - ' + (thickness / 2) + 'px)',
      [Thickness_r]:thickness + 'px',
      [Thickness]:'100%',
      ['zIndex']:1
    };
  }
  render(){
    return(
      <div className="r-slider-line" style={this.getStyle()}></div>
    );
  }
} 
class Range extends Component{
  static contextType = SliderContext;
  constructor(props){
    super(props);
  }
  render(){
    var {points} = this.context;
    var {index} = this.props;
    var length = points.length; 
    return(
      <Fragment>
        <Space index={index} />
        {index < length && <Button index={index} />}
      </Fragment>
    );
  }
} 
class Space extends Component{
  static contextType = SliderContext;
  constructor(props){
    super(props);
    this.dom = createRef();
  }
  getStyle(){
    var {start,min = start,end,max = end,points,styleName,getPercentByValue} = this.context;
    var {Thickness,Thickness_r,OtherSide,StartSide} = styleName;
    var {index} = this.props;
    var length = points.length;
    var value = index === length?max:points[index].value;
    var beforeValue = index === 0?min:points[index - 1].value ;
    var percent = getPercentByValue(value);
    var beforePercent = getPercentByValue(beforeValue);
    return {
      position:'absolute',
      zIndex:100,
      overflow: 'hidden',
      cursor:'pointer',
      [Thickness]:(percent - beforePercent) + '%',
      [Thickness_r]:'100%',
      [OtherSide]:0,
      [StartSide]:beforePercent + '%'
    };
  }
  getFillStyle() {
    var {style,styleName,thickness = 2,points,endRange} = this.context;
    var {StartSise,OtherSide,Thickness,Thickness_r} = styleName;
    var {index} = this.props;
    var length = points.length;
    var value = index === length?endRange:points[index];
    return {
      position: 'absolute',zIndex: 10,cursor: 'pointer',
      [styleName.StartSide]:0,
      [styleName.OtherSide]:'calc(50% - ' + (thickness / 2) + 'px)',
      [styleName.Thickness_r]:thickness + 'px',
      [styleName.Thickness]:'100%',
      ['background']:value && value.rangeColor?value.rangeColor:undefined
    };
  }
  getTextStyle() {
    var {styleName,point_height = 10,points} = this.context;
    var {StartSide,OtherSide,Thickness,EndSide} = styleName;
    const {index} = this.props;
    var size = this.context['point_' + Thickness] || 10;
    var obj = {
      position:'absolute',
      textAlign:'center',
      zIndex:10,
      lineHeight:point_height + 'px'
    };
    if (index === 0) {
        obj[Thickness] = 'calc(100% - ' + size / 2 + 'px)';
        obj[StartSide] = 0;
        obj[OtherSide] = 0;
    } else if (index === points.length) {
        obj[Thickness] = 'calc(100% - ' + size / 2 + 'px)';
        obj[EndSide] = 0;
        obj[OtherSide] = 0;
    } else {
        obj[Thickness] = '100%';
    }
    return obj;
  }
  mouseDown(e){
    var {points,showValue,start,end,min=start,max=end,styleName,changable} = this.context;
    if(changable === false){return;}
    var {Thickness} = styleName;
    var length = points.length;
    var space = $(this.dom.current);
    var {index} = this.props;
    
    if(showValue !== false){
      space.parent('.r-slider-container').find('.r-slider-number').show();
    }
    if(index === 0){
      this.decreaseAll();
    }
    else if(index === length){
      this.increaseAll();
    }
    else{
      this.startOffset = {
        x:e.clientX,
        y:e.clientY,
        startLimit:index === 1?min:points[index - 2].value,
        endLimit:index === length - 1?max:points[index + 1].value,
        index,
        startValue:points[index - 1].value,
        endValue:points[index].value,
        width: $(this.dom.current).parent('.r-slider-container')[Thickness]()
      };
      $(window).bind('mousemove',$.proxy(this.mouseMove,this));
      $(window).bind('mouseup',$.proxy(this.mouseUp,this));
    }
  }
  mouseMove(e){
    var {start,end,step,styleName,points,onchange,update} = this.context;
    var so = this.startOffset;
    var offset ={x:e.clientX - so.x,y:e.clientY - so.y};
    offset = offset[styleName.Axis] * styleName.Sign;
    offset = (end - start) * offset / so.width;
    offset = Math.round(offset / step) * step;
    var startDistance = points[so.index-1].value - so.startLimit;
    var endDistance = so.endLimit - points[so.index].value;
    points[so.index - 1].value = offset + so.startValue;
    points[so.index].value = offset + so.endValue;
    if(points[so.index - 1].value < so.startLimit){
      points[so.index - 1].value = so.startLimit;
      points[so.index].value = so.startLimit + (so.endValue - so.startValue);
    }
    if(points[so.index].value > so.endLimit){
      points[so.index].value = so.endLimit;
      points[so.index - 1].value = so.endLimit - (so.endValue - so.startValue);
    }
    update(points);
    if(onchange){
      onchange(this.context,false);
    }
  }
  mouseUp(){
    $(window).unbind('mousemove',this.mouseMove);
    $(window).unbind('mouseup',this.mouseUp);
    var {onchange,points,fixValue} = this.context;
    if(!fixValue){
      var space = $(this.dom.current);
      space.parent('.r-slider-container').find('.r-slider-number').hide();
    }
    if(onchange){onchange(this.context,true);} 
  }
  decreaseAll(){
    var {start,min = start,step,points,onchange,update} = this.context;
    var offset = Math.min(step,points[0].value - min);
    for(var i = 0; i < points.length; i++){
      points[i].value -= offset;
    }
    update(points);
    if(onchange){
      onchange(this.context,true);
    }
  }
  increaseAll(){
    var {end,max=end,step,points,onchange,update} = this.context;
    var offset = Math.min(step,max - points[points.length - 1].value);
    for(var i = 0; i < points.length; i++){
      points[i].value += offset;
    }
    update(points);
    if(onchange){
      onchange(this.context,true);
    }
  }
  render(){
    const {points,showFill,endRange} = this.context;
    var {index} = this.props;
    var length = points.length;
    var value = index === length?endRange:points[index];
    if(showFill === false){return '';}
    
    return(
      <div ref={this.dom} className="r-slider-space" style={this.getStyle()} onMouseDown={this.mouseDown.bind(this)}>
        <div className="r-slider-fill" style={this.getFillStyle()}></div>
        <div className="r-slider-text" style={this.getTextStyle()}>{value && value.text?value.text:''}</div>
      </div>
    );
  }
} 

class Button extends Component{
  static contextType = SliderContext;
  constructor(props){
    this.dom = createRef();
    super(props);
  }
  getStyle(index) {
    const {points,styleName,getPercentByValue,point_width = 10,point_height = 10} = this.context;
    var {StartSide,OtherSide,Thickness,Thickness_r,Thickness} = styleName;
    var {index} = this.props;
    var value = points[index];
    var percent = getPercentByValue(value.value);
    var size = this.context['point_' + Thickness] || 10;
    return {
      border:'none',
      position:'absolute',
      zIndex: 1000,
      cursor:'pointer',
      background:value.pointColor,
      height:point_height + 'px',
      width:point_width + 'px',
      [StartSide]:'calc(' + percent + '% - ' + (size / 2) + 'px)',
      [OtherSide]:0,
    };
    
  }
  getNumberStyle(){
    const {fixValue} = this.context;
    return {
      zIndex:1000,
      display:fixValue !== true?'none':'block'
    };
  }
  mouseDown(e){
    var {changable,start,end,points,min=start,max=end,fixValue,showValue,styleName} = this.context;
    var {Thickness} = styleName;
    var {index} = this.props;
    if(changable === false){return;}
    var button = $(this.dom.current);
    if(showValue !== false){
      button.parent('.r-slider-container').find('.r-slider-number').show();
    }
    var value = points[index].value;
    this.startOffset = {
      x:e.clientX,y:e.clientY,
      startLimit:index === 0?min:points[index - 1].value,
      endLimit:index === points.length - 1?max:points[index + 1].value,
      index,value,
      width: $(this.dom.current).parent('.r-slider-container')[Thickness]()
    };
    
    $(window).bind('mousemove',$.proxy(this.mouseMove,this));
    $(window).bind('mouseup',$.proxy(this.mouseUp,this));
  }
  mouseMove(e){
    var {styleName,onchange,update,start,end,step,min = start,max = end,points} = this.context;
    var {Axis,Sign} = styleName;
    var so = this.startOffset;
    var offset ={x:e.clientX - so.x,y:e.clientY - so.y};
    offset = offset[Axis] * Sign;
    offset = (end - start) * offset / so.width;
    offset = Math.round(offset / step) * step;
    var newValue = parseFloat(so.value) + offset;
    if(newValue < so.startLimit){newValue = so.startLimit;}
    if(newValue > so.endLimit){newValue = so.endLimit;}
    if(points[so.index].value === newValue){return;}
    points[so.index].value = newValue;
    update(points);
    if(onchange){
      onchange(this.context,true);
    }
  }
  mouseUp(){
    $(window).unbind('mousemove',this.mouseMove);
    $(window).unbind('mouseup',this.mouseUp);
    var {points,fixValue,onchange} = this.context;
    if(!fixValue){
      var button = $(this.dom.current);
      button.parent('.r-slider-container').find('.r-slider-number').hide();
    }
    if(onchange){
      onchange(this.context,true);
    }
  }
  render(){
    var {index} = this.props;
    var {points,showValue,showButton} = this.context;
    if(showButton === false){return '';}
    var value = points[index]; 
    return(
      <div ref={this.dom}
        className="r-slider-button" 
        style={this.getStyle()}
        onMouseDown={this.mouseDown.bind(this)}>
        {
          showValue !== false && 
          <div style={this.getNumberStyle()} className="r-slider-number">{value.value}</div>
        }
      </div>
    );
  }
} 

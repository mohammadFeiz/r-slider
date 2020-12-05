import React ,{Component,createContext,createRef}from 'react';
import $ from 'jquery';
import './index.css';
var RRangeSliderContext = createContext();
export default class RRangeSlider extends Component{
  constructor(props){
    super(props);
    var {direction,points,htmlStyle} = this.props;
    if(['left','right','top','bottom'].indexOf(direction) === -1){console.error('r-range-slider direction props is not valid')}
    //direction requirments
    if(direction === 'left'){this.getDiff = function (x,y,client){return x - client.x;}; this.oriention = 'horizontal';}
    else if(direction === 'right'){this.getDiff = function (x,y,client){return client.x - x;}; this.oriention = 'horizontal';}
    else if(direction === 'top'){this.getDiff = function (x,y,client){return y - client.y;}; this.oriention = 'vertical'; this.flexDirection = 'column-reverse';}
    else{this.getDiff = function (x,y,client){return client.y - y;}; this.oriention = 'vertical'; this.flexDirection = 'column';}
    this.htmlStyle = {display:'flex',justifyContent:'center',alignItems:'center',...htmlStyle};
    this.dom = createRef();
    var {start,end,min = start,max = end,step}=this.props;
    this.state = { 
      isDown:false,
      points:this.getValidPoints(points,start,end,min,max,step), 
      getValidPoints:this.getValidPoints.bind(this)
    } 
    var step = this.props.step.toString();
    var dotPos = step.indexOf('.');
    this.fixValue = dotPos === -1?0:step.length - dotPos - 1;
  }
  getClient(e){return 'ontouchstart' in document.documentElement?{x: e.changedTouches[0].clientX,y:e.changedTouches[0].clientY }:{x:e.clientX,y:e.clientY}}
  getPercentByValue(value,start,end){return 100 * (value - start) / (end - start);} //getPercentByValue
  fix(number,a = 6){return parseFloat((number).toFixed(a));}
  getStartByStep(start,step){
    var a = Math.round((start - step) / step) * step; 
    while(a < start){a += step;} return a;
  }
  eventHandler(selector, event, action,type = 'bind'){
    var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" };
    event = 'ontouchstart' in document.documentElement ? me[event] : event;
    var element = typeof selector === "string"? (selector === "window"?$(window):$(selector)):selector; 
    element.unbind(event, action); 
    if(type === 'bind'){element.bind(event, action)}
  }
  static getDerivedStateFromProps(props,state){
    var {start,end,min = start,max = end,step} = props;
    var points = state.getValidPoints(props.points,start,end,min,max,step);
    return {points}
  }
  getValidPoints(points,start,end,min,max,step){
    if(this.props.values){return points;}
    for(var i = 0; i < points.length; i++){
      var point = points[i];
      point.value = Math.round((point.value - start)/step) * step + start;
      if(point.value < min){point.value = min;}
      if(point.value > max){point.value = max;} 
    }
    return points
  }
  update(points,final,context){
    var {onchange,ondrag} = this.props; 
    if(final && onchange){onchange(context)}
    else if(ondrag){ondrag(context)}
    else{this.setState({points});}
  } 
  
  getOffset(x,y,size,e){
    var {start,end,step,values} = this.props,client = this.getClient(e);
    if(values){start = 0; end = values.length - 1;}
    return  Math.round((end - start) * this.getDiff(x,y,client) / size / step) * step;
  }
  getValue(value,param = this.props){return typeof value === 'function'?value(param):value;}
  getPercents(){
    var {start,end,values} = this.props,{points} = this.state;      
    if(values){
      start = 0; end = values.length - 1;
      var indexes = points.map((p,i)=>values.indexOf(p.value));
      var percents = indexes.map((index,i)=>[
        this.getPercentByValue(i?indexes[i - 1]:start,start,end),
        this.getPercentByValue(index,start,end)
      ]);
      percents.push([percents[percents.length - 1][1],100]);
      return percents;  
    }
    var percents = points.map((p,i)=>[
      this.getPercentByValue(i?points[i - 1].value:start,start,end),
      this.getPercentByValue(p.value,start,end)
    ]);
    percents.push([percents[percents.length - 1][1],100])
    return percents;
  }
  decreaseAll(value = this.props.step){
    var {points} = this.state;
    var {values} = this.props;
    
    if(values){
      var start = 0;
      var {min = start} = this.props;
      var offset = values.indexOf(points[0].value) === values.indexOf(min)?0:1; 
      for(var i = 0; i < points.length; i++){
        var index = values.indexOf(points[i].value);
        points[i].value = values[index - offset];
      }
    }
    else{
      var start = this.props.start;
      var {min = start} = this.props;
      var offset = Math.min(value,points[0].value - this.getValue(min));
      for(var i = 0; i < points.length; i++){
        points[i].value -= offset;
        points[i].value = this.fix(points[i].value,this.fixValue)
      }
    }
    
    this.moved = true;
  }
  increaseAll(value = this.props.step){
    var {points} = this.state;
    var {values} = this.props;
    if(values){
      var end = points.length - 1;
      var {max = end} = this.props;
      var offset = values.indexOf(points[points.length - 1].value) === values.indexOf(max)?0:1;
      for(var i = 0; i < points.length; i++){
        var index = values.indexOf(points[i].value);
        points[i].value = values[index + offset];
      }
    }
    else{
      var end = this.props.end;
      var {max = end} = this.props;
      var offset = Math.min(value,this.getValue(max) - points[points.length - 1].value);
      for(var i = 0; i < points.length; i++){
        points[i].value += offset;
        points[i].value = this.fix(points[i].value,this.fixValue)
      }
    }
    this.moved = true;
    //update(points,true,this.context);
  }
  mouseDown(e,index,type){
    e.preventDefault();
    var {points} = this.state,{start,end,min = start,max = end,onmousedown,editable} = this.props;
    if(onmousedown){onmousedown(e,index,this.props)}
    if(!editable){return}
    var {x,y} = this.getClient(e),dom = $(this.dom.current);
    var pointContainers = dom.find('.r-range-slider-point-container');
    var size = dom.find('.r-range-slider-line')[this.oriention === 'horizontal'?'width':'height']();
    var length = points.length;
    
    this.eventHandler('window','mousemove',$.proxy(this.mouseMove,this));
    this.eventHandler('window','mouseup',$.proxy(this.mouseUp,this));
    
    this.moved = false;
    this.setState({isDown:true});
    pointContainers.css({zIndex:10}); 
    
    if(type === 'point'){
      let pointContainer = pointContainers.eq(index);
      pointContainer.css({zIndex:100});
      pointContainer.find('.r-range-slider-point').addClass('active');
      var current = points[index].value;
      var before = index === 0?min:points[index - 1].value;
      var after = index === points.length - 1?max:points[index + 1].value 
      this.startOffset = {
        x,y,size,index:[index],value:[current], 
        startLimit:before - current,endLimit:after - current,
      }
    }
    else{
      let pointContainer1 = pointContainers.eq(index - 1);
      let pointContainer2 = pointContainers.eq(index);
      pointContainer1.css({zIndex:100});
      pointContainer2.css({zIndex:100});
      let p1 = pointContainer1.find('.r-range-slider-point');
      let p2 = pointContainer2.find('.r-range-slider-point');
      p1.addClass('active');
      p2.addClass('active');

      if(index === 0){this.decreaseAll();}else if(index === length){this.increaseAll();}
      if(index === 0 || index === length){
        this.startOffset = {
          x,y,size,
          index:points.map((p,i)=>i),value:points.map((p)=>p.value), 
          startLimit:min - points[0].value,endLimit:max - points[length - 1].value,
        }
      }
      else{
        var point1 = points[index - 1].value,point2 = points[index].value;
        var before = index === 1?min:points[index - 2];//مقدار قبلی رنج
        var after = index === length - 1?max:points[index + 1].value; //مقدار بعدی رنج
        this.startOffset = {
          x,y,size,index:[index - 1,index],
          value:[point1,point2],startLimit:before - point1,endLimit:after - point2,
        }
      }
    }
  }
  mouseDownByValues(e,index,type){
    e.preventDefault();
    var {points} = this.state,{values} = this.props,start = values[0],end = values[values.length - 1],{min = start,max = end,onmousedown} = this.props;
    if(onmousedown){onmousedown(this.props)}
    var {x,y} = this.getClient(e),dom = $(this.dom.current);
    var pointContainers = dom.find('.r-range-slider-point-container');
    var size = dom.find('.r-range-slider-line')[this.oriention === 'horizontal'?'width':'height']();
    var length = points.length;
    
    this.eventHandler('window','mousemove',$.proxy(this.mouseMoveByValues,this));
    this.eventHandler('window','mouseup',$.proxy(this.mouseUp,this));
    
    this.moved = false;
    this.setState({isDown:true});
    pointContainers.css({zIndex:10}); 
    min = values.indexOf(min);
    max = values.indexOf(max);
    if(type === 'point'){
      let pointContainer = pointContainers.eq(index);
      pointContainer.css({zIndex:100});
      pointContainer.find('.r-range-slider-point').addClass('active');
      var current = values.indexOf(points[index].value);
      var before = index === 0?min:values.indexOf(points[index - 1].value);
      var after = index === points.length - 1?max:values.indexOf(points[index + 1].value); 
      this.startOffset = {
        x,y,size,index:[index],value:[current], 
        startLimit:before - current,endLimit:after - current,
      }
    }
    else{
      let pointContainer1 = pointContainers.eq(index - 1);
      let pointContainer2 = pointContainers.eq(index);
      pointContainer1.css({zIndex:100});
      pointContainer2.css({zIndex:100});
      let p1 = pointContainer1.find('.r-range-slider-point');
      let p2 = pointContainer2.find('.r-range-slider-point');
      p1.addClass('active');
      p2.addClass('active');  

      if(index === 0){this.decreaseAll();}else if(index === length){this.increaseAll();}
      if(index === 0 || index === length){ 
        this.startOffset = {
          x,y,size,
          index:points.map((p,i)=>i),value:points.map((p)=>values.indexOf(p.value)), 
          startLimit:min - values.indexOf(points[0].value),endLimit:max - values.indexOf(points[length - 1].value),
        }
      }
      else{
        var point1 = values.indexOf(points[index - 1].value),point2 = values.indexOf(points[index].value);
        var before = index === 1?min:values.indexOf(points[index - 2].value);//مقدار قبلی رنج
        var after = index === length - 1?max:values.indexOf(points[index + 1].value); //مقدار بعدی رنج
        this.startOffset = {
          x,y,size,index:[index - 1,index],
          value:[point1,point2],startLimit:before - point1,endLimit:after - point2,
        }
      }
    }
  }
  sliderMouseMove(e,index){
    var {onmousemove} = this.props;
    if(onmousemove){onmousemove(e,index)}
  }
  mouseMove(e){
    var {points} = this.state;
    var {x,y,size,value,startLimit,endLimit,index} = this.startOffset;
    var offset = this.getOffset(x,y,size,e);
    if(offset < startLimit){offset = startLimit;}
    else if(offset > endLimit){offset = endLimit;}
    for(var i = 0; i < value.length; i++){
      var Index = index[i],Value = value[i],point = points[Index],newValue = parseFloat(Value) + offset;
      if(point.value === newValue){return;}
      point.value = this.fix(newValue,this.fixValue);
    } 
    this.moved = true;
    this.update(points,false,this.context);
  }
  mouseMoveByValues(e){
    var {points} = this.state,{values} = this.props;
    var {x,y,size,value,startLimit,endLimit,index} = this.startOffset;
    var offset = this.getOffset(x,y,size,e);
    if(offset < startLimit){offset = startLimit;}
    else if(offset > endLimit){offset = endLimit;}
    for(var i = 0; i < value.length; i++){
      var Index = index[i],Value = value[i],point = points[Index],newValue = Value + offset;
      if(point.value === values[newValue]){return;}
      point.value = values[newValue];
    }
    this.moved = true;
    this.update(points,false,this.context);
  }
  mouseUp(){
    this.eventHandler('window','mousemove',this.mouseMove,'unbind');
    this.eventHandler('window','mousemove',this.mouseMoveByValues,'unbind');
    this.eventHandler('window','mouseup',this.mouseUp,'unbind');
    var points = $(this.dom.current).find('.r-range-slider-point');
    points.removeClass('active');
    this.setState({isDown:false});
    if(this.moved){this.update(this.state.points,true,this.context);}
    if(this.props.onmouseup){this.props.onmouseup(this.props);}
  }
  getContext(){
    var context = {...this.props}; 
    context.oriention = this.oriention;
    context.getValue = this.getValue.bind(this); 
    context.isDown = this.state.isDown;
    context.mouseDown = this.mouseDown.bind(this);
    context.mouseMove = this.sliderMouseMove.bind(this);
    context.mouseDownByValues = this.mouseDownByValues.bind(this);
    context.getStartByStep = this.getStartByStep.bind(this);
    context.getPercentByValue = this.getPercentByValue.bind(this);
    context.update = this.update.bind(this);
    context.points = this.state.points;
    return context;
  }
  getStyle(){
    var obj = this.getValue(this.props.style) || {};
    obj = {...obj};
    obj.direction = 'ltr';
    obj.flexDirection = this.flexDirection;
    return obj
  }
  render(){
    var {points} = this.state;
    this.context = this.getContext();
    var {startHtml,endHtml,className,id} = this.props;
    var percents = this.getPercents();
    return (
      <RRangeSliderContext.Provider value={this.context}>
        <div ref={this.dom} id={id} className={`r-range-slider ${this.context.oriention}${className?' ' + className:''}`} style={this.getStyle()}>
          {startHtml && <div style={this.htmlStyle}>{this.getValue(startHtml)}</div>}
          <div style={{display:'flex',height:'100%',width:'100%',alignItems:'center',justifyContent:'center',position:'relative'}}>
            <RRangeSliderLine />
            <RRangeSliderLabels />
            <RRangeSliderPins />
            {points.map((p,i)=><RRangeSliderFill key={i} index={i} percent={percents[i]}/>)}
            <RRangeSliderFill key={points.length} index={points.length} percent={percents[points.length]}/>
            {points.map((p,i)=><RRangeSliderPoint key={i} index={i} percent={percents[i]}/>)}
          </div>
          {endHtml && <div style={this.htmlStyle}>{this.getValue(endHtml)}</div>}
          
        </div>
      </RRangeSliderContext.Provider>
    );
  }
}
RRangeSlider.defaultProps = {
  direction:'right',
  points:[{value:0}],
  start:-50,end:50,step:1,endRange:{},style:{},activePointStyle:{},
  pointStyle:{},lineStyle:{},fillStyle:{},valueStyle:{},style:{},textStyle:{},showValue:true,editable:true
}

class RRangeSliderLine extends Component{
  static contextType = RRangeSliderContext;
  render(){
    var {oriention,lineStyle} = this.context;
    return (<div className='r-range-slider-line' style={lineStyle}></div>)
  }
}

class RRangeSliderFill extends Component{ 
  static contextType = RRangeSliderContext;
  getFillStyle(){
    var {getValue,points,fillStyle,endRange} = this.context,{index} = this.props;
    var point = index === points.length?endRange:points[index];
    return {...getValue(fillStyle),...getValue(point.fillStyle || {})}; 
  }
  getContainerStyle(){
    var {oriention,direction} = this.context,{percent} = this.props;
    var obj = {}; 
    obj[{right:'left',left:'right',top:'bottom',bottom:'top'}[direction]] = percent[0] + '%';
    if(oriention === 'horizontal'){obj.width = (percent[1] - percent[0]) + '%';} 
    else{obj.height = (percent[1] - percent[0]) + '%';}
    return obj;
  }
   
  render(){
    var {mouseDown,mouseMove,mouseDownByValues,points,endRange,getValue,endRange,values,rangeEvents = {}} = this.context;
    var {index} = this.props;
    var point = index === points.length?endRange:points[index];
    var containerProps = {
      'data-index':index,className:'r-range-slider-fill-container',
      ['ontouchstart' in document.documentElement?'onTouchStart':'onMouseDown']:(e)=>{
        if(values){mouseDownByValues(e,index,'fill')}
        else{mouseDown(e,index,'fill')}
      },
      onMouseMove:(e)=>mouseMove(e,index),
      style:this.getContainerStyle()
    }
    for(let prop in rangeEvents){
      containerProps[prop] = ()=>rangeEvents[prop](index)
    }
    return (
      <div {...containerProps}> 
        <div className='r-range-slider-fill' style={this.getFillStyle()}></div>
        {point.text && <div>{getValue(point.text)}</div>}
      </div>
    );
  }
}

class RRangeSliderPoint extends Component{ 
  static contextType = RRangeSliderContext;
  getPointStyle(){
    var {getValue,points,pointStyle} = this.context,{index} = this.props;
    return {...getValue(pointStyle),...getValue(points[index].pointStyle)};
  }
  getContainerStyle(){
    var {direction} = this.context,{percent} = this.props;
    return {
      [{right:'left',left:'right',top:'bottom',bottom:'top'}[direction]]:percent[1] + '%'};
  }
  getValueStyle(){
    var {points,showValue,isDown,getValue,valueStyle} = this.context;
    var {index} = this.props;
    var point = points[index];
    if(showValue === false){return {display:'none'};}
    else if(showValue === 'fixed' || isDown){
      return {...getValue(valueStyle,point.value),...getValue(point.valueStyle,point.value)};
    }
    else{return {display:'none'};}
  }
  render(){
    var {points,mouseDown,mouseMove,mouseDownByValues,editValue,values,pointEvents} = this.context;
    var {index} = this.props;
    var point = points[index];
    var props = {
      style:this.getContainerStyle(),'data-index':index,
      className:'r-range-slider-point-container', 
      ['ontouchstart' in document.documentElement?'onTouchStart':'onMouseDown']:(e)=>{
        if(values){mouseDownByValues(e,index,'point')}
        else{mouseDown(e,index,'point')}
      },
      onMouseMove:(e)=>mouseMove(e,index)
    };
    for(let prop in pointEvents){
      props[prop] = ()=>pointEvents[prop](index)
    }
    var pointProps = {className:'r-range-slider-point',style:this.getPointStyle()};
    var valueProps = {
      style:this.getValueStyle(),
      className:'r-range-slider-value'
    };
    return (
      <div {...props}>
        <div {...pointProps}>{point.html && point.html}</div>
        <div {...valueProps}>{editValue?editValue(point,index):point.value}</div>
      </div>
      
    );
  }
}

class RRangeSliderLabels extends Component{
  static contextType = RRangeSliderContext;
  constructor(props){
    super(props);
    this.dom = createRef();
    $(window).on('resize',this.update.bind(this))
  }
  getLabelsByStep(){
    var {start,label = {},end,getStartByStep,values} = this.context;
    if(values){
      start = 0; 
      end = values.length - 1;
    }
    var {items = [],step,style,edit,rotate,ignoreStep} = label;
    var customLabels = values?items.map((item)=>values.indexOf(item.value)):items.map((item)=>item.value);
    var Style = typeof style === 'function'?(val)=>{return style(val,this.context)}:function(val){return style}; 
    var Labels = [];
    var value = getStartByStep(start,step); 
    var key = 0;
    while (value <= end) {
      var index = customLabels.indexOf(value);
      if(index === -1){
        Labels.push(
          <RRangeSliderLabel key={key} label={{value,text:values?values[value]:value,edit}} rotate={rotate} style={Style(value)} type='step'/>
        );
      }
      value += step;
      value = parseFloat(value.toFixed(6))
      key++;
    } 
    return Labels;
  }
  update(){
    var {direction,label = {}} = this.context;
    var {rotate} = label;
    var thickness = rotate?'height':'width';
    var container = $(this.dom.current);
    var labels = container.find('.r-range-slider-label div');
    var firstLabel = labels.eq(0);
    if(direction === 'right'){
      var end = firstLabel.offset().left + firstLabel[thickness]();
      for(var i = 1; i < labels.length; i++){
        var label = labels.eq(i);
        label.css({display:'block'})
        var left = label.offset().left
        var width = label[thickness]();
        if(left < end + 5){
          label.css({display:'none'})
        }
        else{end = left + width;} 
      }
    }
    else if(direction === 'left'){
      var end = firstLabel.offset().left;
      for(var i = 1; i < labels.length; i++){
        var label = labels.eq(i);
        label.css({display:'block'})
        var left = label.offset().left
        var width = label[thickness]();
        var right = left + width;
        if(right > end - 5){
          label.css({display:'none'})
        }
        else{end = left;} 
      }
    }
     
  }
  componentDidMount(){
    this.update()
  }
  componentDidUpdate(){
    this.update()
  }
  getLabels(){
    var {label = {},values} = this.context,Labels = [],{items = [],style,rotate,ignoreStep} = label;
    var Style = typeof style === 'function'?(val)=>{return style(val,this.context)}:function(val){return style}; 
    if(values){
      var start = 0,end = values.length - 1; 
      for(var i = 0; i < items.length; i++){
        var item = items[i];
        var index = values.indexOf(item.value);
        if(index === -1){continue;}
        Labels.push(<RRangeSliderLabel rotate={rotate} label={{value:index,text:item.text}} key={item.value + 'label'} style={{...Style(item.value),...item.style}} type='list'/>);
      }
    }
    else{
      var {start,end} = this.context;
      for(var i = 0; i < items.length; i++){
        if(ignoreStep && i % igonreStep !== 0){continue}
        var item = items[i];
        if(item.value < start || item.value > end){continue;}
        Labels.push(<RRangeSliderLabel rotate={rotate} label={item} key={item.value + 'label'} style={{...Style(item.value),...item.style}} type='list'/>);
      }
    }
    return Labels;
  }
  render(){
    var {label} = this.context; 
    if(!label){return null;}
    var {step} = label;
    return (
      <div className='r-range-slider-labels' ref={this.dom}>
        {step && this.getLabelsByStep()}
        {this.getLabels()}
      </div>
    );
  }
}

class RRangeSliderLabel extends Component{
  static contextType = RRangeSliderContext;
  getStyle(){
    var {start,end,getPercentByValue,direction,style,values} = this.context;
    if(values){start = 0; end = values.length - 1;}
    var {label,rotate,style} = this.props;
    var {value} = label;
    var obj = {...style};
    obj[{right:'left',left:'right',top:'bottom',bottom:'top'}[direction]] = getPercentByValue(value,start,end) + '%';
    if(rotate){
      obj.transform = `rotate(${rotate + 'deg'})`;
      obj.justifyContent = rotate > 0?'flex-start':'flex-end' 
    }
    return obj; 
  } 
  click(e){
    var {points,update,editable} = this.context;
    if(!editable){return}
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
    var {label,type} = this.props;
    var {text,id,className,edit} = label;
    return (
        <div
          id={id} onClick={this.click.bind(this)} style={this.getStyle()} 
          className={`r-range-slider-label${className?' ' + className:''}`} 
        >
        <div className='r-range-slider-label-text'>
          {edit && type === 'step'?edit(text):text}
        </div>
        </div>
      
    );
  }
}

class RRangeSliderPins extends Component{
  static contextType = RRangeSliderContext;
  getPinsByStep(){
    var {start,end,pin,getStartByStep,values} = this.context,{step,style = {}} = pin;
    if(values){start = 0; end = values.length - 1;}
    var value = getStartByStep(start,step);
    var key = 0,pins = []; 
    var Style = typeof style === 'function'?(val)=>style(val,this.context):()=>style; 
    while (value <= end) {
      pins.push(<RRangeSliderPin value={value} key={key} style={Style(value)}/>);
      value += step;
      key++;
    }
    return pins;
  }
  getPins(){
    var {pin = {},start,end} = this.context;
    var {items = [],style} = pin;
    var Pins = [];
    var Style = typeof style === 'function'?function(val){return style(val)}:function(val){return style}; 
    for(var i = 0; i < items.length; i++){
      var item = items[i];
      if(item.value < start || item.value > end){continue;}
      Pins.push(<RRangeSliderPin value={item.value} key={item.value + 'pin'} style={{...Style(item.value),...item.style}}/>);
    }
    return Pins;
  }
  render(){
    var {pin = {}} = this.context;
    var {step,items} = pin;
    return(
      <div className='r-range-slider-pins'>
        {step && this.getPinsByStep()}
        {items && this.getPins()}
      </div>
    );
  }
}
class RRangeSliderPin extends Component{
  static contextType = RRangeSliderContext;
  getStyle(){
    var {start,end,direction,getPercentByValue,values} = this.context,{value,style} = this.props;
    if(values){start = 0; end = values.length - 1;}
    var obj = {...style};
    obj[{right:'left',left:'right',top:'bottom',bottom:'top'}[direction]] = getPercentByValue(value,start,end) + '%';
    return obj;
  }
  render(){
    return (
      <div className="r-range-slider-pin" style={this.getStyle()}></div>
    );
  }
}

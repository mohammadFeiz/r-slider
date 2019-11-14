import $ from 'jquery';
export default class RActions{
  getValueByField(obj,field){
    if(!field){return undefined;}
    var fields = (typeof field === 'function'?field(obj):field).split('.');
    var value = obj[fields[0]];
    if(value === undefined){return;}
    for(var i = 1; i < fields.length; i++){
      value = value[fields[i]];
      if(value === undefined){return;}
    }
    return value;
  }
  getCopy(obj){
    return JSON.parse(JSON.stringify(obj))
  }
  setValueByField(obj,field,value){
    var fields = field.split('.');
    var node = obj;
    for(var i = 0; i < fields.length - 1; i++){
      if(node[fields[i]] === undefined){return;}
      node = node[fields[i]]; 
    }
    node[fields[fields.length - 1]] = value;
    return obj;
  }
  eventHandler(selector, event, action,type = 'bind') {
    var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" };
    event = 'ontouchstart' in document.documentElement ? me[event] : event;
    var element = typeof selector === "string"? 
    (selector === "window"?$(window):$(selector)):
    selector; 
    element.unbind(event, action); 
    if(type === 'bind'){element.bind(event, action)}
  }
  getClient(e){
    return {
      x: e.clientX === undefined?e.changedTouches[0].clientX:e.clientX, 
      y: e.clientY===undefined?e.changedTouches[0].clientY:e.clientY 
    };
  }
  getLineBySMA({p1,measure,angle}){
    return {p1,p2:{x:p1.x+(Math.cos(angle * Math.PI / 180) * measure),y:p1.y + (Math.sin(angle * -1 * Math.PI / 180) * measure)}};
  }
  getValueByRange(value,start,end){
    var val;
    if(value === undefined){return start}
    if(typeof value === 'number'){val = value;}
    else{
      if(value.indexOf('%') !== -1){
        var range = end - start;
        val = range * parseFloat(value) / 100 + start;
      }
      else{
        val = parseFloat(value);
      }
    }
    val = val > end?end:val; 
    val = val < start?start:val;
    return val;
  }
  getPercentByValue(value,start,end){
    return 100 * (value - start) / (end - start);
  }
  getStartByStep(start,step){
    var a = Math.round((start - step) / step) * step; 
    while(a < start){a += step;}
    return a;
  }
}

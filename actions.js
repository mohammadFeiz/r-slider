import $ from 'jquery';
export default class RActions{
  constructor(){
    this.getValueByField = (obj,field)=>{
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
  this.getCopy = (obj)=>{
    return JSON.parse(JSON.stringify(obj))
  }
  this.setValueByField = (obj,field,value)=>{
    var fields = field.split('.');
    var node = obj;
    for(var i = 0; i < fields.length - 1; i++){
      if(node[fields[i]] === undefined){return;}
      node = node[fields[i]]; 
    }
    node[fields[fields.length - 1]] = value;
    return obj;
  }
  this.eventHandler = (selector, event, action,type = 'bind')=> {
    var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" };
    event = 'ontouchstart' in document.documentElement ? me[event] : event;
    var element = typeof selector === "string"? 
    (selector === "window"?$(window):$(selector)):
    selector; 
    element.unbind(event, action); 
    if(type === 'bind'){element.bind(event, action)}
  }
  this.getClient = (e)=>{
    return {
      x: e.clientX === undefined?e.changedTouches[0].clientX:e.clientX, 
      y: e.clientY===undefined?e.changedTouches[0].clientY:e.clientY 
    };
  }
  this.getLineBySMA = ({p1,measure,angle})=>{
    return {p1,p2:{x:p1.x+(Math.cos(angle * Math.PI / 180) * measure),y:p1.y + (Math.sin(angle * -1 * Math.PI / 180) * measure)}};
  }
  this.getValueByRange = (value,start,end)=>{
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
  this.getPercentByValue = (value,start,end)=>{
    return 100 * (value - start) / (end - start);
  }
  this.getValueByPercent = (percent,start,end)=>{
    return start + (percent * (end - start) / 100);
  }
  this.getStartByStep = (start,step)=>{
    var a = Math.round((start - step) / step) * step; 
    while(a < start){a += step;}
    return a;
  }
  this.fix = (number,a = 6)=>{
    return parseFloat((number).toFixed(a));
  }
  this.searchComposite = (model,query,childsProp = 'childs')=>{
        var searchRowRecursive = (data,query)=>{
            if(this.searchResult !== undefined){return;}
            for(var i = 0; i < data.length; i++){
                if(this.searchResult !== undefined){break;}
                var row = data[i];
                for(var prop in query){
                    var value = this.getValueByField(row,prop);
                    if(value !== query[prop]){continue;}
                    this.searchResult = row;
                    break;
                }
                if(row[childsProp] && row[childsProp].length){
                    searchRowRecursive(row[childsProp],query);
                }
            }
        }
        this.searchResult = undefined;
        searchRowRecursive(model,query);
        return this.searchResult;
    }
    this.convertFlatToComposite = (model,idProp = 'id',parentIdProp = 'parentId')=>{
        var convertModelRecursive = (model,parentId,parentObject)=>{
          for(var i = 0; i < model.length; i++){
            var row = model[i];
            row._parent = this.getValueByField(row,parentIdProp);
            if(row._parent !== parentId){continue;}
            row._id = this.getValueByField(row,idProp);
            row._childs = [];
            parentObject.push(row);
            convertModelRecursive(model,row._id,row._childs)
          }
        };
        var result = [];
        convertModelRecursive(model,undefined,result);
        return result;
    }
    this.compaire = (a,b)=>{
        return JSON.stringify(a) === JSON.stringify(b);
    }
    this.binarySearch = (arr,value,field,limit = 0)=>{
      var start = 0,end = arr.length - 1;
      var startValue = field(arr[start]);
      var endValue = field(arr[end]);
      if(value < startValue){
        return Math.abs(value - startValue) <= limit?start:-1;
      }
      if(value > endValue){
        return Math.abs(value - endValue) <= limit?end:-1;
      }
      if(value === startValue){return start;}
      if(value === endValue){return end;}
      while(end - start > 1){
        var mid = Math.floor((end + start)/2);
        var mp = field(arr[mid]);
        var dif = value - mp;
        if(dif === 0){return mid;}
        if(dif < 0){end = mid;}//اگر مقدار در سمت چپ است
        else{start = mid;}//اگر مقدار در سمت راست است
      }
      var startDif = Math.abs(field(arr[start]) - value);
      var endDif = Math.abs(field(arr[end]) - value);
      if(startDif <= endDif){
        return startDif <=limit?start:-1;
      }
      else{
        return endDif <=limit?end:-1;
      }
    }
  }
  
}
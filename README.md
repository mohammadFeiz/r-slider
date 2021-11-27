
# r-range-slider <br>
r-range-slider is a range slider created by reactjs.
- Unlimit Styling.
- Single point , double points and multi points support. 
- Change points in wonderfull ways.
- Mobile Support(good for using in mobile browsers ,phonegap ,cordova or other hybrid frameworks).
- Responsive.
- right , left ,top ,botton direction support.


### Usage
```npm install r-range-slider``` <br/>

### load
```import Slider from "r-range-slider";```

```
import React from 'react';
```

### props list
Prop | Description | Type | Default
---- | ----------- | ---- | -------
start | Start of slider range | number | 0 
end | End of slider range | number | 100
step | Step of change slider | number | 1
min | Set Minimum amount allowed | number | optional
max | Set Maximum amount allowed(optional) | number | optional
points | Slider Points value | array of numbers| [0] 
fillStyle | get fill index as parameter and should returns fill css object | function | optional
pointStyle | get point index as parameter and should returns point css object | function | optional
changable | This allows us to change the slider with mouse | boolean | true
showValue | Makes the point value appear on the point.if false , never show value, and if 'fixed' alwais show value |boolean or 'fixed'
label | Labeling slider based on number of steps or custom labels | object | optional
onChange|function that get points and dragging as parameters|function|required
direction|Set direction of slider("left","right","top","bottom")|string|"right"
className|Set className of slider|string|optional
id|Set id of slider|string|optional
-------------------------------------------------------
- ## Basic (one point)
```javascript
<Slider points={[20]} start={0} end={100}/>
```
![alt text](/images/basic.jpg)
-------------------------------------------------------   
- ## 2 points
```javascript
<Slider points={[20,60]} start={0} end={100}/>
```
![alt text](/images/2-points.jpg)
-------------------------------------------------------
- ## multi points
```javascript
<Slider points={[20,60,80,100]} start={0} end={100}/>
```
![alt text](/images/multi-points.jpg)
-------------------------------------------------------
- ## onChange
```javascript
export default class App extends Component {
  state = {value:30,draggingValue:'value is 30',finalValue:'value is 30'};
  render() {
    let {value,draggingValue,finalValue} = this.state;
    return (
      <>
        <Slider
          start={0}
          end={100}
          points={[value]}
          onChange={(points,dragging)=>{
            this.setState({
              value:points[0],
              draggingValue:`value is ${points[0]}`
            });
            if(!dragging){
              this.setState({
                finalValue:`value is ${points[0]}`
              });
            }

          }}
        />
        <span>{draggingValue}</span>
        <br/>
        <span>{finalValue}</span>
      </> 
    );
  }
}
```
![alt text](/images/onchange1.gif)

- ## showValue(props):
##### showValue as undefined:
###### if you not set showValue, value of points will be visible when you mousedown on points. 
```javascript
<Slider />
```
![alt text](/images/showvalue-undefined.gif)
##### showValue as true:
###### if you set showValue={true}, value of points alwais will be visible. 
```javascript
<Slider 
   showValue={true}
/>
```
![alt text](/images/showvalue-true.gif)
##### showValue as false:
###### if you set showValue={false}, value of points alwais will be invisible. 
```javascript
<Slider 
   showValue={false}
/>
```
![alt text](/images/showvalue-false.gif)
-----------------------------------------------------------
- ## valueStyle(props):
```javascript
<Slider 
   className='my-slider'
   points={[30]}
   showValue={true}
   valueStyle={()=>{
     return {
        background:'orange',
        fontSize:16,
        top:-30
     }
   }}
/>
```
##### or styling by css:
```javascript
.my-slider .r-range-slider-value{
   background:orange;
   fontSize:16px;
   top:-30px;
}
```
![alt text](/images/valuestyle1.jpg)
-----------------------------------------------------
- ## fillStyle(props):
```javascript
<Slider 
      className='my-slider'
      points={[20]} 
      start={0} 
      end={100}
      fillStyle={()=>{
            return {background:'dodgerblue'}
      }}
/>
```
##### or styling by css:
```javascript
.my-slider .r-range-slider-fill{
   background:dodgerblue;
}
```
![alt text](/images/getfillstyle1.jpg)
##### other example:
```javascript
<Slider 
   className='my-slider'
   points={[20]} 
   start={0} 
   end={100}
   fillStyle={(index)=>{
      if(index === 0){
         return {background:'dodgerblue'}
      }
   }}
/>
```
##### or styling by css:
```javascript
.my-slider .r-range-slider-fill[data-index=1]{
   background:dodgerblue;
}
```

![alt text](/images/getfillstyle2.jpg)

##### other example:
```javascript
<Slider 
      start={0} 
      end={100}
      points={[20,50]}
      fillStyle={(index)=>{
            if(index === 1){
                  return {background:'dodgerblue'}
            }
      }}
/>
```
##### or styling by css:
```javascript
.my-slider .r-range-slider-fill[data-index=1]{
   background:dodgerblue;
}
```
![alt text](/images/getfillstyle3.jpg)
-------------------------------------------------
- ## pointStyle (function)
```javascript
<Slider 
   className='my-slider'
   start={0} 
   end={100}
   points={[20,60]}
   pointStyle={(index)=>{
      if(index === 0){
         return {background:'orange',borderRadius:0}
      }
      else {
         return {background:'pink'}
      }
   }}
/>
```
##### or styling by css:
```javascript
.my-slider .r-range-slider-point{
   background:pink;
}
.my-slider .r-range-slider-point[data-index=0]{
   background:orange;
   border-radius:0;
}
```
![alt text](/images/getpointstyle1.jpg)
----------------------------------------------------------------------
- ## lineStyle (function)
```javascript
<Slider 
      className='my-slider'
      start={0} 
      end={100}
      points={[20]}
      lineStyle:()=>{
            return {height:12,background:'lightblue'}
      },
/>
```
##### or styling by css:
```javascript
.my-slider .r-range-slider-line{
   height:12px;
   background:lightblue;
}
```
![alt text](/images/getlinestyle1.jpg)
-------------------------------------------------------------------
- ## labeling and scaling
```havascript
<Slider
  start={0}
  end={100}
  points={[50]}
  labelStep={10}
/> 
```
![alt text](/images/labeling1.jpg)
```havascript
<Slider
  start={0}
  end={100}
  points={[50]}
  labelStep={10}
  scaleStep={5}
/> 
```
![alt text](/images/labeling2.jpg)
```havascript
<Slider
  start={0}
  end={100}
  points={[50]}
  labelStep={10}
  scaleStep={5}
  scaleStyle={(value)=>{
    return {
      height:value % 10 === 0?12:7,
      background:'#888',
      width:2,
      transform:'translateX(-1px)'
    }
  }}
  labelStyle={()=>{
    return {
      top:40,
      color:'#888'
    }
  }}
/>
```
![alt text](/images/labeling3.jpg)
```havascript
<Slider
  start={0}
  end={100}
  points={[50]}
  labelStep={10} 
  scaleStep={5}
  scaleStyle={(value)=>{
    return {
      width:6,
      height:6,
      top:30,
      borderRadius:'100%',
      background:'#888',
      transform:'translateX(-3px)'
    }
  }}
  labelStyle={()=>{
    return {
      top:46,
      color:'#888'
    }
  }}
  lineStyle={()=>{
    return {
      background:'#ddd'
    }
  }}
  pointStyle={()=>{
    return {
      background:'#ccc',
      border:'2px solid #888'
    }
  }}
/> 
```
![alt text](/images/labeling4.jpg)

```javascript
export default class App extends Component {
  state = {date:'March'};
  render() {
    let {date} = this.state;
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return (
      <Slider
        start={0}
        end={11}
        showValue={false}
        points={[months.indexOf(date)]}
        labelStep={1}
        editLabel={(value)=>months[value].slice(0,3)}
        onChange={(points,drag)=>{
          this.setState({date:months[points[0]]})
        }}
      /> 
    );
  }
}
```
![alt text](/images/scaling-labeling1.jpg)
```javascript
import React, { Component } from 'react';
import Slider from 'r-range-slider';
import './style.css';

export default class App extends Component {
  state = {points:[-500]};
  render() {
    let {points} = this.state;
    return (
      <Slider
        start={-500}
        end={500}
        points={points}
        scaleStep={10}
        scaleStyle={(value)=>{
          if(value % 100 === 0){return {height:'16px'}}
          if(value % 50 === 0){return {height:'8px'}}
          return {height:'5px'} 
        }}
        labelStep={100}
        editLabel={(value)=>{
          if(value === -300){return 'min'}
          if(value === 300){return 'max'}
          return value;      
        }}
        labelStyle={(value)=>{
          if(value === -300 || value === 300){
            return {color:'red',fontWeight:'bold',fontSize:12}
          }
        }}
      /> 
    );
  }
}
```
![alt text](/images/scale1.jpg)

--------------------------------------------------
- ## awesome slider configuration1
```javascript
<div className='slider-container'>   
<Slider
   points={[30]}
   labelStep={10}
   scaleStep={10}
   style={()=>{
      return {
         background:'#666',
         padding:'0 12px',
         height:24,
         borderRadius:40,
         boxShadow:'inset 0 1px 4px 0px'
      }
   }}
   pointStyle={()=>{
      return {
        width:40,
        height:40,
        background:'#aaa',
        border:'3px solid #666',
        boxShadow:'4px 4px 8px 0px rgba(0,0,0,.5)'
      }
   }}
   labelStyle={()=>{
      return {top:63,color:'#666'}
   }}      
   scaleStyle={()=>{
      return {
        width:6,
        height:6,
        top:48,
        background:'#666',
        borderRadius:'100%',
        transform:'translateX(-3px)'
      }
   }}
   lineStyle={()=>{
      return {background:'#777'}
   }}
   showValue={true}
   valueStyle={()=>{
      return {
        background:'none',
        top:-8,
        color:'#666'
      }
   }}
/>
</div>
```
css
```javascript
body{
  background:#ccc;
}
.slider-container{
  background: linear-gradient(to bottom, #454545 0%, #ddd 100%);
  padding:10px;
  box-sizing:border-box;
  border-radius:40px; 
}
```
![alt text](/images/awesome1.jpg)
--------------------------------------------------
- ## awesome slider configuration2
```javascript
<div className='slider-container'>   
<Slider
   start={1}
   end:{7}
   points={[3]}
   pointStyle={()=>{
      return {
        width:30,
        height:30,
        border:'3px solid #888',
        background:'#ddd'
      }
   }}
   scaleStep={1}
   scaleStyle={()=>{
      return {
        width:30,
        height:30,
        borderRadius:'100%',
        top:3,
        transform:'translateX(-15px)',
        background:'#888',
        zIndex:10,
      }
   }}
   lineStyle{()=>{
      return {
        background:'#888'
      }
   }}
   showValue={true}
   valueStyle={()=>{
      return {
        background:'none',
        color:'#888',
        top:-11,
        fontSize:16
      }
   }}
/>
</div>
```
![alt text](/images/awesome2.jpg)

--------------------------------------------------
- ## awesome slider configuration3
```javascript
class App extends Component {
  state = {value:true};
  render() {
    let {value} = this.state;
    return (
      <div className='slider-container'>
          <RRangeSlider
            points={[value === false?0:1]}
            start={0}
            end={1}
            showValue={false}
            attrs={{
              onClick:()=>{
                this.setState({value:!value})
              }
            }}
            getText={(index)=>{
              return index === 0?'ON':'OFF';
            }}
            textStyle={(index)=>{
              if(index === 0){
                return {
                  color:'#fff',
                  transform:'translateX(-10px)'

                }
              }
              else if(index === 1){
                return {
                  color:'#fff',
                  transform:'translateX(10px)'

                }
              }
            }}
            style={()=>{
              return {
                width:90,
                height:36,
                background:'#111',
                borderRadius:36,
                padding:'0 18px',
                boxShadow:'inset 0 2px 6px 1px #000',
                border:'1px solid',
                borderColor:'#222 #222 #333 #222',
              }
            }}
            pointStyle={()=>{
              return {
                width:36,
                height:36,
                background:'#444'
              }
            }}
            lineStyle={()=>{
              return {display:'none'}
            }}
          /> 
        
      </div>
    );
  }
}
```
![alt text](/images/awesome3.gif)


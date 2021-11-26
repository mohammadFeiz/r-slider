
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
getFillStyle | get fill index as parameter and should returns fill css object | function | optional
getPointStyle | get point index as parameter and should returns point css object | function | optional
changable | This allows us to change the slider with mouse | boolean | true
showValue | Makes the point value appear on the point.if false , never show value, and if 'fixed' alwais show value |boolean or 'fixed'
label | Labeling slider based on number of steps or custom labels | object | optional
onchange|callback function that is to be executed in end of changing point(s) of slider. this function get all props of slider as parameter|function
ondrag|callback function that is to be executed while draging point(s) of slider. this function get all props of slider as parameter.|function
direction|Set direction of slider("left","right","top","bottom")|string|"right"
className|Set className of slider|string|optional
id|Set id of slider|string|optional

### Basic (one point)
```javascript
<Slider points={[20]} start={0} end={100}/>
```
![alt text](/images/basic.jpg)
         
### 2 points
```javascript
<Slider points={[20,60]} start={0} end={100}/>
```
![alt text](/images/2-points.jpg)

### multi points
```javascript
<Slider points={[20,60,80,100]} start={0} end={100}/>
```
![alt text](/images/multi-points.jpg)

### getFillStyle
```javascript
<Slider 
      points={[20]} 
      start={0} 
      end={100}
      getFillStyle={()=>{
            return {background:'dodgerblue'}
      }}
/>
```
![alt text](/images/getfillstyle1.jpg)

```javascript
<Slider 
      points={[20]} 
      start={0} 
      end={100}
      getFillStyle={(index)=>{
            if(index === 0){
                  return {background:'dodgerblue'}
            }
      }}
/>
```
![alt text](/images/getfillstyle2.jpg)

```javascript
<Slider 
      start={0} 
      end={100}
      points={[20,50]}
      getFillStyle={(index)=>{
            if(index === 1){
                  return {background:'dodgerblue'}
            }
      }}
/>
```
![alt text](/images/getfillstyle3.jpg)

### getPointStyle (function)
```javascript
<Slider 
      start={0} 
      end={100}
      points={[20,60]}
      getPointStyle={(index)=>{
            if(index === 0){
                  return {background:'orange',borderRadius:0}
            }
            else {
                  return {background:'pink'}
            }
      }}
/>
```
![alt text](/images/getpointstyle1.jpg)

### getLineStyle (function)
```javascript
<Slider 
      start={0} 
      end={100}
      points={[20]}
      getLineStyle:()=>{
            return {height:12,background:'lightblue'}
      },
/>
```
![alt text](/images/getlinestyle1.jpg)

### labeling
```javascript
<Slider 
      start={0}
      end={11}
      step={1}
      labelStep={1}
      editLabel={(value)=>{
            return ['January','February','March','April','May','June','July','August','September','October','November','December'][value].slice(0,3)
      }}
      getLabelStyle={(value)=>{
            if(value === 6){return {fontSize:12,color:'red',fontWeight:'bold'}}
            return {fontSize:10,color:'dodgerblue'}
      }}
/>
```
![alt text](/images/label1.jpg)
### scaling
```javascript
<Slider 
    start={-500}
    end={500}
    points={[-500]}
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
    getLabelStyle={(value)=>{
      if(value === -300 || value === 300){
        return {color:'red',fontWeight:'bold',fontSize:12}
      }
    }}
/>
```
![alt text](/images/scale1.jpg)



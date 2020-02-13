
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
start | Start of slider range | number |  
end | End of slider range | number | 
step | Step of change slider | number | 1
min | Set Minimum amount allowed | number | optional
max | Set Maximum amount allowed(optional) | number | optional
points | Set Slider Points | array of objects| 
changable | This allows us to change the slider with mouse | boolean | true
showValue | Makes the point value appear on the point.if false , never show value, and if 'fixed' alwais show value |boolean or 'fixed'
label | Labeling slider based on number of steps or custom labels | object | optional
onchange|callback function that is to be executed in end of changing point(s) of slider. this function get all props of slider as parameter|function
ondrag|callback function that is to be executed while draging point(s) of slider. this function get all props of slider as parameter.|function
direction|Set direction of slider("left","right","top","bottom")|string|"right"
className|Set className of slider|string|optional
id|Set id of slider|string|optional

<ul>
      <li>1- value:value of point in range(number).</li>
      <li>2- fillColor: set color of range line in slider.(string or function that receives the point object as parameter).(default is 'blue')</li>
      <li>3- text: this text will be rendered in center of range line.(string or function that receives the point object as parameter).</li>
      <li>4- className:set className for point.useful in set style of point.(string)</li>
      <li>5- style:set inline css for point.(object or function that receives the point object as parameter)</li>
      </ul>
<a href="https://stackblitz.com/edit/r-slider-demo1?file=style.css">Single range width Label Demo</a><br/>
<a href="https://stackblitz.com/edit/r-slider-demo2?file=index.js">use custome style and range text</a><br/>
<a href="https://stackblitz.com/edit/react-9tuesa">Use slider as switch</a><br/>
<a href="https://stackblitz.com/edit/r-slider-triple-mode-switch?file=index.js">Use slider as triple mode switch</a><br/>
<a href="https://stackblitz.com/edit/awesome-sliders?file=index.js">Awesome Demos</a><br/>


         
         

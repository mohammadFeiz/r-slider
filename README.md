
# r-slider <br>
a javascript plugin for all in one sliders <br>
r-slider is a multi-purpose, highly customizable slider control plugin that helps users select a single value or a range of values in an elegant way.
Also can be used to create toggle switch, progress bar, step based form wizard with your own styles. Check out the examples in the zip for more information.

<h3>Advantages of r-slider</h3>
<ul>
<li>
easy to use.
</li>
  <li>
customizable.
</li>
  <li>
unlimit style.
</li>
  <li>
responsive.
</li>
  <li>
use in many ui controls like:switch,slider,wizard,progressbar,games and other.
</li>
  <li>
rtl,ltr and vertical slider support.
</li>
<li>
mobile support.
</li>
</ul>

<h3>props list</h3>
<table>
  <tr>
    <th>prop</th>
    <th>Description</th>
    <th>Type</th>
  </tr>
  <tr>
     <td>start</td>
     <td>Start of slider range</td>
  <td>number</td>
  </tr>
  <tr>
    <td>end</td>
     <td>End of slider range</td>
  <td>number</td>
  </tr>
  <tr>
    <td>step</td>
     <td>Step of change slider</td>
  <td>number. minimum and default is 1</td>
  </tr>
  <tr>
    <td>points</td>
     <td>Set Slider Points. each point is an object that can get 4 properties:<br />
    <ul>
      <li>1- value:value of point in range.</li>
      <li>2- pointColor: set color of point in slider.(string or function).(default is 'blue') </li>
      <li>3- fillColor: set color of range line in slider..(string or function).(default is 'blue')</li>
      <li>4- text: this text will be rendered in center of range line.(string or function).</li>
      <li>5- rounded: set rounded:false to omit border radius of point.(default is true)</li>
      </ul>
    </td>
  <td>Array of objects</td>
  </tr>
  <tr>
     <td>changable</td>
     <td>This allows us to change the slider with mouse.default is true</td>
  <td>boolean</td>
  </tr>
  <tr>
     <td>showValue</td>
     <td>Makes the point value appear on the point.default is true</td>
  <td>boolean</td>
  </tr>
  <tr>
     <td>fixValue</td>
     <td>Makes the point value always show. default is false</td>
  <td>boolean</td>
  </tr>
  <tr>
     <td>min</td>
     <td>Set Minimum amount allowed.(optional)</td>
     <td>number</td>
  </tr>
  <tr>
     <td>max</td>
     <td>Set Maximum amount allowed(optional)</td>
     <td>number</td>
  </tr>
  <tr>
     <td>pinStep</td>
     <td>Scale based on number of steps(optional)</td>
     <td>number</td>
  </tr>
  <tr>
     <td>labelStep</td>
     <td>Labeling slider based on number of steps(optional)</td>
     <td>number</td>
  </tr>
  <tr>
     <td>onchange</td>
     <td>
       onchange is a callback function that is to be executed while dragging or changing point(s) of slider
        this function get 2 parameters,
       <ul>
         <li>
           first parameter is an object that contain all of props that used in slider component 
           </li>
         <li>
           second parameter is a boolean that define last change of dragging 
           </li>
         </ul>
    </td>
     <td>callback</td>
  </tr>
  <tr>
     <td>direction</td>
     <td>Set direction of slider("left","right","up","down")(default is "right")</td>
     <td>string</td>
  </tr>
  <tr>
     <td>point_width</td>
     <td>Set width of slider point(s)(default is 10)</td>
     <td>object</td>
  </tr>
  <tr>
     <td>point_height</td>
     <td>Set height of slider point(s)(default is 10)</td>
     <td>object</td>
  </tr>
  <tr>
     <td>thickness</td>
     <td>Set thickness of slider line(Groove)</td>
  </tr>
  <tr>
     <td>margin</td>
     <td>Set empty space in sided of slider</td>
  </tr>
</table>

<a href="https://stackblitz.com/edit/r-slider-demo1?file=style.css">Demo1</a>
          

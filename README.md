
# r-range-slider <br>
r-range-slider is a range slider created by reactjs.
- Unlimit Styling.
- Single point , double points and multi points support. 
- Change points in wonderfull ways.
- Mobile Support(good for using in mobile browsers ,phonegap ,cordova or other hybrid frameworks).
- Responsive.
- right , left ,top ,botton direction support.

### Images

<h3>Usage</h3>
    npm install r-range-slider <br/>
    import Slider from "@mohamadfeiz/r-slider";
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
     <td>Set Slider Points. each point is an object that can get 5 properties:<br />
    <ul>
      <li>1- value:value of point in range(number).</li>
      <li>2- fillColor: set color of range line in slider.(string or function that receives the point object as parameter).(default is 'blue')</li>
      <li>3- text: this text will be rendered in center of range line.(string or function that receives the point object as parameter).</li>
      <li>4- className:set className for point.useful in set style of point.(string)</li>
      <li>5- style:set inline css for point.(object or function that receives the point object as parameter)</li>
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
      <td>Makes the point value appear on the point. default is true. if false , never show value, and if 'fix' alwais show value</td>
      <td>boolean(false or true) or 'fix'</td>
   </tr>
   <tr>
      <td>showPoint</td>
      <td>show/hide slider points. default is true.</td>
      <td>boolean</td>
   </tr>
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
     <td>scale</td>
     <td>Scaling slider based on number of steps(optional).is an object that can get 2 properties<br />
      <ul>
         <li>1- step:Step of scaling slider(number).</li>
         <li>2- style: set inline css of scale element .(object or function that receives the value of scale as parameter).</li>
      </ul>
     </td>
     <td>object</td>
  </tr>
  <tr>
     <td>label</td>
     <td>Labeling slider based on number of steps and custom labels(optional).is an object that can get 3 properties<br />
      <ul>
         <li>1- step:Step of scaling slider(number).</li>
         <li>2- items:list of custom labels(array of objects).each object has text,value and color as properties:</li>
         <li>3- style: set inline css of label element .(object or function that receives the value of label as parameter).</li>
      </ul>
     </td>
     <td>object</td>
  </tr>
  <tr>
     <td>onchange</td>
     <td>
       onchange is a callback function that is to be executed in end of changing point(s) of slider
        this function get all props of slider as parameter in type of object.
    </td>
     <td>callback</td>
  </tr>
  <tr>
     <td>ondrag</td>
     <td>
       ondrag is a callback function that is to be executed while draging point(s) of slider
        this function get all props of slider as parameter in type of object.
    </td>
     <td>callback</td>
  </tr>
  <tr>
     <td>direction</td>
     <td>Set direction of slider("left","right","up","down")(default is "right")</td>
     <td>string</td>
  </tr>
  <tr>
     <td>className</td>
     <td>Set className of slider</td>
     <td>string</td>
  </tr>
  <tr>
     <td>id</td>
     <td>Set id of slider</td>
     <td>string</td>
  </tr>

</table>

<a href="https://stackblitz.com/edit/r-slider-demo1?file=style.css">Single range width Label Demo</a><br/>
<a href="https://stackblitz.com/edit/r-slider-demo2?file=index.js">use custome style and range text</a><br/>
<a href="https://stackblitz.com/edit/react-9tuesa">Use slider as switch</a><br/>
<a href="https://stackblitz.com/edit/r-slider-triple-mode-switch?file=index.js">Use slider as triple mode switch</a><br/>
<a href="https://stackblitz.com/edit/awesome-sliders?file=index.js">Awesome Demos</a><br/>


         
         

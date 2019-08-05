import React, { Component,Fragment } from 'react';
import { render } from 'react-dom';
import Slider from './slider';
import './index.css';
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  onDrag(obj){
    var {items} = this.state;
    var id = obj.id;
    items[obj.id].points = obj.points;
    this.setState({items});
    console.log('onDrag');
  }
  onChange(obj){
    var {items} = this.state;
    var id = obj.id;
    items[obj.id].points = obj.points;
    this.setState({items});
    console.log('onChange');
  }
  render() {
      return (
        <Fragment>
          <Slider 
            start={0} 
            step={1} 
            end={100}
            points={[
            {value:30,pointColor:'blue'},
            {value:70,rangeColor:'blue',pointColor:'blue'},
          ]}
          labelStep={10}
          pinStep={10}
          labelPosition={{y:20}}
          fixValue={true}
        />

        <Slider 
            id='slider1'
            start={0} 
            step={1} 
            end={10}
            points={[
            {value:3,pointColor:'#aaa',rangeColor:'#fff'},
          ]}
          point_width={30}
          point_height={30}
          thickness={5}
          labelStep={1}
          labelPosition={{y:45}}
          fixValue={true}
          showValue={false}
        />

        <Slider 
            id='slider2'
            start={0} 
            step={1} 
            end={10}
            points={[
            {value:3},
          ]}
          point_width={20}
          point_height={20}
          thickness={0}
          labelStep={1}
          labelPosition={{y:10}}
          margin={10}
          showValue={false}
          
        />
        <Slider 
            id='slider3'
            start={0} 
            step={1} 
            end={2}
            points={[
            {value:1,pointColor:'#fff'},
          ]}
          backgroundColor={(obj)=>{
            if(obj.points[0].value === 0){
              return 'red'
            }
            else if(obj.points[0].value === 1){
              return '#999';
            }
            else {return 'green'}
          }}
          point_width={12}
          point_height={12}
          thickness={0}
          margin={3}
          showValue={false}
          
        />
        <Slider 
            id='slider4'
            start={0} 
            step={1} 
            end={1}
            points={[
            {value:1,pointColor:(obj)=>{
            if(obj.points[0].value === 0){
              return 'red'
            }
            else {return 'green'}
          }},
          ]}
          
          point_width={12}
          point_height={12}
          thickness={0}
          margin={3}
          showValue={false}
          
        />
        </Fragment>
      );
  }
}



render(
  <App />
  ,document.getElementById('root'));

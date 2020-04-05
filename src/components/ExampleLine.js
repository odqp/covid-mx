import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

class ExampleLine extends Component {

  constructor(props)
  {
    super(props)

    this.state = {
      isLoaded: true,
      chartData: {}
    };

  }

  componentDidMount()
  {
    axios.get('https://corona.lmao.ninja/v2/historical/mx')
    .then(response => {      

      let recovered = response.data.timeline.cases;
      let labels = [];
      let values = []

      for (var key in recovered) {
        labels.push(key)
        values.push(recovered[key])
      }
    
      let finalData = {
      labels: labels,
      datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: values
          }
        ]
      };

      this.setState({chartData: finalData, isLoaded: true });
    })

  }

  render() {    
    if(!this.state.isLoaded)
    {

    }
    else{
      return (
        <div>
          <h2>Bar Example (custom size)</h2>
          <Line 
            data={this.state.chartData}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      );
    }
  }
}

export default ExampleLine;

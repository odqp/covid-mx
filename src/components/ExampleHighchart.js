import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
 
class ExampleHighchart extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {},
      hoverData: null
    };
  }
 
  componentDidMount()
  {
    axios.get('https://corona.lmao.ninja/v2/historical/mx')
    .then(response => {
      console.log(response);           

      let recovered = response.data.timeline.cases;
      let labels = [];
      let values = []

      for (var key in recovered) {
        labels.push(key)
        values.push(recovered[key])
      }
    
      let finalData = {
            xAxis: {
                categories: labels,
            },
            series: [
                { data: values }
            ],
            plotOptions: {
            series: {
                point: {                
                }
            }
            }
        };

      this.setState({chartOptions: finalData, isLoaded: true });
    })

  }
 
  render() {
    const { chartOptions } = this.state;
 
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />           
      </div>
    )
  }
}

export default ExampleHighchart;
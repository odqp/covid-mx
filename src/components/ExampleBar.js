import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class ExampleBar extends Component {

  constructor(props)
  {
    super(props)
    this.state = {
      chartData: props.chartData
    }
  }

  render() {
    return (
      <div>
        <h2>Bar Example (custom size)</h2>
        <Bar
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

export default ExampleBar;

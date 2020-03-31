import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ExampleBar from "./components/ExampleBar"

const dataBar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class App extends Component {
  
  constructor()
  {
    super()
    this.state = {
      chartData: {}
    }
  } 

  componentWillMount(){
    this.getChartData();
  }

  getChartData()
  {
    this.setState({
      chartData: dataBar
    });
  }

  render(){
      return (
        <div className="App">
          <header className="App-header">        				      
          <ExampleBar chartData={this.state.chartData} />
          </header>          
        </div>
      );
    }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import ExampleBar from "./components/ExampleBar"
import ExampleHighchart from "./components/ExampleHighchart"
import ExampleLine from "./components/ExampleLine"
//import ExampleHighchartMap from "./components/ExampleHighchart"


class App extends Component {
  
  constructor()
  {
    super()
    this.state = {
      isLoading: false,
      chartData: {}      
    }
  }

  render(){
      return (
        <div className="App">
          <header className="App-header">        				                  
          </header>
          {/*<ExampleBar chartData={this.state.chartData} />*/}
            <ExampleHighchart />
            <ExampleLine />           
        </div>
      );
    }
}



export default App;

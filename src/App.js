import React, { Component } from 'react';
import './App.css';
import ExampleBar from "./components/ExampleBar"
import ExampleHighchart from "./components/ExampleHighchart"
import ExampleLine from "./components/ExampleLine"
import ExampleHighchartMap from "./components/ExampleHighchartMap"
import AreaHighchart from "./components/AreaHighchart"


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
            <AreaHighchart />
            <ExampleHighchart />
            <ExampleLine />
            <ExampleHighchartMap />
            
        </div>
      );
    }
}



export default App;

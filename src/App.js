import React, { Component } from 'react';
import './App.css';
import ExampleBar from "./components/ExampleBar"
import ExampleHighchart from "./components/ExampleHighchart"
import ExampleLine from "./components/ExampleLine"
import MapHighchart from "./components/MapHighchart"
import AreaHighchart from "./components/AreaHighchart"
import StateDetailHighchart from "./components/StateDetailHighchart"
import AgeHighchart from "./components/AgeHighchart"

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
            <MapHighchart />
            <StateDetailHighchart />
            <AgeHighchart />
            <ExampleLine />
        </div>
      );
    }
}



export default App;

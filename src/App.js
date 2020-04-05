import React, { Component } from 'react';
import './App.css';
import ExampleBar from "./components/ExampleBar"
import ExampleHighchart from "./components/ExampleHighchart"
import ExampleLine from "./components/ExampleLine"
import MapHighchart from "./components/MapHighchart"
import AreaHighchart from "./components/AreaHighchart"
import StateDetailHighchart from "./components/StateDetailHighchart"
import AgeHighchart from "./components/AgeHighchart"
import CountriesCasesHighchart from "./components/CountriesCasesHighchart"
import CountriesDeathsHighchart from "./components/CountriesDeathsHighchart"

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
            <AreaHighchart />
            <MapHighchart />
            <StateDetailHighchart />
            <AgeHighchart />
            <CountriesCasesHighchart />
            <CountriesDeathsHighchart />            
        </div>
      );
    }
}



export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ExampleBar from "./components/ExampleBar"

var dataBar;

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
          <ExampleBar chartData={this.state.chartData} />
          </header>          
        </div>
      );
    }
}



export default App;

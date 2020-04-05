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
import AgeTotalHichchart from "./components/AgeTotalHichchart"

import { Col, Row, Container, Card } from "react-bootstrap";

class App extends Component {

  constructor() {
    super()
    this.state = {
      isLoading: false,
      chartData: {}
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <Container fluid>
        <br />
          <Row>
            <Col>
              <Card >
                <Card.Body>
                  <AreaHighchart />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={6}>
              <Card >
                <Card.Body>
                  <MapHighchart />
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <Card >
                <Card.Body>
                  <StateDetailHighchart />
                </Card.Body>
              </Card>

            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={6}>
              <Card >
                <Card.Body>
                  <AgeTotalHichchart />
                </Card.Body>
              </Card>            
            </Col>
            <Col sm={6}>
              <Card >
                <Card.Body>
                  <AgeHighchart />
                </Card.Body>
              </Card>            
            </Col>
          </Row>
          <br />
        <Row>
          <Col sm={6}>
            <Card >
              <Card.Body>
                <CountriesCasesHighchart />
              </Card.Body>
            </Card>

          </Col>
          <Col sm={6}>
            <Card >
              <Card.Body>
                <CountriesDeathsHighchart />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        </Container>

        <footer className="App-header">
        </footer>
      </div >
    );
  }
}



export default App;

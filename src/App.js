import React, { Component } from 'react';
import './App.css';
import MapHighchart from "./components/MapHighchart"
import AreaHighchart from "./components/AreaHighchart"
import StateDetailHighchart from "./components/StateDetailHighchart"
import AgeHighchart from "./components/AgeHighchart"
import CountriesCasesHighchart from "./components/CountriesCasesHighchart"
import CountriesDeathsHighchart from "./components/CountriesDeathsHighchart"
import AgeTotalHichchart from "./components/AgeTotalHichchart"
import ReactGA from 'react-ga';

import { Col, Row, Container, Card } from "react-bootstrap";

class App extends Component {

  constructor() {
    super()
    this.state = {
      isLoading: false,
      chartData: {}
    }
  }
  
  componentDidMount() {
    ReactGA.initialize('UA-162747098-1');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <p>Mi México en COVID</p>  
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
        <Row>
            <Col>
              <Card >
                <Card.Body>
                  <p>Fuentes: </p>
                  [https://www.gob.mx/salud/documentos/coronavirus-covid-19-comunicado-tecnico-diario-238449]
                  <br/>
                  [https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports]
                  <br/>
                  [https://www.worldometers.info/coronavirus]
                  <br/>
                  [https://github.com/novelcovid/api]
                  <br/>
                  [https://thevirustracker.com/api]

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

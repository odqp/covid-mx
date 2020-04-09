import React, { Component, Router } from 'react';
import './App.css';
import MapHighchart from "./components/MapHighchart"
import AreaHighchart from "./components/AreaHighchart"
import StateDetailHighchart from "./components/StateDetailHighchart"
import AgeHighchart from "./components/AgeHighchart"
import CountriesCasesHighchart from "./components/CountriesCasesHighchart"
import CountriesDeathsHighchart from "./components/CountriesDeathsHighchart"
import AgeTotalHichchart from "./components/AgeTotalHichchart"
import CasesByDay from "./components/CasesByDay"
import DeathsByDay from "./components/DeathsByDay"
import AgePercentage from "./components/AgePercentage"
import SexPercentage from "./components/SexPercentage"
import ReactGA from 'react-ga';
import { Col, Row, Container, Card } from "react-bootstrap";
import dataService from "./services/dataService"
import constants from "./utils/consts"
import ReactSpinner from 'react-bootstrap-spinner'

class App extends Component {

  constructor() {
    super()
    this.constants = new constants();
    this.service = new dataService();
    this.state = {
      isLoading: true,
      chartData: {},
      mexicoData: [],
      ageData: [],
    }

    ReactGA.initialize(this.constants.GAID);
    ReactGA.pageview(this.constants.PAGE_VIEW);
  }

  async getMexico() {
    await this.service.getMexico().then(items => {
      this.setState({ mexicoData: items });
    }
    );
  }

  async getAge() {
    await this.service.getAge().then(items => {
      this.setState({ ageData: items });
    }
    );
  }

  async componentWillMount() {
    await this.getMexico();
    await this.getAge();

    this.setState({ isLoading: false });
  }

  render() {
    const { mexicoData, isLoading, ageData } = this.state

    if (isLoading) return <ReactSpinner type="grow" color="primary" size="3" />;

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
                  <CasesByDay mexicoData={mexicoData} />
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <Card >
                <Card.Body>
                  <DeathsByDay mexicoData={mexicoData} />
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
            <Col sm={4}>
              <Card >
                <Card.Body>
                  <AgeTotalHichchart />
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4}>
              <Card >
                <Card.Body>
                  <SexPercentage ageData={ageData} />
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4}>
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
                  <br />
                  [https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports]
                  <br />
                  [https://www.worldometers.info/coronavirus]
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

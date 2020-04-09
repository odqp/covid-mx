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
import { Col, Row, Container, Card, Navbar, NavItem, NavDropdown, MenuItem, Nav } from "react-bootstrap";
import dataService from "./services/dataService"
import constants from "./utils/consts"
import ReactSpinner from 'react-bootstrap-spinner'
import { dateFormater } from "./utils/utils"


var summaryStyle = {
  fontSize: "2vw"
};

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
      statesData: [],
      totalCases: 0,
      totalDeaths: 0,
      totalPossibles: 0,
      newCases: 0,
      newDeaths : 0,
      lastDate : ""
    }

    ReactGA.initialize(this.constants.GAID);
    ReactGA.pageview(this.constants.PAGE_VIEW);
  }

  async getMexico() {
    await this.service.getMexico().then(items => {
      
      let newCases = parseInt(items[items.length-1].Cases) - parseInt(items[items.length-2].Cases);
      let newDeaths = parseInt(items[items.length-1].Deaths) - parseInt(items[items.length-2].Deaths);
      let lastDate = dateFormater(items[items.length-1].Date);

      this.setState({ mexicoData: items, newCases: newCases, newDeaths: newDeaths, lastDate: lastDate });      
    }
    );
  }

  async getAge() {
    await this.service.getAge().then(items => {
      this.setState({ ageData: items });
    }
    );
  }

  async getStates() {

    await this.service.getStates().then(items => {
      let totalCases = 0;
      let posibleCases = 0;
      let deathsCases = 0;
      items.forEach(function (item) {
        totalCases += (parseInt(item[2]));
        posibleCases += (parseInt(item[4]));
        deathsCases += (parseInt(item[5]));
      });

      this.setState({ statesData: items, totalCases: totalCases, totalDeaths: deathsCases, totalPossibles: posibleCases });
    }
    );
  }



  async componentWillMount() {
    await this.getMexico();
    await this.getAge();
    await this.getStates();

    this.setState({ isLoading: false });
  }

  

  render() {
    const { mexicoData, isLoading, ageData, totalCases, totalDeaths, totalPossibles, newCases, newDeaths, lastDate } = this.state

    if (isLoading) return <ReactSpinner type="grow" color="primary" size="3" />;

    return (

      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
            <img
              alt=""
              src={process.env.PUBLIC_URL + '/logo192.png'}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
              Mi México en COVID
            </Navbar.Brand>
        </Navbar>

        <Container fluid>
          <br />
          <Row>
            <Col>
              
                  <Row>
                    <Col sm={2}>
                      <Card
                        bg={'danger'}
                        text={'white'}
                      >
                        <Card.Header><b>Detectados: {totalCases}</b></Card.Header>                        
                      </Card>
                    </Col>
                    <Col sm={2}>
                      <Card
                        bg={'secondary'}
                        text={'white'}
                      >
                        <Card.Header><b>Defunciones: {totalDeaths}</b></Card.Header>                        
                      </Card>
                    </Col>
                    <Col sm={2}>
                      <Card
                        bg={'warning'}
                        text={'white'}
                      >
                        <Card.Header><b>Sospechosos: {totalPossibles}</b></Card.Header>                        
                      </Card>
                    </Col>
                    <Col sm={2}>
                      <Card
                        bg={'danger'}
                        text={'white'}
                      >
                        <Card.Header><b>Nuevos: {newCases}</b></Card.Header>                        
                      </Card>
                    </Col>
                    <Col sm={2}>
                      <Card
                        bg={'secondary'}
                        text={'white'}                        
                      >
                        <Card.Header><b>Nuevas defunciones: {newDeaths}</b></Card.Header>                        
                      </Card>
                    </Col>
                    <Col sm={2}>
                      <Card
                        bg={'info'}
                        text={'white'}                        
                      >
                        <Card.Header><b >Fecha Actualización: {lastDate}</b></Card.Header>                        
                      </Card>
                    </Col>
                  </Row>
            </Col>
          </Row>
          <br />
          <Row>            
            <Col sm={12}>
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

        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="https://twitter.com/MexicoCovid " target="_blank">
            <img
              alt=""
              src={process.env.PUBLIC_URL + '/twitter.png'}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
              @MexicoCovid
            </Navbar.Brand>
        </Navbar>
      </div >
    );
  }
}



export default App;

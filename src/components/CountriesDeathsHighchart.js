import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
import {dateFormater} from "../utils/utils"
 
class CountriesDeathsHighchart extends Component {

    static formatTooltip(tooltip, x = this.x, points = this.points) {
        var toolText = '<b>[' + x + '] --> ' + points[0].total + '</b><br>';        
        points.forEach((point) =>
            toolText += '<br/><span style="color:' + point.series.color + '">\u25CF</span>' + point.series.name + ' :<b>' + point.y + '</b>'
        );
        return toolText;
      }

  constructor(props) {
    super(props);
 
    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {},
      mxValues: [],
      hoverData: null
    };
  }
 
  async componentDidMount()
  {
    var valoresMX = [];
    var valoresEspa = [];
    var valoresItaly = [];
    var valoresUSA = [];
    let labels = []; 
    var countMXDays = 0;
    
    await axios.get('https://api.thevirustracker.com/free-api?countryTimeline=mx')
    .then(response => {
      let casesMx = response.data.timelineitems[0];      
           
      let casesMxValues = [];
     
      for (var key in casesMx) {
        if(key != "stat"){
            //labels.push(dateFormater(key))
            casesMxValues.push(casesMx[key].total_deaths)

        }
      }
      valoresMX = casesMxValues;
      countMXDays = casesMxValues.length-1;
    })    

    await axios.get('https://api.thevirustracker.com/free-api?countryTimeline=es')
    .then(response => {
      let casesEspa = response.data.timelineitems[0];
           
      let casesEspaValues = [];
     
      for (var key in casesEspa) {
        if(key != "stat"){          
            labels.push(key)
            casesEspaValues.push(casesEspa[key].total_deaths)            
          }
      }
      valoresEspa = casesEspaValues;      
    })

    await axios.get('https://api.thevirustracker.com/free-api?countryTimeline=it')
    .then(response => {
      let casesItaly = response.data.timelineitems[0];      
           
      let casesItalyValues = [];
     
      for (var key in casesItaly) {
        if(key != "stat"){
            casesItalyValues.push(casesItaly[key].total_deaths)            
          }
      }
      valoresItaly = casesItalyValues;      
    })

    await axios.get('https://api.thevirustracker.com/free-api?countryTimeline=us')
    .then(response => {
      let cases = response.data.timelineitems[0];      
           
      let casesValues = [];
     
      for (var key in cases) {
        if(key != "stat"){
            casesValues.push(cases[key].total_deaths)            
          }
      }
      valoresUSA = casesValues;      
    })


    let finalData = {
      chart: {
          height: 600, //(9 / 16 * 100) + '%',
          type: 'line'
      },
      title: {
          text: 'Muertes registradas por dia trascurrido'
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          //categories: labels,
          tickmarkPlacement: 'off',
          title: {
              enabled: false
          },          
          plotBands: [{ // visualize the weekend
            from: 0,
            to: countMXDays,
            color: '#ffeae9'
        }]
      },
      yAxis: {
          title: {
              enabled: false
          }
      },
      tooltip: {
          crosshairs: true,
          split: true,            
          shared: true
          //formatter: countriesCasesHighchart.formatTooltip
      },
      series: [
        
        {
          name: 'USA',
          data: valoresUSA,
          color: "#ffa94e"
      },
      {
           name: 'España',
           data: valoresEspa,
           color: '#ff504e'
       },
       {
         name: 'Italia',
         data: valoresItaly,         
          color: "#4ea5ff"
       },
       {
        name: 'México',
        data: valoresMX,
        color: '#006700',
        lineWidth: 3
      }    
    ]
  };

  this.setState({chartOptions: finalData, isLoaded: true });
  }
 
  render() {
    const { chartOptions } = this.state;
 
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />           
      </div>
    )
  }
}

export default CountriesDeathsHighchart;
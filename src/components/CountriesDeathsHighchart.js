import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
import {dateFormater} from "../utils/utils"
import ReactSpinner from 'react-bootstrap-spinner'
 
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
      hoverData: null,
      isLoading: true
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
    
    await axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/country?name=mexico')
      .then(response => {
        let casesArray = response.data.Items;

        let casesValues = [];

        var sortedArray = casesArray.sort(function (a, b) {
          return a["SortId"] - b["SortId"] ;
      });

      sortedArray.forEach(function (item) {
          casesValues.push(parseInt(item.Deaths))
        });

        valoresMX = casesValues;
        countMXDays = casesValues.length;
      })

      await axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/country?name=italia')
      .then(response => {
        let casesArray = response.data.Items;

        let casesValues = [];

        var sortedArray = casesArray.sort(function (a, b) {
          return a["SortId"] - b["SortId"] ;
      });

      sortedArray.forEach(function (item) {
          casesValues.push(parseInt(item.Deaths))
        });

        valoresItaly = casesValues;        
      })  

      await axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/country?name=espana')
      .then(response => {
        let casesArray = response.data.Items;

        let casesValues = [];

        var sortedArray = casesArray.sort(function (a, b) {
          return a["SortId"] - b["SortId"] ;
      });

      sortedArray.forEach(function (item) {
          casesValues.push(parseInt(item.Deaths))
        });

        valoresEspa = casesValues;        
      }) 

      await axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/country?name=usa')
      .then(response => {
        let casesArray = response.data.Items;

        let casesValues = [];

        var sortedArray = casesArray.sort(function (a, b) {
          return a["SortId"] - b["SortId"] ;
      });

      sortedArray.forEach(function (item) {
          casesValues.push(parseInt(item.Deaths))
        });

        valoresUSA = casesValues;        
      }) 


    let finalData = {
      chart: {
          height: 600, //(9 / 16 * 100) + '%',
          type: 'line'
      },
      title: {
          text: 'Defunciones registradas por día trascurrido',
          style: {                         
              fontWeight: 'bold',
              fontSize: '22px'
          }
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
          color: "#ffa94e",
          dashStyle: 'ShortDot'
      },
      {
           name: 'España',
           data: valoresEspa,
           color: '#ff504e',
           dashStyle: 'ShortDot'
       },
       {
         name: 'Italia',
         data: valoresItaly,         
          color: "#4ea5ff",
          dashStyle: 'ShortDot'
       },
       {
        name: 'México',
        data: valoresMX,
        color: '#006700',
        lineWidth: 5
      }    
    ]
  };

  this.setState({chartOptions: finalData, isLoading: false });
  }
 
  render() {
    const { chartOptions, isLoading } = this.state;
    if (isLoading) return <ReactSpinner type="grow" color="primary" size="3" />;
 
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
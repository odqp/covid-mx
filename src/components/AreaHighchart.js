import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
import {dateFormater} from "../utils/utils"

class AreaHighchart extends Component {

    static formatTooltip(tooltip, x = this.x, points = this.points) {
        var toolText = x;
        var rows = []
        points.forEach((point) =>
            //toolText += '<br/><span style="color:' + point.series.color + '">\u25CF</span>' + point.series.name + ' :<b>' + point.y + '</b>'
            rows.push('<br/><span style="color:' + point.series.color + '">\u25CF</span>' + point.series.name + ' :<b>' + point.y + '</b>')
        );
        toolText+= rows[1];
        toolText+= rows[0];
        toolText+= rows[2];

        return toolText;
    }

  constructor(props) {
    super(props);
 
    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {},
      hoverData: null
    };
  }
 
  componentDidMount()
  {
    axios.get('https://corona.lmao.ninja/v2/historical/mx')
    .then(response => {
      let cases = response.data.timeline.cases;
      let recovered = response.data.timeline.recovered;
      let deaths = response.data.timeline.deaths;
      let labels = [];
      let recoveredValues = []
      let casesValues = []
      let deathsValues = []
      let activesValues = []

      for (var key in cases) {
          if(cases[key] > 0)
          {
            labels.push(dateFormater(key))
            casesValues.push(cases[key])
            recoveredValues.push(recovered[key])
            deathsValues.push(deaths[key])
            activesValues.push(cases[key] - recovered[key] - deaths[key])
          }
      }
    
      let finalData = {
        chart: {
            height: 600, //(9 / 16 * 100) + '%',
            type: 'area'
        },
        title: {
            text: 'Casos activos, recuperados y muertes en México'
        },        
        xAxis: {
            categories: labels,
            tickmarkPlacement: 'off',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                enabled: false
            }
        },
        tooltip: {
            split: true,            
            formatter: AreaHighchart.formatTooltip,
            crosshairs: true
            //shared: true
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666',
                    symbol: 'circle',
                    radius: 2
                }                
            },
            series: {
                events: {
                    legendItemClick: function() {
                      return false;
                    }
                }
            }
        },
        series: [{
            name: 'Recuperados',
            data: recoveredValues,
            color: '#82feb7'     ,
            dataLabels: {
                enabled: true,
                format: "{total}"
           },                   
        }, {
            name: 'Activos',
            data: activesValues,
            color: '#feb782'
        }, {
            name: 'Muertes',
            data: deathsValues,
            color: '#262524'
        }]
    };

      this.setState({chartOptions: finalData, isLoaded: true });
    })

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

export default AreaHighchart;
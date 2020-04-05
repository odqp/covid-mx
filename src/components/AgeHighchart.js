import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
 
class AgeHighchart extends Component {
   

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
    
    axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/edades')
    .then(response => {       
        let finaldata = response.data.Items;

         let ageLabels = [];
         let maleCases = [];
         let femaleCases = [];
         let maleCasesNegaives = [];
        
         var sortedArray = finaldata.sort(function(a, b) {
             return b["Id"] - a["Id"];
           });

         sortedArray.forEach(function(item){
             ageLabels.push(item["Edad"]);
             maleCases.push(parseInt(item["M"]));
             femaleCases.push(parseInt(item["F"])); 
             maleCasesNegaives.push(parseInt(item["M"]) * -1);           
         });


    var categories = ageLabels;
    
      let finalData = {
        chart: {
            height: 500,
            type: 'bar'
        },
        title: {
            text: 'Cosos detectados por Edad y Sexo'
        },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value);
                }
            }
        },
    
        plotOptions: {
            series: {
                stacking: 'normal'
            },
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return Math.abs(this.point.y);
                    }
                }                
            }
        },
    
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ', edad ' + this.point.category + '</b><br/>' +
                    'Casos confirmados: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);                    
            }
        },
    
        series: [{
            name: 'Masculino',
            data: maleCasesNegaives,
            color: "#0860b6"
        }, {
            name: 'Femenino',
            data: femaleCases,
            color: "#5d08b6"
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

export default AgeHighchart;
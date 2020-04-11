import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
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
      isLoading: true,
      mexicoData: props.mexicoData,
      italyData: props.italyData,
      spainData: props.spainData,
      usaData: props.usaData
    };
  }
 
  async componentDidMount()
  {
    var valoresMX = [];
    var valoresEspa = [];
    var valoresItaly = [];
    var valoresUSA = [];
    var countMXDays = this.state.mexicoData.length;
    
    this.state.mexicoData.forEach(function (item) {
      valoresMX.push(parseInt(item.Deaths))
    });    

    this.state.spainData.forEach(function (item) {
      valoresEspa.push(parseInt(item.Deaths))
    });

    this.state.italyData.forEach(function (item) {
      valoresItaly.push(parseInt(item.Deaths))
    });

    this.state.usaData.forEach(function (item) {
      valoresUSA.push(parseInt(item.Deaths))
    });

    let finalData = {
      chart: {
          height: 600, //(9 / 16 * 100) + '%',
          type: 'line'
      },
      title: {
          text: 'Defunciones registradas por día trascurrido en comparación a otros países',
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
          dashStyle: 'ShortDot',
          visible: false
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
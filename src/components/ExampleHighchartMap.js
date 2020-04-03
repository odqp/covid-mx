import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
 
const mapOptions = {
    chart: {
      map: 'countries/ie/ie-all'
    },
    title: {
      text: 'Map Demo'
    },
    credits: {
        enabled: false
    },
    mapNavigation: {
      enabled: true
    },
tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.freq}</b><br><b>{point.keyword}</b>                      <br>lat: {point.lat}, lon: {point.lon}'
    },
    series: [{
      // Use the gb-all map with no data as a basemap
      name: 'Basemap',
      mapData: mapDataIE,
      borderColor: '#A0A0A0',
      nullColor: 'rgba(200, 200, 200, 0.3)',
      showInLegend: false
    }, {
      // Specify points using lat/lon
      type: 'mapbubble',
      name: 'Cities',
      color: '#4169E1',
      data: [{ z: 10, keyword: "Galway", lat: 53.27, lon: -9.25 }, 
             { z: 4, keyword: "Dublin", lat: 53.27, lon: -6.25 }],
      cursor: 'pointer',
      point: {
        events: {
          click: function() {
            console.log(this.keyword);
          }
        }
      }
    }]
  }

class ExampleHighchartMap extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: mapOptions,
      hoverData: null
    };
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

export default ExampleHighchartMap;
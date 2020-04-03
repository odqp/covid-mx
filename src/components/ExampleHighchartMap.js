import React, { Component } from "react";
import { findDOMNode, render } from "react-dom";
import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import drilldown from "highcharts/modules/drilldown";
import map from "highcharts/modules/map";
import mxGeoData from "./mxGeoData";

class ExampleHighchartMap extends Component {
  componentDidMount() {
    // load modules
    //drilldown(Highcharts);

    let data = [
      ["mx-3622", 0],
      ["mx-bc", 1],
      ["mx-bs", 2],
      ["mx-so", 3],
      ["mx-cl", 4],
      ["mx-na", 5],
      ["mx-cm", 6],
      ["mx-qr", 7],
      ["mx-mx", 8],
      ["mx-mo", 9],
      ["mx-df", 10],
      ["mx-qt", 11],
      ["mx-tb", 12],
      ["mx-cs", 13],
      ["mx-nl", 14],
      ["mx-si", 15],
      ["mx-ch", 16],
      ["mx-ve", 17],
      ["mx-za", 18],
      ["mx-ag", 19],
      ["mx-ja", 20],
      ["mx-mi", 21],
      ["mx-oa", 22],
      ["mx-pu", 23],
      ["mx-gr", 24],
      ["mx-tl", 25],
      ["mx-tm", 26],
      ["mx-co", 27],
      ["mx-yu", 28],
      ["mx-dg", 29],
      ["mx-gj", 30],
      ["mx-sl", 31],
      ["mx-hg", 32]
    ];

    const options = {
      chart: {
        map: "countries/mx/mx-all"
      },
      title: {
        text: "HighMap Test"
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              color: "#EEDD66"
            }
          }
        }
      },
      colorAxis: {
        min: 0,
        minColor: "#E6E7E8",
        maxColor: "#005645"
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },

      subtitle: {
        text: "EL TUBTITULO",
        floating: true,
        align: "right",
        y: 50,
        style: {
          fontSize: "16px"
        }
      },
      series: [
        {
          mapData: mxGeoData,
          data: data,          
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          }
        }
      ],
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      }
    };

    this.chart = new HighMaps["Map"](findDOMNode(this), options);
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div className="in-highchart" />;
  }
}

export default ExampleHighchartMap;

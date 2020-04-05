import React, { Component } from "react";
import { findDOMNode, render } from "react-dom";
import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import drilldown from "highcharts/modules/drilldown";
import map from "highcharts/modules/map";
import mxGeoData from "./mxGeoData";
import axios from 'axios';

const dataConfig = [
    ['mx-ag', 1, "Aguascalientes"],
    ['mx-bc', 2, "Baja California"],
    ['mx-bs', 3, "Baja California Sur"],
    ['mx-cm', 4, "Campeche"],
    ['mx-co', 5, "Coahuila"],
    ['mx-cl', 6, "Colima"],
    ['mx-cs', 7, "Chiapas"],
    ['mx-ch', 8, "Chihuahua"],
    ['mx-mx', 9, "Estado de México"],
    ['mx-dg', 10, "Durango"],
    ['mx-gj', 11, "Guanajuato"],
    ['mx-gr', 12, "Guerrero"],
    ['mx-hg', 13, "Hidalgo"],
    ['mx-ja', 14, "Jalisco"],
    ['mx-df', 15, "Ciudad de México"],
    ['mx-mi', 16, "Michoacán"],
    ['mx-mo', 17, "Morelos"],
    ['mx-na', 18, "Nayarit"],
    ['mx-nl', 19, "Nuevo León"],
    ['mx-oa', 20, "Oaxaca"],
    ['mx-pu', 21, "Puebla"],
    ['mx-qt', 22, "Queretaro"],
    ['mx-qr', 23, "Quintana Roo"],
    ['mx-sl', 24, "San Luis Potosí"],
    ['mx-si', 25, "Sinaloa"],
    ['mx-so', 26, "Sonora"],
    ['mx-tb', 27, "Tabasco"],
    ['mx-tm', 28,"Tamaulipas"],
    ['mx-tl', 29, "Tlaxcala"],
    ['mx-ve', 30, "Veracruz"],
    ['mx-yu', 31, "Yucatán"],
    ['mx-za', 32, "Zacatecas"]
];

class MapHighchart extends Component {
    
    static formatTooltip(tooltip, data = this) {
        return '<b>' + data.options.name + '<br/>' +            
            'Casos: ' + data.value +
            '<br/> Negativos: ' + data.negativos +
            '<br/> Sospechosos: ' + data.sospechosos +
            '<br/> Defunciones: ' + data.defunciones;            
      }     

  componentDidMount() {
    // load modules
    //drilldown(Highcharts);
    //let data;
    axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/estates')
    .then(response => {
       console.log(response);
       let finaldata = response.data.Items[0].Data;
       finaldata = finaldata.replace("[[","");
       finaldata = finaldata.replace("]]","");
       console.log("final Data 1");
       console.log(finaldata);

       let dataArray = finaldata.split("],[");
       console.log(dataArray);
    //   console.log(response.data.Items[0].Data);
    //   data = response.data.Items[0].Data;
    //let data = dataArray;

    const arrayProcessed = [];

    var counter = 0;
    dataArray.forEach(function(item){
        let estado =item.replace(/\"/g,"").split(",");
                
        arrayProcessed.push([parseInt(estado[0]), dataConfig[counter][2], parseInt(estado[4]), parseInt(estado[5]), parseInt(estado[6]), parseInt(estado[7]), dataConfig[counter][0]] );
        counter++;
    });

    let data = arrayProcessed;

    const options = {
      chart: {
        height: 500, //(9 / 16 * 100) + '%',
        map: "countries/mx/mx-all"
      },
      title: {
        text: "Casos detectados por estado"
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              //color: "#EEDD66"
            }
          }
        }
      },
      legend: {
        title: {
            text: 'Individuals per km²'
        },
        align: 'left',
        verticalAlign: 'bottom',
        floating: true,
        layout: 'vertical',
        valueDecimals: 0,        
        symbolRadius: 0,
        symbolHeight: 14
      },
      colorAxis: {        
        dataClassColor: 'category',
        dataClasses: [{
            to: 50,
            color: "#fffde8"
        }, {
            from: 50,
            to: 100,
            color: "#fef582"
        }, {
            from: 100,
            to: 501,
            color: "#feb782"        
        }, {
            from: 500,
            to: 1000,
            color: "#B7371A"
        }]
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },      
      subtitle: {
        enabled: false,
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
          joinBy: ['hc-key', 'code'],
          keys: ['id','name', 'value', 'negativos', 'sospechosos', 'defunciones', 'code'],
          dataLabels: {
            enabled: false,
            format: "{point.name}"
          },
          tooltip: {
            headerFormat: '',
            pointFormatter: MapHighchart.formatTooltip
        }
        }
      ],
      mapNavigation: {
        enabled: false,
        buttonOptions: {
          verticalAlign: "bottom"
        }
      }
    };

    this.chart = new HighMaps["Map"](findDOMNode(this), options);
})
  } 

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div className="in-highchart" />;
  }
}

export default MapHighchart;

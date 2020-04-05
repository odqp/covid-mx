import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner';

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
    ['mx-tm', 28, "Tamaulipas"],
    ['mx-tl', 29, "Tlaxcala"],
    ['mx-ve', 30, "Veracruz"],
    ['mx-yu', 31, "Yucatán"],
    ['mx-za', 32, "Zacatecas"]
];

class StateDetailHighchart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // To avoid unnecessary update keep all options in the state.
            chartOptions: {},
            hoverData: null,
            isLoading: true
        };
    }

    async componentDidMount() {
        var finaldata = {};
        await axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/estates')
            .then(response => {
                let temdata = response.data.Items[0].Data;
                temdata = temdata.replace("[[", "");
                temdata = temdata.replace("]]", "");

                let dataArray = temdata.split("],[");



                let statesLabels = [];
                let cases = [];
                let deaths = [];
                var counter = 0;


                var arrayOfArray = [];
                dataArray.forEach(function (item) {
                    let estado = item.replace(/\"/g, "").split(",");
                    arrayOfArray.push([parseInt(estado[0]), dataConfig[counter][2], parseInt(estado[4]), parseInt(estado[5]), parseInt(estado[6]), parseInt(estado[7]), dataConfig[counter][0]]);
                    counter++;
                });

                var sortedArray = arrayOfArray.sort(function (a, b) {
                    return b[2] - a[2];
                });

                sortedArray.forEach(function (item) {
                    statesLabels.push(item[1]);
                    cases.push(parseInt(item[2]));
                    deaths.push(parseInt(item[5]));
                });

                finaldata = {
                    chart: {
                        height: 700,
                        type: 'bar'
                    },
                    title: {
                        text: 'Casos y defunciones registradas por estado',
                        style: {                         
                            fontWeight: 'bold',
                            fontSize: '22px'
                        }
                    },
                    xAxis: {
                        categories: statesLabels,
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,                        
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' millions'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor:
                            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [
                        {
                            id: 'mainSeries',
                            name: 'Casos',
                            data: cases,
                            color: "#feb782"
                        }, {
                            name: 'Perdidas',
                            data: deaths,
                            color: "#262524"
                        }
                    ]
                };                
            })

            this.setState({ chartOptions: finaldata, isLoading: false });

    }

    render() {
        const { isLoading , chartOptions} = this.state;
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

export default StateDetailHighchart;
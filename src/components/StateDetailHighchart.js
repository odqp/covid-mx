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
    ['mx-df', 9, "Ciudad de México"],
    ['mx-dg', 10, "Durango"],
    ['mx-gj', 11, "Guanajuato"],
    ['mx-gr', 12, "Guerrero"],
    ['mx-hg', 13, "Hidalgo"],
    ['mx-ja', 14, "Jalisco"],
    ['mx-mx', 15, "Estado de México"],
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
            isLoading: true,
            statesData: props.statesData
        };
    }

    async componentDidMount() {
        var finaldata = {};
        let sortedArray = this.state.statesData;
        let statesLabels = []
        let cases = []        

        sortedArray.forEach(function (item) {
            statesLabels.push(item[1]);
            cases.push(parseInt(item[2]));            
        });

        finaldata = {
            chart: {
                height: 700,
                type: 'bar'
            },
            title: {
                text: 'Casos registradas por estado',
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
                },
                title: null
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
                verticalAlign: 'bottom',
                x: -10,
                y: -60,
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
                }
            ]
        };

        this.setState({ chartOptions: finaldata, isLoading: false });
    }

    render() {
        const { isLoading, chartOptions } = this.state;
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
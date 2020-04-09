import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner';

class AgeHighchart extends Component {


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
        let finalData = {}
        await axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/edades')
            .then(response => {
                let tempdata = response.data.Items;

                let ageLabels = [];
                let maleCases = [];
                let femaleCases = [];
                let maleCasesNegaives = [];

                var sortedArray = tempdata.sort(function (a, b) {
                    return b["Id"] - a["Id"];
                });

                sortedArray.forEach(function (item) {
                    ageLabels.push(item["Edad"]);
                    maleCases.push(parseInt(item["M"]));
                    femaleCases.push(parseInt(item["F"]));
                    maleCasesNegaives.push(parseInt(item["M"]) * -1);
                });


                var categories = ageLabels;

                finalData = {
                    chart: {                        
                        type: 'bar'
                    },
                    title: {
                        text: 'Casos detectados por edad y sexo',
                        style: {                         
                            fontWeight: 'bold',
                            fontSize: '22px'
                        }
                    },
                    xAxis: [{
                        categories: categories,
                        reversed: false,
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
                                enabled: false,
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
            })

            this.setState({ chartOptions: finalData, isLoading: false });
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

export default AgeHighchart;
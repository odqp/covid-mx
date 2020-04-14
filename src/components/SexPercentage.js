
import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import ReactSpinner from 'react-bootstrap-spinner';

class AgePercentage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // To avoid unnecessary update keep all options in the state.
            chartOptions: {},
            hoverData: null,
            isLoading: true,
            ageData: props.ageData
        };
    }

    async componentDidMount() {
        let finalData = {}        
        let maleCases = 0;
        let femaleCases = 0;
        let totalCases = 0;
        

        let sortedArray = this.state.ageData

        sortedArray.forEach(function (item) {            
            maleCases += (parseInt(item["M"]));
            femaleCases += (parseInt(item["F"]));
        });

        totalCases = maleCases + femaleCases;
        maleCases = (maleCases / totalCases) * 100
        femaleCases = (femaleCases / totalCases) * 100


        finalData = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Porcentaje de casos femenino/masculino',
                style: {                         
                    fontWeight: 'bold',
                    fontSize: '22px'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },            
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Infectados',
                colorByPoint: true,
                point: {
                    events: {
                        legendItemClick: function () {
                            return false; // <== returning false will cancel the default action
                        }
                    }
                },           
                data: [{
                    name: 'Masculino',
                    y: maleCases,
                    color: "#0860b6",
                    sliced: true,
                    selected: true
                }, {
                    name: 'Femenino',
                    y: femaleCases,
                    color: "#5d08b6"
                }]
            }]
        };


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

export default AgePercentage;
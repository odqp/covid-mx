import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import ReactSpinner from 'react-bootstrap-spinner';

class DeathsByState extends Component {
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
        let casesArray = this.state.statesData;
        let statesLabels = []        
        let deaths = []

         let sortedArray = casesArray.sort(function (a, b) {
             return b[5] - a[5];
         });

        sortedArray.forEach(function (item) {
            statesLabels.push(item[1]);            
            deaths.push(parseInt(item[5]));
        });

        finaldata = {
            chart: {
                height: 700,
                type: 'bar'
            },
            title: {
                text: 'Defunciones registradas por estado',
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
                    name: 'Defunciones',
                    data: deaths,
                    color: "#262524"
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

export default DeathsByState;
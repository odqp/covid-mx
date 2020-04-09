import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import ReactSpinner from 'react-bootstrap-spinner';

class SexPercentage extends Component {

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
        let sortedArray = this.state.ageData

        let finalData = {}
        let totalCases = 0;

        let cases = [];
        sortedArray.forEach(function (item) {            
            totalCases += (parseInt(item["Total"]));
        });

          sortedArray.forEach(function (item) {            
              cases.push({name: item["Edad"], value: Math.round(((parseInt(item["Total"]) / totalCases) * 100 ))})
          });

        finalData = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Porcentaje de infectados por edad',
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
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Infectados',
                colorByPoint: true,                
                data: [{
                    name: cases[0].name,
                    y: cases[0].value
                }, {
                    name: cases[1].name,
                    y: cases[1].value
                }, 
                {
                    name: cases[2].name,
                    y: cases[2].value
                }, 
                {
                    name: cases[3].name,
                    y: cases[3].value
                }, 
                {
                    name: cases[4].name,
                    y: cases[4].value
                }, 
                {
                    name: cases[5].name,
                    y: cases[5].value
                }, 
                {
                    name: cases[6].name,
                    y: cases[6].value
                }, 
                {
                    name: cases[7].name,
                    y: cases[7].value
                }, 
                {
                    name: cases[8].name,
                    y: cases[8].value
                }, 
                {
                    name: cases[9].name,
                    y: cases[9].value
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

export default SexPercentage;
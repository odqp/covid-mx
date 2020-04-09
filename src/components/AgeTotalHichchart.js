import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import ReactSpinner from 'react-bootstrap-spinner';

class AgeTotalHichchart extends Component {


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

        let sortedArray = this.state.ageData

        let ageLabels = [];
        let totalCases = [];

        sortedArray.forEach(function (item) {
            ageLabels.push(item["Edad"]);
            totalCases.push(parseInt(item["Total"]));
        });

        finalData = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Casos detectados por edad',
                style: {
                    fontWeight: 'bold',
                    fontSize: '22px'
                }
            },
            xAxis: {
                categories: ageLabels
            },
            yAxis: {
                min: 0,
                title: {
                    enabled: false
                },                
                stackLabels: {
                    enabled: true                    
                }
            },
            tooltip: {
                pointFormat: '<b>{point.y}</b><br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Detectados',
                data: totalCases,
                color: "#feb782"
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

export default AgeTotalHichchart;
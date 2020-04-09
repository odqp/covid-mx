import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import ReactSpinner from 'react-bootstrap-spinner';
import { dateFormater } from "../utils/utils"

class DeathsByDay extends Component {


    constructor(props) {
        super(props);

        this.state = {
            // To avoid unnecessary update keep all options in the state.
            chartOptions: {},
            hoverData: null,
            isLoading: true,
            mexicoData: props.mexicoData
        };
    }

    async componentDidMount() {        
        let finalData = {}
        let datesLables = [];
        let casesValues = [];

        let sortedArray = this.state.mexicoData
        let currentValue = 0;
        sortedArray.forEach(function (item) {
            datesLables.push(dateFormater(item.Date));
            casesValues.push(parseInt(item.Deaths) - currentValue);
            currentValue = parseInt(item.Deaths);
        });

        finalData = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Defunciones registradas por día'
            },
            xAxis: {
                categories: datesLables,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {                    
                    enabled: false
                }
            },            
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Defunciones',
                data: casesValues,
                color: '#262524'
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

export default DeathsByDay;
import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import ReactSpinner from 'react-bootstrap-spinner';
import { dateFormater } from "../utils/utils"

class CasesByDay extends Component {


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
            casesValues.push(parseInt(item.Cases) - currentValue);
            currentValue = parseInt(item.Cases);
        });

        finalData = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Casos nuevos detectados por día',
                style: {
                    fontWeight: 'bold',
                    fontSize: '22px'
                }
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
                name: 'Casos detectados',
                data: casesValues,
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

export default CasesByDay;
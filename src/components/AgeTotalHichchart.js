import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner';
import HighchartsMore from 'highcharts/highcharts-more'

class AgeTotalHichchart extends Component {


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
        //HighchartsMore(Highcharts)
        let finalData = {}
        await axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/edades')
            .then(response => {
                let tempdata = response.data.Items;

                let ageLabels = [];
                let totalCases = [];                

                var sortedArray = tempdata.sort(function (a, b) {
                    return  a["Id"] - b["Id"];
                });

                sortedArray.forEach(function (item) {
                    ageLabels.push(item["Edad"]);
                    totalCases.push(parseInt(item["Total"]));                    
                });


                finalData = {
                    chart: {
                        type: 'column',
                        height: 500,
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
                            text: 'Total fruit consumption',
                            enabled: false
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

export default AgeTotalHichchart;
import React, { Component } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import axios from 'axios';
import { dateFormater } from "../utils/utils"
import ReactSpinner from 'react-bootstrap-spinner'

class AreaHighchart extends Component {

    static formatTooltip(tooltip, x = this.x, points = this.points) {
        var toolText = x;
        var rows = []
        points.forEach((point) =>
            //toolText += '<br/><span style="color:' + point.series.color + '">\u25CF</span>' + point.series.name + ' :<b>' + point.y + '</b>'
            rows.push('<br/><span style="color:' + point.series.color + '">\u25CF</span>' + point.series.name + ' :<b>' + point.y + '</b>')
        );
        toolText += rows[1];
        toolText += rows[0];
        toolText += rows[2];

        return toolText;
    }

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

        let lastCases = 0;
        let lastDeaths = 0;
        let lastRecovery = 0;
        let finalData = {};

        await axios.get('https://grei4yqd3c.execute-api.us-east-1.amazonaws.com/Prod/estates')
            .then(response => {
                let statedata = response.data.Items[0].Data;
                statedata = statedata.replace("[[", "");
                statedata = statedata.replace("]]", "");

                let dataArray = statedata.split("],[");

                const arrayProcessed = [];

                dataArray.forEach(function (item) {
                    let estado = item.replace(/\"/g, "").split(",");
                    arrayProcessed.push([parseInt(estado[0]), parseInt(estado[4]), parseInt(estado[7])]);
                });               
                               
                arrayProcessed.forEach(function (item) {                    
                    lastCases += item[1];
                    lastDeaths += item[2];
                });                
            })

        await axios.get('https://corona.lmao.ninja/v2/historical/mx')
            .then(response => {
                let cases = response.data.timeline.cases;
                let recovered = response.data.timeline.recovered;
                let deaths = response.data.timeline.deaths;
                let labels = [];
                let recoveredValues = []
                let casesValues = []
                let deathsValues = []
                let activesValues = []

                for (var key in cases) {
                    if (cases[key] > 0) {
                        labels.push(dateFormater(key))
                        casesValues.push(cases[key])
                        recoveredValues.push(recovered[key])
                        deathsValues.push(deaths[key])
                        activesValues.push(cases[key] - recovered[key] - deaths[key])
                    }
                }
                
                let lastIndex = casesValues.length;
                if(!(casesValues[lastIndex-1] == lastCases && deathsValues[lastIndex-1] == lastDeaths)){
                    casesValues.push(lastCases);
                    deathsValues.push(lastDeaths);
                    recoveredValues.push(recoveredValues[recoveredValues.length-1]);
                    activesValues.push(casesValues[lastIndex] - recoveredValues[lastIndex] - deathsValues[lastIndex]);                    
                    labels.unshift("");
                }
                
                finalData = {
                    chart: {
                        height: 500, //(9 / 16 * 100) + '%',
                        type: 'area'
                    },
                    title: {
                        text: 'Casos activos, recuperados y defunciones en México',
                        style: {                         
                            fontWeight: 'bold',
                            fontSize: '22px'
                        }
                    },
                    xAxis: {
                        categories: labels,
                        tickmarkPlacement: 'off',
                        title: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            enabled: false
                        }
                    },
                    tooltip: {
                        split: true,
                        formatter: AreaHighchart.formatTooltip,
                        crosshairs: true
                        //shared: true
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#666666',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#666666',
                                symbol: 'circle',
                                radius: 2
                            }
                        },
                        series: {
                            events: {
                                legendItemClick: function () {
                                    return false;
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Recuperados',
                        data: recoveredValues,
                        color: '#82feb7',
                        dataLabels: {
                            enabled: true,
                            format: "{total}"
                        },
                    }, {
                        name: 'Activos',
                        data: activesValues,
                        color: '#feb782'
                    }, {
                        name: 'Defunciones',
                        data: deathsValues,
                        color: '#262524'
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

export default AreaHighchart;
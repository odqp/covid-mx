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
            isLoading: true,
            mexicoData: props.mexicoData
        };
    }

    async componentDidMount() {
       let finalData = {};
        let labels = [];
        let recoveredValues = []
        let casesValues = []
        let deathsValues = []
        let activesValues = []

        let sortedArray = this.state.mexicoData

        sortedArray.forEach(function (item) {
            labels.push(dateFormater(item.Date))
            casesValues.push(parseInt(item.Cases))
            recoveredValues.push(parseInt(item.Recoveries))
            deathsValues.push(parseInt(item.Deaths))
            activesValues.push(parseInt(item.Cases) - parseInt(item.Recoveries) - parseInt(item.Deaths))
        });

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
                },
                showFirstLabel: true,
                showLastLabel: true,
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
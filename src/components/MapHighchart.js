import React, { Component } from "react";
import { findDOMNode, render } from "react-dom";
import Highcharts from "highcharts";
import HighMaps from "highcharts/modules/map";
import mxGeoData from "./mxGeoData";
import axios from 'axios';
import ReactSpinner from 'react-bootstrap-spinner'
import HighchartsReact from 'highcharts-react-official';
HighMaps(Highcharts);

class MapHighchart extends Component {

    static formatTooltip(tooltip, data = this) {
        return '<b>' + data.options.name + '<br/>' +
            'Casos: ' + data.value +
            '<br/> Negativos: ' + data.negativos +
            '<br/> Sospechosos: ' + data.sospechosos +
            '<br/> Defunciones: ' + data.defunciones;
    }


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            charOptions: {},
            statesData: props.statesData
        };
    }

    async componentDidMount() {
        var options = {}
        let data = this.state.statesData;

        options = {
            chart: {
                height: 700,//(9 / 16 * 100) + '%',
                map: "countries/mx/mx-all"
            },
            title: {
                text: "Casos detectados por estado",
                style: {
                    fontWeight: 'bold',
                    fontSize: '22px'
                }
            },
            plotOptions: {
                map: {
                    states: {
                        hover: {
                            //color: "#EEDD66"
                        }
                    }
                }
            },
            colorAxis: {
                dataClassColor: 'category',
                dataClasses: [{
                    to: 50,
                    color: "#fffde8"
                }, {
                    from: 50,
                    to: 100,
                    color: "#fef582"
                }, {
                    from: 100,
                    to: 500,
                    color: "#feb782"
                }, {
                    from: 500,
                    to: 1000,
                    color: "#B7371A"
                }]
            },
            legend: {
                align: 'left',
                floating: true,
                layout: 'vertical',
                verticalAlign: 'bottom',
                reversed: true,
                valueDecimals: 0,
            },
            subtitle: {
                enabled: false,
                floating: true,
                align: "right",
                y: 50,
                style: {
                    fontSize: "16px"
                }
            },
            series: [
                {
                    mapData: mxGeoData,
                    data: data,
                    joinBy: ['hc-key', 'code'],
                    keys: ['id', 'name', 'value', 'negativos', 'sospechosos', 'defunciones', 'code'],
                    dataLabels: {
                        enabled: false,
                        format: "{point.name}"
                    },
                    tooltip: {
                        headerFormat: '',
                        pointFormatter: MapHighchart.formatTooltip
                    }
                }
            ],
            mapNavigation: {
                enabled: false,
                buttonOptions: {
                    verticalAlign: "bottom"
                }
            }
        };
        this.setState({ isLoading: false, charOptions: options });

    }

    componentWillUnmount() {
        this.chart.destroy();
    }


    render() {
        const { isLoading, charOptions } = this.state;
        if (isLoading) return <ReactSpinner type="grow" color="primary" size="3" />;

        return (
            <div>
                <HighchartsReact
                    constructorType={'mapChart'}
                    highcharts={Highcharts}
                    options={charOptions}
                />
            </div>

        )
    }
}

export default MapHighchart;

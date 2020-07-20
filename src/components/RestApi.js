import React from "react";
import axios from 'axios';
import * as PieChartsData from "./PieChartsData";
import * as BarGraphData from "./BarGraphData"
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
import HighchartsReact from 'highcharts-react-official';

export class RestApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            graphType: 'Bar Graph',
            resultSet: [],
            successMessage: "",
            errorMessage: "",
            exclududedKeys:""
        }
    }

    fetchData() {
        axios.get(this.state.url).then(
            result => {
                this.setState({ resultSet: result.data, successMessage: "Data fetched successfully", errorMessage:""});
            },
            error => {
                this.setState({successMessage: "", errorMessage:"Couldnt fetch data. Please try again later" });
            }
        )
    }
    fetchDataForBarGraphs() {
        let excludedKeys = this.state.exclududedKeys.split(",");
        let barGraphData = [];
        for (let index in this.state.resultSet) {
            let data = this.state.resultSet[index];
            if (excludedKeys.length === 0)
                break;
            for (let key in excludedKeys) {
                delete data[excludedKeys[key]];
            }
        }
        for (let key in this.state.resultSet[0]) {
            let data = {};
            let resultData = [];
            for (let data1 in this.state.resultSet) {
                let object = this.state.resultSet[data1];
       
                if (typeof object[key] === "object")
                    break;
                if (data.hasOwnProperty(object[key])) {
                    data[object[key]] += 1;
                }
                else
                    data[object[key]] = 1;
            }
            for (let key1 in data) {
                resultData.push({ name: key1, y : data[key1] });
            }
            
            if (resultData.length !== 0) {
                barGraphData.push({ name: key, data: resultData});
            }
        }
        return barGraphData.map(element => {
            let data1 = JSON.parse(BarGraphData.BarGraphData);
            data1.title.text = element.name[0].toUpperCase() + element.name.slice(1) + " Shares";
            data1.xAxis.type = element.name;
            data1.series[0].name = element.name;
            data1.series[0].data = element.data;
            return data1;
        });
    }
    fetchDataForPieCharts() {
        let excludedKeys = this.state.exclududedKeys.split(",");
        let pieChartsData = [];
        for (let index in this.state.resultSet) {
            let data = this.state.resultSet[index];
            if (excludedKeys.length === 0)
                break;
            for (let key in excludedKeys) {
                delete data[excludedKeys[key]];
            }
        }
        for (let key in this.state.resultSet[0]) {
            let data = {};
            let resultData = [];
            for (let data1 in this.state.resultSet) {
                let object = this.state.resultSet[data1];
              
                if (typeof object[key] === "object")
                    break;
                if (data.hasOwnProperty(object[key])) {
                    data[object[key]] += 1;
                }
                else
                    data[object[key]] = 1;
            }
            for (let key1 in data) {
                resultData.push({ name: key1 , y: data[key1] });
            }
            if (resultData.length !== 0) {
                pieChartsData.push({ name: key, data: resultData });
            }
        }
        return pieChartsData.map(element => {
            let data1 = JSON.parse(PieChartsData.PieChartsData);
            data1.title.text = element.name[0].toUpperCase() + element.name.slice(1) + " Shares";
            data1.series[0].data = element.data;
            data1.series[0].name = element.name[0].toUpperCase() + element.name.slice(1);
            return data1;
        });
    }
    fetchDataForVisulaization() {
        if (this.state.graphType === "Bar Graph") {
            return this.fetchDataForBarGraphs().map(element => <HighchartsReact highcharts={Highcharts} options={element} />)
        }
        else if (this.state.graphType === "Pie Chart") {
            return this.fetchDataForPieCharts().map(element => <PieChart highcharts={Highcharts} options={element} />)
        }
    }
    render() {
        return (
            <div style={{margin:"2%"}}>
                    <div class="form-group">
                        <label>RestAPI for data</label>
                        <input type="text" class="form-control" onChange={(event) => { this.setState({ url : event.target.value }) }}
                            placeholder="RestAPI must be of type GET" />
                     
                    </div>
                    
                    <div>
                    <label>Type of Graph</label>
                        <select class="form-control" onChange={(event) => { this.setState({ graphType : event.target.value }) }} >
                            <option>Bar Graph</option>
                            <option>Pie Chart</option>
                        </select>
                </div>
                <div class="form-group">
                    <label>Excluded Keys</label>
                    <input type="text" class="form-control" onChange={(event) => { this.setState({ exclududedKeys : event.target.value }) }}
                        placeholder="Add multiple values to be removed with a ',' seperator" />
                </div>
                <label style={{ color: "green" }}>{" " + this.state.successMessage}</label>
                <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                <br />
                <button class="btn btn-default" onClick={() => {
                    this.fetchData();
                }}>Fetch data</button>
                <br />
                <br />

                {
                    this.fetchDataForVisulaization()
                }
                
            </div>
        );
    }
}
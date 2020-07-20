import React from "react";



export class DataBaseConnectors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbType: "Cassandra",
            successMessage: "",
            errorMessage: "",
            columnNames: "",
            tableName: "",
            graphType: "Bar Graph"
        }
        this.options = [
            { type: "Cassandra" },
            { type: "Couchbase" },
            { type: "CouchDB" },
            { type: "LevelDB" },
            { type: "MySQL" },
            { type: "MongoDB" },
            { type: "Oracle" },
            { type: "PostgreSQL" },
            { type: "SQL Server" },
            { type: "SQLite" },
            { type: "Elasticsearch" }
        ]
    }
    render() {
        return (
            <div style={{ margin: "2%" }}>
                <div>
                    <label>DB Type</label>
                    <select class="form-control" onChange={(event) => { this.setState({ dbType: event.target.value }) }} >
                        {this.options.map(element => <option>{element.type}</option>)}
                    </select>
                </div>
                <div class="form-group">
                    <label>Table Name</label>
                    <input type="text" class="form-control" onChange={(event) => { this.setState({ tableName: event.target.value }) }}
                            placeholder="Table Name" />
                </div>
                <div class="form-group">
                    <label>Column Names</label>
                    <input type="text" class="form-control" onChange={(event) => { this.setState({ columnNames: event.target.value }) }}
                        placeholder="Name of the columns for analysis (Add multiple columns with ',' seperator)" />
                </div>
                <div>
                    <label>Type of Graph</label>
                    <select class="form-control" onChange={(event) => { this.setState({ graphType: event.target.value }) }} >
                        <option>Bar Graph</option>
                        <option>Pie Chart</option>
                    </select>
                </div>
                <label style={{ color: "green" }}>{" " + this.state.successMessage}</label>
                <label style={{ color: "red" }}>{this.state.errorMessage}</label>
                <br/>

                <button class="btn btn-default" onClick={() => {
                    let arr = this.state.columnNames.split(",");
                    arr.forEach(elem => {
                        console.log("select "+elem+",count(" + elem + ") from " + this.state.tableName + " group by " + elem);
                    })

                }}>Create graphs</button>
                <br/>
            </div>
            )
    }

}
import React from 'react';
import '../css/photon.css';
import '../css/photon.min.css';

import { RestApi } from "./RestApi";
import { RestApiWithAuth } from "./RestApiWithAuth";
import { KafkaSubscriber } from "./KafkaSubscriber";
import { DataBaseConnectors } from "./DataBaseConnectors";
import { FileReader } from "./FileReader";
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "tab1"
        };
    }
    getStyle(type) {
        if (type === this.state.activeTab)
            return "nav-group-item active";
        return "nav-group-item";
    }
    getComponent() {
        if (this.state.activeTab === "tab1") {
            return <RestApi/>
        }
        else if (this.state.activeTab === "tab2") {
            return <RestApiWithAuth/>
        }
        else if (this.state.activeTab === "tab3"){
            return <KafkaSubscriber/>
        }
        else if (this.state.activeTab === "tab4") {
            return <DataBaseConnectors />
        }
        else if (this.state.activeTab === "tab5") {
            return <FileReader />
        }
    }
    render() {
        return (
            <div class="window">
                <div class="window-content">
                    <div class="pane-group">
                        <div class="pane pane-sm sidebar">
                            <nav class="nav-group">
                                <span class={this.getStyle("tab1")} onClick={() => { this.setState({ activeTab:"tab1" }) }}>
                                    <span class="icon icon-flow-line"></span>
                                    Rest Api
                                </span>
                                <span class={this.getStyle("tab2")} onClick={() => { this.setState({ activeTab: "tab2" }) }}>
                                    <span class="icon icon-flow-cascade"></span>
                                    Rest Api with Authentication
                                </span>
                                <span class={this.getStyle("tab3")} onClick={() => { this.setState({ activeTab: "tab3" }) }}>
                                    <span class="icon icon-flow-parallel"></span>
                                    Kafka Subscriber
                                </span>
                                <span class={this.getStyle("tab4")} onClick={() => { this.setState({ activeTab: "tab4" }) }}>
                                    <span class="icon icon-database"></span>
                                    DataBase Reader
                                </span>
                                <span class={this.getStyle("tab5")} onClick={() => { this.setState({ activeTab: "tab5" }) }}>
                                    <span class="icon icon-book"></span>
                                    File Reader
                                </span>
                                
                            </nav>
                        </div>
                        <div class="pane">
                            {this.getComponent()}
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}
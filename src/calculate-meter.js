import React from "react"

import "./calculate-meter.css"

class MainMeter extends React.Component {
    constructor() {
        super()
        this.state = {
            meters: [],
            addedmeters: {},
            selectedMeter: "",
            toAddMeters: {},
            reading: 0,
            showmeters: false
        }
    }
    componentDidMount() {
        const data = [{name: 'Sub-Meter 1', value: 215.5},
                        {name: 'Sub-Meter 2', value: 192},
                        {name: 'Sub-Meter 3', value: 248.7},
                        {name: 'Sub-Meter 4', value: 215.5},
                        {name: 'Sub-Meter 5', value: 192},
                        {name: 'Sub-Meter 6', value: 248.7},
                        {name: 'Sub-Meter 7', value: 215.5},
                        {name: 'Sub-Meter 8', value: 192},
                        {name: 'Sub-Meter 9', value: 248.7}]
        var m = {}
        for (let i=0; i<data.length; i++) {
            m[data[i].name] = data[i].value
        }
        this.setState({meters: data, toAddMeters: m})
    }
    selectMeter = val => {
        this.setState({selectedMeter: val})
    }
    addMeter = () => {
        if (this.state.selectedMeter === "") {
            return
        }
        var a = this.state.addedmeters
        var t = this.state.toAddMeters
        const val = this.state.selectedMeter
        var r = this.state.reading
        if (val in a) {
            return
        } else {
            a[val] = this.state.toAddMeters[val]
            r += a[val]
            delete t[val]
            this.setState({addedmeters: a, toAddMeters: t, showmeters: false, selectedMeter: "", reading: r})
            document.getElementById("selectMeter").selectedIndex = 0
        }
    }
    showMeters = () => {
        this.setState({showmeters: true})
    }
    render() {
        return(
            <div className="calculate-meter-container">
                <div className="main-meter-label">
                    <b>Main Meter</b>
                </div>
                <div style={{display: "inline-block", padding: "5px"}}>
                    <div className="submeters">
                        <div style={{display: Object.keys(this.state.addedmeters).length > 0 ? "block" : "none"}}>
                            {Object.keys(this.state.addedmeters).map((key, i) => {
                                return(
                                    <div key={i} style={{padding: "2px 5px"}}>{key}</div>
                                )
                            })}
                        </div>
                        <div style={{textAlign: "left"}}>
                            <span>
                                {Object.keys(this.state.toAddMeters).length > 0 && !this.state.showmeters ?
                                <button onClick={e => this.showMeters()} className="add-meter">+</button>
                                : <span></span>}
                            </span>
                            <span style={{display: this.state.showmeters ? "block" : "none"}}>
                                <select onChange={e => this.selectMeter(e.target.value)} defaultValue="" id="selectMeter">
                                    <option value="" disabled={true}>--Select--</option>
                                    {Object.keys(this.state.toAddMeters).map((key, i) => {
                                        return(
                                            <option value={key}>{key}</option>
                                        )
                                    })}
                                </select>
                                <span>
                                    <button className="add-btn" onClick={e => this.addMeter()} disabled={this.state.selectedMeter === "" ? true : false}>Add</button>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: "15px"}}>
                    <div className="reading-label"><b>Reading</b></div>
                    {Object.keys(this.state.addedmeters).length > 0 ?
                        <div style={{display: "inline-block", width: "210px"}}>
                            <div style={{backgroundColor: "white", padding: "2px 3px"}}>
                                {Object.keys(this.state.addedmeters).map((key, i) => {
                                    return(
                                        <span><span>{i > 0 ? " + " : " "}</span>{this.state.addedmeters[key]}</span>
                                    )
                                })}
                            </div>
                            <div style={{display: "inline-block", marginTop: "10px"}}>
                                <span className="final-reading">{this.state.reading.toFixed(1)}</span>
                            </div>
                        </div>
                        : <span style={{padding: "0px 5px", fontSize: "12px", color: "#BBBBBB"}}>Select meters</span>
                    }
                </div>
            </div>
        )
    }
}

export default MainMeter
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Accelerometer from '../position/accelerometer';
import MovementPlot from '../components/movement_graph';
import StopScan from './stop_scan'

const Button = styled.button`
padding: 15px;
color: #ad77e0;
display: ${props => props.visibility? 'inline': 'none'}
`;

class BeginScan extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hidden: false
        };

        this.toggleStopButton = this.toggleStopButton.bind(this);
    }

    toggleStopButton = () =>{
        this.setState(state => ({
            hidden: !state.hidden
        }));
    }


    render(){
        return(
            <>
                <Button className="btn" onClick={() => {this.toggleStopButton()}} visibility = {!this.state.hidden}>
                Begin Scan
                </Button>
                {(this.state.hidden)? <Accelerometer/> : <></>}
                < StopScan hidden = {this.state.hidden} toggleStopButton = {this.toggleStopButton}/>
                
            </>
        );
    }
}


export default BeginScan
import React from "react";
import styled from "styled-components";
import Accelerometer from '../position/accelerometer';
import MovementPlot from '../components/movement_graph';
import BeginScan from "./begin_scan";
import { stopScan, sendDatestoNwScan } from '../position/endpoints';
import { getTimeLocations } from '../position/posCalculation'

const Button = styled.button`
padding: 15px;
color: #ad77e0;
display: ${props => props.visibility? 'inline': 'none'}
`;

class StopScan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            finished: false
        };
        this.showMovementPlot = this.showMovementPlot.bind(this);
    }

    showMovementPlot = () => {
        this.setState(state => ({
            finished: !state.finished
        }));
    }

    handleClick = () => {
        this.props.toggleStopButton();
        this.showMovementPlot();
        sendDatestoNwScan();
        stopScan();
    };

    render(){
        return(
            <>
                {/* Mandar data de scan y mandar instruccion para extraer la primera fecha de signal scan, luego llamar al create nw scan*/}
                <Button className="btn" hidden = {this.props.hidden} onClick= {() => {this.handleClick()}} visibility = {this.props.hidden}>
                Stop Scan
                </Button>
                {/* TODO: hacer que se muestre solo despues de haber apretado stop */}
                
                {(this.state.finished)? <MovementPlot/> : <></>}
            </>
        );
    }

}

export default StopScan
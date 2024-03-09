import React from "react";
import styled from "styled-components";
import Accelerometer from '../position/accelerometer';
import MovementPlot from '../components/movement_graph';
import BeginScan from "./begin_scan";

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

    render(){
        return(
            <>
                <Button className="btn" hidden = {this.props.hidden} onClick= {() => {this.props.toggleStopButton(); this.showMovementPlot();}} visibility = {this.props.hidden}>
                Stop Scan
                </Button>
                {/* TODO: hacer que se muestre solo despues de haber apretado stop */}
                {(this.state.finished)? <MovementPlot/> : <></>}
            </>
        );
    }

}

export default StopScan
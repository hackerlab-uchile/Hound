import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Accelerometer from '../position/accelerometer';

const BeginScan = () => {
     const [isHidden, setIsHidden] = useState(true);

    const Button = styled.button`
    padding: 15px;
    color: #ad77e0;
    display: ${props => props.visibility? 'inline': 'none'}
    `;

    function handleButton(){
        setIsHidden(!isHidden);
    }

    return(
        <>
            <Button className="btn" onClick={handleButton} visibility = {isHidden}>
            Begin Scan
            </Button>
            {(!isHidden)? <Accelerometer/> : <></>}
        </>
    )
}

export default BeginScan
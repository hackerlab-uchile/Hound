// credits to adrianmcli
//https://gist.github.com/adrianmcli/9fac3ff3c144c2805be90381eaa8d3d4

import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  margin: auto;
  border-top: 4px solid Orchid;
  border-right: 4px solid Orchid;
  border-bottom: 4px solid Orchid;
  border-left: 4px solid DarkOrchid;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-top:50px;
  margin-bottom:50px;
`;

export default Spinner;
import styled from "styled-components";
import {Button as ButtonAntd} from "antd";

export const Button = styled(ButtonAntd)`
  width: ${props => props.auto ? "auto" : "100%"};
  display: block;
  margin: 2em auto ;
  text-transform: uppercase;
`

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  text-transform: uppercase;
  margin: 2em auto
`
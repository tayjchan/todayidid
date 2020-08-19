import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "./container";

const Box = styled.ul`
  text-align: left;
  padding-bottom: 10px;
`;
export default class History extends Component {
  render() {
    const taskList = this.props.tasks.map((task, index) => {
      return (
        <li key={index}>
          {task.datetime}: {task.value}
        </li>
      );
    });
    return (
      <Container style={{ borderBottom: "none", paddingBottom: 0 }}>
        <Box>{taskList}</Box>
      </Container>
    );
  }
}

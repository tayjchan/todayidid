import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "./container";
import Tag from "./tag";

const Box = styled.ul`
  text-align: left;
  padding-bottom: 10px;
`;
export default class Current extends Component {
  render() {
    const taskList = this.props.tasks.map((task, index) => {
      return (
        <li key={index}>
          {task.datetime}: {` `}
          {task.tags &&
            task.tags.map((tag) => <Tag text={tag} color='lightpink' />)}
          {task.value}
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

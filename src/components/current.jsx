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
          <b>{`${task.datetime}: `}</b>
          {task.tags &&
            task.tags.map((tag) => (
              <Tag key={`current_${tag}_${index}`} text={tag} disabled={true} />
            ))}
          {task.value}
        </li>
      );
    });
    return (
      <Container style={{ borderBottom: "none", marginBottom: 100 }}>
        <Box>{taskList}</Box>
      </Container>
    );
  }
}

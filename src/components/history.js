import React, { Component } from 'react'
import styled from 'styled-components';

const Box = styled.ul`
  text-align: left;
  padding-bottom: 10px;
`;
export default class History extends Component {
  render() {
    const taskList = this.props.tasks.map((task, index) => {
      return <li key={index}>{task.time}: {task.value}</li>;
    })
    return (
      <Box>{taskList}</Box>
    )
  }
}

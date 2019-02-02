import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;

  label{
    font-size: 10px;
  }

  input{
    width: 100%;
    font-size: 14px;
    padding: 2px;
  }
`;

export default class Input extends Component {
  state = {
    value: ''
  };
  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  handleSubmit = (event) => {
    event.preventDefault(); // Prevent window refresh
    const value = this.state.value;
    this.setState({value: ''});
    const datetime = new Date().toLocaleString().split(', ')
    const date = datetime[0];
    const time = datetime[1];
    const task = {value: value, date: date, time: time};
    console.log(task);
    this.props.addItem(task);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <label>Today I Did:</label>
        <input value={this.state.value} onChange={this.handleChange}/>
      </Form>
    )
  }
}

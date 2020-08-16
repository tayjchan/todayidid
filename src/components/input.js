import React, { Component } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    font-size: 10px;
  }

  input {
    width: 100%;
    font-size: 14px;
    padding: 2px;
  }
`;

export default class Input extends Component {
  state = {
    value: "",
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault(); // Prevent window refresh
    const datetime = new Date().toLocaleString();
    const task = {
      value: this.state.value,
      datetime: datetime,
    };
    this.props.addItem(task);
    this.setState({ value: "" });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor='itemInput'>Today I Did:</label>
        <input
          id='itemInput'
          value={this.state.value}
          onChange={this.handleChange}
        />
      </Form>
    );
  }
}

import React, { Component } from "react";
import styled from "styled-components";
import { findTags, removeTags } from "../utils/string";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
  padding-top: 0px;

  div {
    display: flex;
    width: 100%;
  }

  input {
    width: 100%;
    font-size: 14px;
    padding: 2px;
  }

  button {
    font-size: 10px;
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
    const tags = findTags(this.state.value);
    const trimmedTags = tags.map((tag) => tag.trim());
    const text = removeTags(this.state.value, tags);
    const task = {
      value: text,
      datetime: datetime,
      tags: trimmedTags,
    };
    this.props.addItem(task);
    this.setState({ value: "" });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor='itemInput'>Today I Did:</label>
        <div>
          <input
            id='itemInput'
            type='text'
            autoComplete='off'
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type='submit'>SUBMIT</button>
        </div>
      </Form>
    );
  }
}

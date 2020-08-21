import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";
import { addTask } from "./services/Firestore";

import Header from "./components/header";
import Input from "./components/input";
import History from "./components/history";
import Summary from "./components/summary";
import SignIn from "./components/signIn";

const Main = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  box-sizing: border-box;
`;
class App extends Component {
  state = {
    tasks: [],
    currentUser: null,
  };

  addItem = (item) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, item],
    }));
    addTask(item);
  };

  clearCurrentTasks = () => {
    this.setState({
      tasks: [],
    });
  };

  render() {
    return (
      <div className='App'>
        <Header text='DAILY LOG' />
        <SignIn
          currentUser={this.state.currentUser}
          updateUser={(user) => {
            this.setState({ currentUser: user });
          }}
        />
        {this.state.currentUser ? (
          <>
            <Summary clearCurrentTasks={this.clearCurrentTasks} />
            <Main>
              <History tasks={this.state.tasks} />
              <Input addItem={this.addItem} />
            </Main>
          </>
        ) : (
          <div>Sorry, you're not authorized.</div>
        )}
      </div>
    );
  }
}

export default App;

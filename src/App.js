import React, { Component } from "react";
import styled from "styled-components";
import { addTask } from "./services/Firestore";

import Header from "./components/header";
import Input from "./components/input";
import Current from "./components/current";
import Summary from "./components/summary";
import SignIn from "./components/signIn";

const Main = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding-top: 16px;
  background-color: white;
  z-index: 10;
  height: 100px;
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

    // Scroll to bottom so item is visible
    // window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);
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

            <Current tasks={this.state.tasks} />
            <Main>
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

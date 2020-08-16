import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Input from "./components/input";
import History from "./components/history";
import Summary from "./components/summary";
import styled from "styled-components";
import { addTask } from "./services/Firestore";

const Main = styled.div`
  padding: 50px;
  position: absolute;
  bottom: 30px;
  width: 100%;
  box-sizing: border-box;
`;
class App extends Component {
  // TODO: Save tasks every 15mins instead at every task add

  // Tasks lists everything that has been inputed since app started.
  // unsavedTasks is a range of tasks that haven't been saved to firestore.
  state = {
    tasks: [],
    unsavedTasksStart: 0,
    unsavedTasksEnd: 0,
  };

  addItem = (item) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, item],
    }));
    addTask(item);
  };

  componentDidMount() {
    window.addEventListener("beforeunload", function(e) {
      // TODO
    });
  }

  render() {
    return (
      <div className='App'>
        <Header text='DAILY LOG' />
        <Summary />
        <Main>
          <History tasks={this.state.tasks} />
          <Input addItem={this.addItem} />
        </Main>
      </div>
    );
  }
}

export default App;

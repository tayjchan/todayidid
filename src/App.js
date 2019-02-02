import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Input from './components/input';
import History from './components/history';
import styled from 'styled-components';

const Body = styled.div`
  padding: 50px;
  position: absolute;
  bottom: 30px;
  width: 100%;
  box-sizing: border-box;
`;
class App extends Component {
  state = {
    tasks: [],
  }

  addItem = (item) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, item ],
    }));
  }

  render() {
    return (
      <div className="App">
        <Header text='DAILY LOG'/>
        <Body>
          <History tasks={this.state.tasks}/>
          <Input addItem={this.addItem}/>
        </Body>
      </div>
    );
  }
}

export default App;

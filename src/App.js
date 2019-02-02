import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Input from './components/input';
import History from './components/history';

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
        <History tasks={this.state.tasks}/>
        <Input addItem={this.addItem}/>
      </div>
    );
  }
}

export default App;

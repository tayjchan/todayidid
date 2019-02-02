import React, { Component } from 'react'

export default class History extends Component {
  render() {
    return (
      <div>
       {this.props.tasks.map((task, index) => {
        return <li key={index}>{task.time}: {task.value}</li>
       })}
        
      </div>
    )
  }
}

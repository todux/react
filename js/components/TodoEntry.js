import React, { Component, PropTypes } from 'react'

class TodoEntry extends Component {

  constructor() {
    super()
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(event) {
    if (event.keyCode === 13 ) {
      this.props.onEnter(event.target.value);
      event.target.value = ''
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          onKeyDown={this.handleKeyDown}
        />
      </header>
    )
  }
}

TodoEntry.propTypes = {
  onEnter: PropTypes.func,
}

export default TodoEntry

import React, { Component, PropTypes } from 'react'

class TodoList extends Component {
  render() {
    const { onToggleAll } = this.props

    return (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={(e) => onToggleAll(e.target.checked)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {this.props.children}
        </ul>
      </section>
    )
  }
}

TodoList.propTypes = {
  onToggleAll: PropTypes.func,
}

export default TodoList

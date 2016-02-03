import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import c from 'classnames'

class TodoItem extends Component {

  constructor() {
    super()
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleEditBlur = this.handleEditBlur.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)

    this.state = { editing: false }
  }

  componentDidUpdate() {
    if (this.state.editing) {
      const { editInput } = this.refs
      const valueLength = editInput.value.length
      editInput.focus()
      editInput.setSelectionRange(valueLength, valueLength)
    }
  }

  handleDoubleClick(event) {
    this.setState({ editing: true })
  }

  handleKeyDown(event) {
    if (event.keyCode === 13 ) {
      this.setState({ editing: false })
    }
  }

  handleEditBlur(event) {
    if (!this.props.todo.text) {
      this.props.onDelete(this.props.todo.id)
    }

    this.setState({ editing: false })
  }

  handleTextChange(event) {
    this.props.onUpdate(
      this.props.todo.id,
      { text: event.target.value }
    )
  }

  handleCompleted() {
    this.props.onUpdate(
      this.props.todo.id,
      { completed: !this.props.todo.completed }
    )
  }

  handleDeleteClick(event) {
    this.props.onDelete(this.props.todo.id)
  }

  render() {
    const { todo, onDelete, onUpdate } = this.props

    return (
      <li
        className={c({
          completed: todo.completed,
          editing: this.state.editing
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this.handleCompleted}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={this.handleDeleteClick}></button>
        </div>
        <input
          ref="editInput"
          className="edit"
          value={todo.text}
          autoFocus={this.state.editing}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleEditBlur}
        />
      </li>
    )
  }
}

TodoItem.propTypes = {
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
}

export default TodoItem

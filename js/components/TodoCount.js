import React from 'react'

const TodoCount = (props) => {
  const count = props.todos
    .filter((todo) => !todo.completed)
    .length

  return (
    <span className="todo-count">
      <strong>{count}</strong> item{count !== 1 ? 's' : ''} left
    </span>
  )
}

export default TodoCount

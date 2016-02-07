import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import c from 'classnames'
import store from 'redux-mvc-store'
import {
  initialize,
  createTodo,
  updateTodo,
  deleteTodo,
  updateFilter,
  Filters,
} from 'redux-mvc-store/actions'

import TodoEntry from './components/TodoEntry'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import TodoCount from './components/TodoCount'

class App extends Component {

  constructor() {
    super()
    this.handleToggleAll = this.handleToggleAll.bind(this)
    this.clearCompleted = this.clearCompleted.bind(this)
    this.handleHashChange = this.handleHashChange.bind(this)
    window.addEventListener('hashchange', this.handleHashChange)
  }

  componentWillMount() {
    this.handleHashChange()
  }

  handleHashChange() {
    const { dispatch } = this.props

    switch (window.location.hash) {
      case '#/active':
        dispatch(updateFilter(Filters.ACTIVE))
        break;

      case '#/completed':
        dispatch(updateFilter(Filters.COMPLETED))
        break;

      default:
        dispatch(updateFilter(Filters.ALL))
        break;
    }
  }

  handleToggleAll(completed) {
    const { dispatch, todos } = this.props

    todos.forEach((todo) => {
      dispatch(updateTodo(todo.id, { completed }))
    })
  }

  clearCompleted() {
    const { dispatch, todos } = this.props

    todos
      .filter((todo) => todo.completed)
      .forEach((todo) => { dispatch(deleteTodo(todo.id)) })
  }

  render() {
    const { dispatch, todos, filter } = this.props

    return (
      <main>
        <section className="todoapp">
          <TodoEntry onEnter={(text) => dispatch(createTodo({text}))} />
          <TodoList onToggleAll={this.handleToggleAll}>
            {todos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={(id) => dispatch(deleteTodo(id))}
                  onUpdate={(id, update) => dispatch(updateTodo(id, update))}
                />
              )
            })}
          </TodoList>
          <footer className="footer">
            <TodoCount todos={todos}/>
            <ul className="filters">
              <li>
                <a
                  className={c({selected: filter === Filters.ALL })}
                  href="#/"
                >All</a>
              </li>
              <li>
                <a
                  className={c({selected: filter === Filters.ACTIVE })}
                  href="#/active"
                >Active</a>
              </li>
              <li>
                <a
                  className={c({selected: filter === Filters.COMPLETED })}
                  href="#/completed"
                >Completed</a>
              </li>
            </ul>
            <button
              className="clear-completed"
              onClick={this.clearCompleted}>Clear completed</button>
          </footer>
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
        </footer>
      </main>
    )
  }
}

function filterTodos(todos, filter) {
  switch (filter) {
    case Filters.ALL:
      return todos
    case Filters.COMPLETED:
      return todos.filter(todo => todo.completed)
    case Filters.ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

function selector(state) {
  return {
    todos: filterTodos(state.todos, state.filter),
    filter: state.filter,
  }
}

App = connect(selector)(App)

store.dispatch(initialize((callback) => {
  const initial = {
    todos: [],
    filter: Filters.ALL,
    firebase_subdomain: 'shining-inferno-825',
  }

  callback(JSON.parse(localStorage.getItem('todo-mvc-react-store')) || initial)
}))

store.subscribe(() => {
  localStorage.setItem('todo-mvc-react-store', JSON.stringify(store.getState()))
})

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './../components/todo/todo-list';

class Completed extends Component {
  render() {

    // filter todos list and show only completed
    const todos = this.props.todos.filter((item)=> {
      return item.completed;
    }).map((item)=> {
      return <TodoList key={item.key} item={item} />;
    });

    return (
      <ul className="todo-list unstyled">
        {todos}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.list
  }
};

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Completed);
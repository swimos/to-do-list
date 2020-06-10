import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TodoRemoveItem, TodoUpdateCompleted, TodoEditLabel } from './../../api';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      editValue: ''
    }

    this.input = null;
  }

  // Double click to make label editable
  onDoubleClickEdit(event) {
    this.setState({'editing': true});

    setTimeout(() => {
      this.input.focus();
    }, 0);
  }

  // Remove item from todo list
  onClickRemove(event) {
    this.props.TodoRemoveItem(this.props.item.key);
  }

  // Set up reference of edit input for focus
  refEditInput(elem) {
    this.input = elem;
  }

  // When edit input is press on enter blur the input.
  // The reason for blur is because you dont want to 
  // submit the data 2 time. Main hand data on blur
  keyPressEdit(event) {
    if(event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
      event.target.blur();
    }
  }

  // Bind state value on change
  onChangeEdit(event) {
    this.setState({editValue: event.target.value});
  }

  // When on blur update state and update label
  onBlurEdit(event) {
    const text = this.state.editValue.trim();
    if(text.length > 2) { // quick validation
      this.props.TodoEditLabel(this.props.item.key, text);
    }

    this.setState({editing: false});
    this.setState({editValue: ''});
  }

  // on click on checkbox to change completed status
  onClickCompleted(event) {
    this.props.TodoUpdateCompleted(this.props.item.key, !this.props.item.completed);
  }

  render() {
    return (
      <li className={`todo-form${this.props.item.completed? ' completed' : ''}${this.state.editing? ' edit' : ''}`} onDoubleClick={this.onDoubleClickEdit.bind(this)}>
        <input className="checkbox" type="checkbox" name={`item#${this.props.item.key}`} value={this.props.item.completed} onClick={this.onClickCompleted.bind(this)} />
        <div className="view">
    <label htmlFor={`item#${this.props.item.key}`}>{this.props.item.label}</label>
          <i className="material-icons" onClick={this.onClickRemove.bind(this)}>clear</i>
          <input className="input-edit" type="text" placeholder="Change Label" maxLength="254" ref={this.refEditInput.bind(this)} value={this.state.editValue} onChange={this.onChangeEdit.bind(this)} onBlur={this.onBlurEdit.bind(this)} onKeyPress={this.keyPressEdit.bind(this)} />
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return { }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ TodoRemoveItem, TodoUpdateCompleted, TodoEditLabel }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

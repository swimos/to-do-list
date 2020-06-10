import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TodoAddItem } from './../../api';

class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {value: ''};
  }

  // When key press on input add new item
  keyPress(event) {
    if(event.which === 13 || event.keyCode === 13 || event.key === "Enter") { // enter key
      const text = this.state.value.trim();
      if(text.length > 2) {
        this.setState({value: ''});
        this.props.TodoAddItem(this.state.value);
      }
    }
  }

  // Bind state value on change
  onChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="form-input">
        <input type="text" className="textInput" placeholder="What things to do?" maxLength="254" value={this.state.value} onChange={this.onChange.bind(this)} onKeyPress={this.keyPress.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ TodoAddItem }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
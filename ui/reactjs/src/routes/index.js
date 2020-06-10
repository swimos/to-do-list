import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';

import All from './all';
import Active from './active';
import Completed from './completed';
import Footer from './../components/footer';
import Header from './../components/header';
import TodoInput from './../components/todo/todo-input';
import { TodoCloseLink, TodoOpenLink, TodoSubscribeItem, TodoSubscribeRemoveItem } from './../api';

class Routers extends Component {  
  _todoLink = null

  /**
    * When the app is componentDidMount we open Map downlink 
    * to Subscribe totodos list. When the data is updated
    * we will send an action SUBSCRIBE_ITEM to keep track
    * of the state of the todo list. For todo list we 
    * mainly track if new item is added or rmeove or updated
    */
  componentDidMount() {
    this._todoLink = TodoOpenLink().didUpdate((key, value)=> {      
      this.props.TodoSubscribeItem({...value.toAny(), key: key.numberValue()});
    }).didRemove((key)=> {
      this.props.TodoSubscribeRemoveItem(key.numberValue());
    });
  }

  /**
    * When we componentWillUnmount is best if we close the Map downlink 
    * if we are not using.
    */
  componentWillUnmount() {
    this.props.TodoCloseLink();
    this._todoLink.close()
  }

  render() {
    return (
      <Router>
        <main className="container">
          <Header />

          <section className="todo-wrap"> 
            <h2 className="title">Reactjs - Todo List</h2>
            <div className="todo-header">
              <TodoInput />

              <ul className="filter unstyled">
                <li><NavLink exact to="/" activeClassName="active">All</NavLink></li>
                <li><NavLink to="/active" activeClassName="active">Active</NavLink></li>
                <li><NavLink to="/completed" activeClassName="active">Completed</NavLink></li>
              </ul>
            </div>

            <Switch>
              <Route exact path="/" component={All} />
              <Route path="/active" component={Active} />
              <Route path="/completed" component={Completed} />
            </Switch>
          </section>
        </main>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = state => { 
  return { }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ TodoCloseLink, TodoSubscribeItem, TodoSubscribeRemoveItem }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const year = new Date().getFullYear();

    return (
      <footer className="main-footer text-center">
        <span className="tip">Press Enter to submit and double click label to edit.</span>
        <div className="copyright">
          <span>{year} &copy; SWIM.ai</span>
        </div>
      </footer>
    );
  }
}
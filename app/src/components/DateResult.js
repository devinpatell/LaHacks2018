import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../firebase/index.js'

class DateResult extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Loading
      </div>
    );
  }
}


export default DateResult;
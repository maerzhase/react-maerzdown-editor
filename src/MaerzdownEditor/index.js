import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './style.less';

export default class MaerzdownEditor extends React.Component {

  constructor(props){
    super(props);

    this.state = {fullscreen:false};
  }

  render() {
    return(<div>Hello I am the MaerzdownEditor.</div>);
  }
}

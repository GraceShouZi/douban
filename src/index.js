import React from 'react';
import ReactDOM from 'react-dom';
import './js/resize.js';
import './css/style.css';
import Root from './root';
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello World！</h1>;
  }
});
 
ReactDOM.render(
  <Root/>,
  document.getElementById('app')
);
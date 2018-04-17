import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
var article = React.createClass({
  getInitialState: function() {
    var txt = this.props.location.pathname.split('/');
    var title = txt[txt.length-1];
    console.log(this.props)
    return{
      title:title
    }
  },
  render: function() {
    return (
    	<div className="article">
          <h3>{this.state.title}</h3>
    	</div>
    );
  }
});
export default article;
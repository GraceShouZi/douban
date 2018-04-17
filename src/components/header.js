import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
var names = [
    {"name":"电影","path":"/movie"},
    {"name":"图书","path":"/book"},
    {"name":"广播","path":"/broadcast"},
    {"name":"小组","path":"/group"}
];
var colors = ["blue","brown","yellow","green"];
var header = React.createClass({
  render: function() {
    return (
    	<div className="header">
    		<p className="logo"><Link to="/"></Link></p>
    		<span className="search"></span>
    		<ul>{names.map(function(item,i){return <li key={i} >
    			<Link to={item.path} className={colors[i]}>{item.name}</Link>
    		</li>})}
    		</ul>
    	</div>
    );
  }
});
export default header;
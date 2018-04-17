import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
var MyList = React.createClass({
  getInitialState: function() {
    var name = "/";
    if(location.hash.slice(1)=='/book'){
      name = '/booklist/'
    }else if(location.hash.slice(1)=='/movie'){
      name = '/movielist/'
    }
    return {
      name:name
    };
  },
   componentDidMount:function(){
   	
   },
   render: function() {
        return (
        	<div className="movie_list"> 
	            <h3>{this.props.movie.title}<Link to={{pathname: this.state.name + this.props.movie.id ,state: this.props.movie.id}} className="green">更多</Link></h3>
	            <ul>{this.props.movie.list.map(function(item,i){return <li key={i}>
	                <h4><img src={item.imgSrc} /></h4>
	                <p className="movie_list_title">{item.title}</p>
	                <p className={["movie_list_score",item.score ==0 ? "hide":""].join(' ')}>
	                    <span><i style={{"width":0.1*(Math.floor(item.score/2))+'rem'}}></i></span><em>{item.score.toFixed(1)}</em>
	                </p>
                  <p className={["movie_list_score02",item.score !=0 ? "hide":""].join(' ')}>暂无评分</p>
                </li>})}

	            </ul>
            </div>
        )    
   }
});
export default MyList;

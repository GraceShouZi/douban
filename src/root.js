import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import Header from './components/header';
import Main from './pages/main';
import Movie from './pages/movie';
import Book from './pages/book';
import Broadcast from './pages/broadcast';
import Group from './pages/group';
import MovieList from './pages/moviepages/movielist';
import BookList from './pages/bookpages/booklist';
import Article from './pages/articlepages/article';
var App = React.createClass({
  render: function() {
    return (
     <div>
        <Header />
        <div style={{"height":0.34+'rem'}}></div>
        {this.props.children}
        <div className={["footer",location.hash.slice(1)=='/' ? "hide":""].join(' ')}>
          <span><img src="https://img3.doubanio.com/f/talion/7837f29dd7deab9416274ae374a59bc17b5f33c6/pics/card/douban-app-logo.png"/></span>
          <span>豆瓣</span>
        </div>
      </div>
    );
  }
})

var Home = React.createClass({
  render: function() {
    return (      
       <div>
        <Main />
       </div>
      );
  }
})

var root = React.createClass({
  render(){
      return(
          <HashRouter>
            <App>
                <Route exact path='/' component={Home} />
                <Route path='/movie' component={Movie} />
                <Route path='/book' component={Book} />
                <Route path='/broadcast' component={Broadcast} />
                <Route path='/group' component={Group} />
                <Route path='/movielist' component={MovieList} />
                <Route path='/bookList' component={BookList} />
                <Route path='/article' component={Article} />
            </App>
        </HashRouter>
        )
    }
})
export default root;






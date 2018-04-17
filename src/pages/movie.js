import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import MyList from './../components/list';
import axios from 'axios';
var movie = React.createClass({
  getInitialState: function() {
    return {
      movie:{
        title:'',
        list:[],
        id:''
      },
      freeMovie:{
        title:'',
        list:[],
        id:''
      },
      newMovie:{
        title:'',
        list:[],
        id:''
      },
      findMovie:[
        {"name":"同时入选IMDB250和豆瓣电影250的电影","color":"blue blueBorder"},
        {"name":"带你进入不正常的世界","color":"brown brownBorder"},
        {"name":"用电去的岁月","color":"yellow yellowBorder"},
        {"name":"女孩们的故事【电影】","color":"green greenBorder"},
        {"name":"同时入选和豆瓣电影250的电影","color":"blue blueBorder"},
        {"name":"带你进入不正常的世界","color":"brown brownBorder"},
        {"name":"用电去的岁月","color":"yellow yellowBorder"},
        {"name":"女孩事【电影】","color":"green greenBorder"},
        {"name":"入不正常的世界","color":"brown brownBorder"}
      ],
      classifyMovie:[{"name":"经典"},{"name":"冷门佳片"},{"name":"豆瓣高分"},{"name":"经典"},{"name":"经典"},{"name":"经典"},{"name":"经典"},{"name":"经典"},{"name":"经典"},{"name":""}]
    };
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
    var len = this.state.findMovie.length;
    if(len>4){
        var index = Math.floor(len/2)-1;
        var parents = document.getElementById("findmovie_ul");
        var childLi = parents.childNodes[index];
        var newLi = document.createElement("li");
        newLi.setAttribute("class", "findmovie_line");
        parents.insertBefore(newLi,childLi.nextSibling)
    }
    var url1 = '/rexxar/api/v2/subject_collection/movie_showing/items?os=ios&callback=jsonp1&start=0&count=8';
    var state1 = this.state.movie;
    var name = 'movie';
    var url2 = '/rexxar/api/v2/subject_collection/movie_free_stream/items?os=windows+7&callback=jsonp2&start=0&count=8&loc_id=108288&_=0';
    var state2 = this.state.freeMovie;
    var name2 = 'freeMovie';
    var url3 = '/rexxar/api/v2/subject_collection/movie_latest/items?os=ios&callback=jsonp3&start=0&count=8&loc_id=108288&_=1523434461947';
    var state3 = this.state.newMovie;
    var name3 = 'newMovie';
    this.go(url1,state1,name);
    this.go(url2,state2,name2);
    this.go(url3,state3,name3);
  },  
  go:function(url,Rstate,name){
    var _this = this;
    axios.get(url).then(data=>{
       var result=data.data;
       result=result.substring(8,result.length-2);
       var obj = eval('(' + result + ')');
       var id = obj.subject_collection.id;
       var len = obj.subject_collection_items.length;
       var list = [];
       for(var i=0; i<len;i++){
          var score;
          if(obj.subject_collection_items[i].rating==null){
            score = 0
          }else{
            score = obj.subject_collection_items[i].rating.value;
          }
          list.push({"title":obj.subject_collection_items[i].title,"imgSrc":obj.subject_collection_items[i].cover.url,"score":score})
       };
       Rstate.title = obj.subject_collection.name;
       Rstate.list = list;
       Rstate.id = id;
       _this.setState({
          name:Rstate
       })
     })
     .catch(error=>{
       console.error(error);// 异常处理
     })
  },
  render: function() {
    return (
    	<div className="movie">
    		<MyList movie={this.state.movie} />
        <MyList movie={this.state.freeMovie} />   
        <MyList movie={this.state.newMovie} />        
        <div className="findmovie">
            <h3>发现好电影</h3>
            <ul id="findmovie_ul">{this.state.findMovie.map(function(item,i){return<li key={i} className={item.color}>
                <span>{item.name}</span>
            </li>})}</ul>
        </div>
        <div className="classify_movie">
            <h3>分类浏览</h3>
            <ul>{this.state.classifyMovie.map(function(item,i){return<li key={i} className="green">
                {item.name}
            </li>})}</ul>
        </div>
    	</div>
    );
  }
});
export default movie;
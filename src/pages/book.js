import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import MyList from './../components/list';
import axios from 'axios'
var movie = React.createClass({
  getInitialState: function() {
    return {
      fiction:{
        title:'',
        list:[],
        id:''
      },
      Nonfiction:{
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
      classifyMovie:[{"name":"经典"},{"name":"冷门佳片"},{"name":"豆瓣高分"},{"name":"经典"},{"name":"经典"},{"name":"经典"},{"name":"经典"},{"name":"经典"},{"name":"经典"},{"name":""}],
      bookStore:{
        header:{},
        list:[]
      }
    }
  },
  componentDidMount: function() {
    var _this = this;
    var len = _this.state.findMovie.length;
    if(len>4){
        var index = Math.floor(len/2)-1;
        var parents = document.getElementById("findmovie_ul");
        var childLi = parents.childNodes[index];
        var newLi = document.createElement("li");
        newLi.setAttribute("class", "findmovie_line");
        parents.insertBefore(newLi,childLi.nextSibling)
    }
    var url1 = '/rexxar/api/v2/subject_collection/book_fiction/items?os=ios&callback=jsonp1&start=0&count=8&loc_id=0&_=1523436885337';
    var state1 = this.state.fiction;
    var name = 'fiction';
    var url2 = '/rexxar/api/v2/subject_collection/book_nonfiction/items?os=ios&callback=jsonp2&start=0&count=8&loc_id=0&_=1523436885338';
    var state2 = this.state.Nonfiction;
    var name2 = 'Nonfiction';
    this.go(url1,state1,name);
    this.go(url2,state2,name2);
    var _this = this;
    axios.get('/rexxar/api/v2/subject_collection/market_product_book_mobile_web/items?os=ios&callback=jsonp3&start=0&count=8&loc_id=0&_=1523436885339').then(data=>{
      var result=data.data;
      result=result.substring(8,result.length-2);
      var obj = eval('(' + result + ')');
      _this.state.bookStore.header = obj.header;
      _this.state.bookStore.list = obj.subject_collection_items;
      _this.state.bookStore.imgSrc = obj.header.cover.url;
      _this.setState({
        bookStore:_this.state.bookStore
      }); 
     })
     .catch(error=>{
       console.error(error);
     });
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
          list.push({"title":obj.subject_collection_items[i].title,"imgSrc":obj.subject_collection_items[i].cover.url,"score":obj.subject_collection_items[i].rating.value})
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
    		<MyList movie={this.state.fiction} />
        <MyList movie={this.state.Nonfiction} />
        <div className="book_store">
          <h3>豆瓣书店</h3>
          <dl className="book_store_top">
            <dt><img src={this.state.bookStore.imgSrc}/></dt>
            <dd>
              <h4>{this.state.bookStore.header.title}<span className="red">￥{this.state.bookStore.header.price}</span></h4>
              <p>{this.state.bookStore.header.info}</p>
            </dd>
          </dl>
          <ul className="book_store_content">
            {this.state.bookStore.list.map(function(item,i){return<li key={i}>
                <h4><img src={item.cover.url} /></h4>
                <p className="bsc_title">{item.title}</p>
                <p className="bsc_price">¥<i>{item.price}</i></p>
            </li>})}
          </ul>
        </div>
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
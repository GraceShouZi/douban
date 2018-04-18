import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
var page = 0;
var booklist = React.createClass({
  getInitialState: function() {
    var txt = this.props.location.pathname.split('/');
    var title = txt[txt.length-1];
    page = 1;
    return{
      books:{
        title:'',
        urlname:title,
        list:[]
      },
      total:'',
      num:10,
      loadingFlag:false
    }
  },
  componentDidMount: function() {
    var _this = this;
    window.addEventListener('scroll', this.handleScroll);
    var url = '/rexxar/api/v2/subject_collection/'+this.state.books.urlname+'/items?os=ios&for_mobile=1&callback=jsonp1&start=0&count='+_this.state.num+'&loc_id=0&_=1523522149306';
    _this.go(url);
  },
  componentWillUnmount:function(){
    window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll:function(){
    var scrollTop = document.body.scrollTop;
    var height = document.body.clientHeight; 
    var scrollHeight = document.body.scrollHeight;
    var _this = this;
    var totalPage = Math.ceil(_this.state.total/_this.state.num);
    if(scrollTop+height>=scrollHeight){
      page++;
      if(page<=totalPage){
        var url = '/rexxar/api/v2/subject_collection/'+_this.state.books.urlname+'/items?os=ios&for_mobile=1&callback=jsonp1&start=0&count='+page*_this.state.num+'&loc_id=0&_=1523522149306';
        _this.go(url);
      }else{
        _this.setState({
          loadingFlag:true 
        })
      }
    }
  },  
  go:function(url){
    var _this = this;
    axios.get(url).then(data=>{
       var result=data.data;
       result=result.substring(8,result.length-2);
       var obj = eval('(' + result + ')');
       var len = obj.subject_collection_items.length;
       var list = [];
       for(var i=0; i<len;i++){
          var score;
          if(obj.subject_collection_items[i].rating==null){
            score = 0
          }else{
            score = obj.subject_collection_items[i].rating.value;
          }
          list.push({"title":obj.subject_collection_items[i].title,"imgSrc":obj.subject_collection_items[i].cover.url,"score":score,"intro":obj.subject_collection_items[i].info})
       };
       _this.state.books.title = obj.subject_collection.name;
       _this.state.books.list = list;
       _this.setState({
          books:_this.state.books,
          total:obj.total
       })
     })
     .catch(error=>{
       console.error(error);// 异常处理
     })
  },  
  render: function() {
    return (
    	<div className="book_pages">
        <h3>{this.state.books.title}</h3>
        <ul>{this.state.books.list.map(function(item,i){
            return <li key={i}>
              <div className="book_pages_left"><img src={item.imgSrc} /></div>
              <div className="book_pages_right">
                  <h4>{item.title}</h4>
                  <p className="score"><span><i style={{"width":0.1*(Math.floor(item.score/2))+'rem'}}></i></span><em>{item.score.toFixed(1)}</em></p>
                  <p className="bpr_intro">{item.intro}</p>
              </div>
            </li>
        })}</ul>
        <div className="loading">加载数据</div>
    	</div>
    );
  }
});
export default booklist;
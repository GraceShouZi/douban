import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import MyList from '../../components/list';
import axios from 'axios';
var page = 0;
var movielist = React.createClass({
  getInitialState: function() {
    var txt = this.props.location.pathname.split('/');
    var title = txt[txt.length-1];
    page = 1;
    return{
      Nonfiction:{
        title:'',
        urlname:title,
        list:[]
      },
      total:'',
      num:12,
      loadingFlag:false
    }
  },
  componentDidMount: function() {
    var _this = this;
    window.addEventListener('scroll', this.handleScroll);
    var url = '/rexxar/api/v2/subject_collection/'+this.state.Nonfiction.urlname+'/items?os=ios&for_mobile=1&callback=jsonp1&start=0&count='+_this.state.num+'&loc_id=108288&_=1523514896029';
    this.go(url);
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
        var url = '/rexxar/api/v2/subject_collection/'+this.state.Nonfiction.urlname+'/items?os=ios&for_mobile=1&callback=jsonp1&start=0&count='+page*_this.state.num+'&loc_id=108288&_=1523514896029';
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
          list.push({"title":obj.subject_collection_items[i].title,"imgSrc":obj.subject_collection_items[i].cover.url,"score":score})
       };
       _this.state.Nonfiction.title = obj.subject_collection.name;
       _this.state.Nonfiction.list = list;
       _this.setState({
          Nonfiction:_this.state.Nonfiction,
          total:obj.total
       })

     })
     .catch(error=>{
       console.error(error);// 异常处理
     })
  },  
  render: function() {
    return (
    	<div className="movie_pages">
        <MyList movie={this.state.Nonfiction} />
        <div className={['loading',this.state.loadingFlag ? '' : 'hide'].join(' ')}>无更多数据</div>
    	</div>
    );
  }
});
export default movielist;
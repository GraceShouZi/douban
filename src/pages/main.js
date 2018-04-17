import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import common from './../js/common';
var date = "";
var today ="";
var day = new Date();
var page;
var data = [];
var Main = React.createClass({
  getInitialState: function() {
    return {
      card:[{"name":"影院热映","path":"/movielist/movie_showing"},{"name":"图书图书","path":"/booklist/book_nonfiction"},{"name":"豆瓣时间","path":""},{"name":"使用豆瓣App","path":""}],
      main_data:[],
      loadingFlag:true
    };
  },
  componentDidMount: function() {
    date = '';
    day = new Date();
    page = -1;
    today = common.format(day);
    var url = '/rexxar/api/v2/recommend_feed?alt=json&next_date='+date+'&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=1';
    this.go(url);
    window.addEventListener('scroll', this.handleScroll);
  },
  componentWillUnmount:function(){
  	window.removeEventListener('scroll', this.handleScroll);
  },
  handleScroll:function(){
  	var scrollTop = document.body.scrollTop;
  	var height = document.body.clientHeight; 
  	var scrollHeight = document.body.scrollHeight;
  	var _this = this;
    if(scrollTop+height>=scrollHeight){
       page++;
       var pageDate=day.getTime()-(page*1000*60*60*24);
       var pageDate = new Date(pageDate);
       var date = common.format(pageDate)
       var url = '/rexxar/api/v2/recommend_feed?alt=json&next_date='+date+'&loc_id=108288&gender=&birthday=&udid=9fcefbf2acf1dfc991054ac40ca5114be7cd092f&for_mobile=1';
       _this.go(url,date)
    }
  },
  go:function(url){
    axios.get(url).then((res)=>{
      data.push(res.data);
      this.setState({
        main_data:data
      })
    }).catch((err)=>{
      console.log(err);
    });
  },
  render: function() {
  	var loadingTxt;
  	if(this.state.loadingFlag){
  		loadingTxt = (<img src='https://img3.doubanio.com/f/talion/bf2ef8c5c1a8c84dddfd1135656857e73582c5d8/pics/card/loading_grey.gif' />);
  	}else{
  		loadingTxt = (<span>暂无更多数据</span>)
  	}
    return (
    	<div>
    		<div className="quickNav">
    			<ul>{this.state.card.map(function(item,i){
    				return <li key={i}><Link to={{pathname: item.path ,state: '666666'}}>{item.name}</Link></li>
    			})}</ul>
    		</div>
    		<div className="mainList">
          {this.state.main_data.map(function(item,i){
            return <div key={i}>
              <h5 className={item.date!=today?'':'hide'}>{item.date}</h5>
              <ul>
                {item.recommend_feeds.map(function(items,j){ return <li key={j}>
                  <div className="mainList_L">
                    <h4>{items.title}</h4>
                    <p>{items.target.desc}</p>
                  </div>
                  <div className="mainList_R">
                    <img src={items.target.cover_url} />
                  </div>
                  <div className="mainList_tips">
                    <span>by {items.target.author.name}</span>
                    <i>{items.source_cn}</i>
                 </div>
                </li>})}
              </ul></div>
          })}
    			
    			<div className="loading">
    				{loadingTxt}
    			</div>
    		</div>
    	</div>
    )
  }
});
export default Main;





import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
/**
      {"imgSrc":"https://img3.doubanio.com/icon/up152799682-26.jpg","name":"RUNE","time":"2018-03-28 19:21:37","zanNum":11,"zanFlag":false,"commentNum":1},
      {"imgSrc":"https://img3.doubanio.com/icon/up95805238-16.jpg","name":"RUNE","time":"2018-03-28 19:21:37","zanNum":21,"zanFlag":true,"commentNum":21},
      {"imgSrc":"https://img3.doubanio.com/icon/up152799682-26.jpg","name":"RUNE","time":"2018-03-28 19:21:37","zanNum":22,"zanFlag":false,"commentNum":121}]
**/
var broadcast = React.createClass({ 
  getInitialState: function() {
    return {
      list:[]
    };
  },
  componentDidMount: function() {
    this.go();
  },
  zanClick: function(i) {
    var _this = this;
     _this.state.list[i].zanFlag = !_this.state.list[i].zanFlag;
    if(_this.state.list[i].zanFlag){
      _this.state.list[i].zanNum++;
    }else{
      _this.state.list[i].zanNum--;
    }
    _this.setState({
      list:_this.state.list
    })
  },
  go:function(){
    axios.get('/rexxar/api/v2/status/anonymous_timeline?max_id=&ck=&for_mobile=1').then((res)=>{
      //console.log(res.data.items[1].status)
      for(var i=0;i<res.data.items.length;i++){
        //reshared_status
        console.log(res.data.items[i].status)
       // console.log(res.data.items[i].status.reshared_status)
      }
      this.setState({
        list:res.data.items
      })
    }).catch((err)=>{
      console.log(err);
    });
  },
  render: function() {
    var _this=this;
    return (
    	<div className="broadcast">
        {this.state.list.map(function(item,i){return <div key={i} className="broadcast_li">
           <span className="broadcast_li_left"><img src={item.status.author.avatar} /></span>
            <div className="broadcast_li_right">
              <div className="bclr_title">
                <b>{item.status.author.name}</b>说
                <p>{item.time}</p>
              </div>
              <div className="bclr_content">
                <img src={require('../images/movie.jpg')} />
              </div>
              <div className="bclr_tips">
                <span className={["bclr_zan",item.zanFlag ? "bclr_zan02":""].join(' ')} onClick={_this.zanClick.bind(_this,i)}>{item.zanNum}</span>
                <span className="bclr_comment">{item.commentNum}</span>
              </div>
            </div>
        </div>})}
    	</div>
    );
  }
});
export default broadcast;
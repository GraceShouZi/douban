import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
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
      var data = res.data.items;
      var list = [];
      var avatar,name,title,subtitle,liked,like_count,img,times,comments_count;
      //var images = [];
      for(var i=0;i<data.length;i++){
        var arr = data[i].status;
            img = [];
        times = arr.create_time;    
        if(arr.reshared_status!=null){
          avatar = arr.reshared_status.author.avatar;
          name = arr.reshared_status.author.name;
          title = arr.reshared_status.text;
          liked = arr.reshared_status.liked;
          like_count = arr.reshared_status.like_count;
          comments_count = arr.reshared_status.comments_count;
          subtitle = "";
          var imglen = arr.reshared_status.images.length;
          for(var j=0;j<imglen;j++){
            img.push({"imgSrc":arr.reshared_status.images[j].large.url})
          }
        }else{
          avatar = arr.author.avatar;
          name = arr.author.name;
          title = "";
          subtitle = "";
          liked = arr.liked;
          like_count = arr.like_count;
          comments_count = arr.comments_count;
          var imglen = arr.images.length;
          for(var j=0;j<imglen;j++){
            img.push({"imgSrc":arr.images[j].large.url})
          }
          if(arr.card!=null){
            title = arr.card.title;
            subtitle = arr.card.subtitle;
          }else{
            title = arr.text;
          }

        }
        list.push({"avatar":avatar,"name":name,"title":title,"subtitle":subtitle,"images":img,"time":times,"liked":liked,"like_count":like_count,"comments_count":comments_count})
      }
      console.log(list)
      this.setState({
        list:list
      });
    }).catch((err)=>{
      console.log(err);
    });
  },
  render: function() {
    var _this=this;  

    return (
    	<div className="broadcast">
        {this.state.list.map(function(item,i){return <div key={i} className="broadcast_li">
           <span className="broadcast_li_left"><img src={item.avatar} /></span>
            <div className="broadcast_li_right">
              <div className="bclr_title">
                <b>{item.name}</b>说
                <p>{item.time}</p>
              </div>
              <div className="bclr_content">
                <h3>{item.title}</h3>
                <p className="bclr_content_subtitle">{item.subtitle}</p>
                <ul className={item.images.length>1?"broadcast_img_list":""}>{item.images.map(function(items,j){return <li key={j}><img src={items.imgSrc} />
                </li>})}</ul>
              </div>
              <div className="bclr_tips">
                <span className={["bclr_zan",item.zanFlag ? "bclr_zan02":""].join(' ')} onClick={_this.zanClick.bind(_this,i)}>{item.like_count}</span>
                <span className="bclr_comment">{item.comments_count}</span>
              </div>
            </div>
        </div>})}
    	</div>
    );
  }
});
export default broadcast;
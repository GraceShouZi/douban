import React from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

var groupList = React.createClass({ 
  getInitialState: function() {
    return {
      list:[]
    };
  },
  componentDidMount: function() {
    this.go();
  },
  zanClick: function(i) {
    
  },
  go:function(){
    var list = [];
    axios.get('/rexxar/api/v2/group/rec_groups_for_newbies?ck=&for_mobile=1').then((res)=>{
      var data = res.data.rec_groups;
      for(var i=0;i<data.length;i++){
        for(var j=0; j<data[i].classified_groups.length;j++){
          list.push({"name":data[i].classified_groups[j].name,"arr":data[i].classified_groups[j].groups})
        }
      }
      this.setState({
        list:list
      })
    }).catch((err)=>{
      console.log(err);
    });
  },
  render: function() {
    var _this=this;
    return (
    	<div className="group">{this.state.list.map(function(item,i){return <div key={i} className="grouplist">
          <h3>{item.name}</h3>
          <ul>{item.arr.map(function(items,j){return <li key={j}>
             <div className="grouplist_title"> 
                <span className="grouplist_left"><img src={items.avatar} /></span>
                <em>{items.name}</em><i>{items.member_count} 人</i>
             </div>
             <p>{items.desc_abstract}</p>
          </li>})}</ul>
      </div>})}
    	</div>
    );
  }
});
export default groupList;
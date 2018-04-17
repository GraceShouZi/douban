exports.format = function(fmt){
 var year = fmt.getFullYear();
 var month = fmt.getMonth()+1;
 var date = fmt.getDate();
 if(month.toString().length==1){
    month = '0'+month;
 }
 if(date.toString().length==1){
    date = '0'+date;
 }
 var d = [year,month,date].join('-')
 return d;   
}

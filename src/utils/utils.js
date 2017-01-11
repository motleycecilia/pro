const util = {
  /*
  根据身份证号获得性别
  return M 为男
  */
  fillBirAndSex: function(val) {
    let withidNogetSex = (num) => {
      return num % 2 === 0 ? 'F' : 'M';
    }
    let idNoLen=val.length;
    if(idNoLen !== 15 && idNoLen !== 18){
      return '';
    }
    return idNoLen === 15 ?
    withidNogetSex(val.substr(-1)) :
    withidNogetSex(val.substr(-2,1));
  },
  /*根据证件号码获得出生日期*/
  splitbirth :function(date) { //截取日期
    let len= date.length
  	if( len !== 15 && len !== 18){
  		return '';
  	}
    return date=date.length === 15 ? (date.substring(4, 8) + "-"+date.substring(8, 10) + "-" + date.substring(10, 12)) : (date.substring(6, 10) + "-" + date.substring(10, 12) + "-" + date.substring(12, 14));
  },
  /*格式化日期*/
  formatDate : function(date) {
    return date.indexOf('-') > -1 ? date.replace(/-/g, '/') : date
  },
  /*
  得到年龄
  @param bir: 生日
  @param styDate: 系统时间
  @param isInclude: 是否包含当天 true为包含
  */
  getAge : function(bir,sysDate,isInclude) {
    bir = this.formatDate(bir)
    let daysNum=isInclude === true ? -1 : 0;
    let d = new Date(sysDate),
    // uyy = bir.substring(0, 4),
     yy = d.getFullYear(),
     reYear =  dates => dates.replace(dates.substring(0,4), '2000')
    // nowDate = yy + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    let [uyy, nowDate] = [bir.substring(0,4), `${yy}/${(d.getMonth() + 1)}/${daysNum+1*d.getDate()}`],
    age = (yy * 1 - uyy * 1 -1 + (new Date(reYear(nowDate)).getTime() >= new Date(reYear(bir)).getTime() ? 1 : 0))
    return age >= 0 && age <= 150 ? age : false
  },
  fdate:function(date){
    return new Date(date).getTime()
  },
  /*
  得到两个日期相差的天数
  */
  DateDiff: function (sDate1,sysDate){    //sDate1和sDate2是2006-12-18格式
   sDate1=this.fdate(sDate1)
   sysDate=this.fdate(sysDate)
   return (sysDate-sDate1)/1000/60/60/24;
  },
  /*
  @list DOM 页面中单选或多选的class名
  得到多选或单选 中的目标
  (只能单用)
  return 选中被保人ID
  */
  getChoseBeinsure: function(list){//拿到用户选择的被保人
    let choseList = list.length >0 ?
    [].filter.call((list),function(val,index) {
      return val.checked === true
    }) : []
    return choseList.map( (val, index) => {
      return val.attributes.id.value.split('-')[1]
    })
  },
  /**
  获取当前日期n日期以后的时间
  @params date :系统时间
  @params edate : n日期
  @params unit : 单位 (赞支持月和天M为月)
  @params yearAdd : +yearAdd年
  **/
  getEndDate: function(date, edate, unit, yearAdd){
    if(new Date(date) == "Invalid Date"){
      return "";
    }
    let dd = new Date(date);
    unit === 'M' ? dd.setMonth(dd.getMonth()+edate) : dd.setDate(dd.getDate()+edate);
  	var y = dd.getFullYear() + (!!yearAdd ? +yearAdd : 0);
  	var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
  	var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate(); //获取当前几号，不足10补0
  	return y+"-"+m+"-"+d;
  },
  /**
  获取当前日期n日期以后的时间
  @params date :系统时间
  @params edate : n日期
  @params unit : 单位 (M为月Y为年 默认或其它为天)
  @params yearAdd : +yearAdd年
  **/
  getEndDatet: function(date, edate, unit){
    if(new Date(date) == "Invalid Date"){
      return "";
    }
    let dd = new Date(date);
    if(unit === 'M') {
      dd.setMonth(+edate + dd.getMonth())
    } else if(unit === 'Y') {
      dd.setFullYear(+edate + dd.getFullYear())
    }else {
      dd.setDate(+edate + dd.getDate())
    }
    var y = dd.getFullYear();
  	var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
  	var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate(); //获取当前几号，不足10补0
  	return y+"-"+m+"-"+d;
  },
  /*
  比较两个日期大小
  @params dateo:第一个日期
  @params datet:第二个日期
  return 返回true 则第一个日期大
  */
  maxDate : function(dateo, datet) {
    let date1=new Date(dateo),
    date2=new Date(datet)
    return Date.parse(dateo) >= Date.parse(datet)
  },
  outputAddOverweight: function(val) {
    val = "" + val
    return val.length < 9 ? "****" : (val.substring(0, 4) + "****" + val.substring(val.length - 4, val.length))
  }
}

export default util

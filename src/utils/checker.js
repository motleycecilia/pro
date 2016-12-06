const checkers = {
	isEmpty: function(val) {
		return !!val ? !!val.trim() ? true : false : false;
	},
	regularCheck: function(val, reg, errMsg) {
		val = !!val ? val.trim() : val
		return !reg.test(val) ? errMsg : false
	},
	uName: function(name){
		return this.regularCheck(name, /^[\u4E00-\u9FA5]{2,20}$/, '请输入正确的姓名')
	},
	otherCardNo: function(cardNo) {
		return this.regularCheck(cardNo, /(^[0-9a-zA-Z]{1,20}$)/, '请输入正确的证件号码')
	},
	idCard: function(id) {
		var reg= /^\+?[1-9][0-9]*$/;
    var clstypelen = id.length,
    docvalue=id,
    docvaluesp=docvalue.split(""),
    homonum=["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],
    sum=0,
    retuNum=["1","0","X","9","8","7","6","5","4","3","2"];
    if (clstypelen != 15 && clstypelen != 18) {
        return "请输入正确的身份证号"
    }
    if(clstypelen==18){
        if(!reg.test(docvalue.substring(0,17))){
          return "请输入正确的身份证号"
        }
        for(var i=0;i<17;i++){
          sum+=docvaluesp[i]*homonum[i];
        }
        if(retuNum[sum%11]!=docvalue.charAt(17)){
          return "请输入正确的身份证号"
        }
    }
    return false;
	},
	valiceCode: function(code) {
		return this.regularCheck(code, /^[0-9]{6}$/, '请输入正确的短信验证码')
	},
	imgValiceCode: function(code) {
		return this.regularCheck(code, /^[0-9a-zA-Z]{4}$/g, '请输入正确的图形验证码')
	},
	mobile: function(phone) {
		return this.regularCheck(phone, /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i, '请输入正确的手机号')
	},
	email: function(email){
		return this.regularCheck(email, /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '请输入正确的邮箱')
  },
	checkSection: function(val, min, max, prefixMsg) {
		return val > min && val < max ? false : `投保人${prefixMsg}必须在${min}~${max}之间`
	},
	checkAdultAge: function(age) {
		return this.checkSection(+age, 18, 80, '年龄')
	}
}

export function createChecker(checkList){
	let errorContent = ''
	checkList.forEach((val, index) => {
		errorContent = !!errorContent ? errorContent : checkers[val.checkfnName](val.checkValue)
	})
	return errorContent
}

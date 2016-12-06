import request from 'reqwest'
// const domain = 'http://pa18-wapmall-dmzstg1.pingan.com.cn:5380/chaoshi'
const domain = process.env.DEV_ENV === 'production' ?
	'https://m.pingan.com/chaoshi' :
  'https://pa18-wapmall-dmzstg1.pingan.com.cn:53443/chaoshi'
	// 'http://pa18-wapmall-dmzstg1.pingan.com.cn:5380/chaoshi'
// const domain = 'https://m.pingan.com/chaoshi' 18544448888
const timeout = 10000

export function queryDetilInfo(productId) {
	return request({
		url: domain + '/product/quer/productInfo.do',///product/quer/productInfo.do
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			platformType: '02',
			productSide: '30002',
			transactionCode: 'CX02',
			productId: productId
		}
	})
}

export function isLogin(){
	return request({
		url: domain + '/finance/order/checkInfoForPlacingOrder.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8'
	})
}

export function getPolicyUserInfo() {
	return request({
		url: domain + '/support/insurance/getNewInsurer.do',///support/insurance/getNewInsurer.do
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8'
	})
}

export function updatePolicyUserInfo(params){
	return request({
		url: domain + '/support/insurance/addNewInsurer.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			insurerId: params.insurerId,
      insurerName: params.insurerName,
      insurerIdNo: params.insurerIdNo,
      insurerBirthday: params.insurerBirthday,
      insurerMobile: params.insurerMobile,
      insurerEmail: params.insurerEmail,
      insurerIdType: '1',
      insurerSex: params.insurerSex
		}
	})
}

export function getInsuredUserInfo(id){
	return request({
		url: domain + '/support/insurance/getNewInsurant.do',///support/insurance/getNewInsurant.do
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			insurantId: id
		}
	})
}

export function updateInsuredUserInfo(params){
	return request({
		url: domain + '/support/insurance/updateNewInsurant.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			insurantId: params.insurerId,
			insurantName: params.insurantName,
			insurantIdNo: params.insurantIdNo,
			insurantIdType: params.insurantIdType,
			insurantMobile: params.insurantMobile,
			insurantRelation: params.insurantRelation,
			insurantSex: params.insurantSex,
			insurantBirthday: params.insurantBirthday
		}
	})
}

export function addInsuredUserInfo(params){
	return request({
		url: domain + '/support/insurance/addNewInsurant.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			insurantName: params.insurantName,
			insurantIdNo: params.insurantIdNo,
			insurantIdType: params.insurantIdType,
			insurantMobile: params.insurantMobile,
			insurantRelation: params.insurantRelation,
			insurantSex: params.insurantSex,
			insurantBirthday: params.insurantBirthday
		}
	})
}
//
export function deleteInsuredUserInfo(insurantId){
	return request({
		url: domain + '/support/insurance/deleteNewInsurant.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			insurantId: insurantId
		}
	})
}
//核保
export function preSubmit(params){
	return request({
		url: domain + '/insurance/validatePremium.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			orderType: '0',
			transactionCode: 'CX04',
			insurantIdType: '1',
			buyPlatform: '1',
			insurantId: params.insurantId,
			insurantName: params.insurantName,
			insurantIdno: params.insurantIdno,
			insurantBirth: params.insurantBirth,
			insurantSex: params.insurantSex,
			mobile: params.mobile,
			email: params.email,
			productId: params.productId,
			insurancePeriod: params.insurancePeriod,
			insurancePriodUnit: params.insurancePriodUnit,
			productCode: params.productCode,
			insuranceBeginTime: params.insuranceBeginTime,
			insuranceStartTime: params.insuranceStartTime,
			insuranceEndTime: params.insuranceEndTime,
			annualPremium: params.annualPremium
		}
	})
}

/*保单确认*/
export function confirmation(orderNo){
	return request({
		url: domain + '/order/quer/orderDetail.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			transactionCode: 'CX03',
			orderNo: orderNo
		}
	})
}

/*同步登录态*/
export function getAccessTicket(sso) {
  return request({
    url: domain + '/sso/account/getAccessTicket.do',
    method: 'GET',
    type: 'jsonp',
    timeout: timeout,
    contentType: 'application/json;charset=utf-8',
    data: sso
  })
}

/* 是否需要升级 */
export function getUpdateInfo(params) {
	return request({
		url: domain + '/sso/account/checkOrderPayCondition.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: params
	})
}
export function getUpdateUrl(){
	return {
		'02':domain+'/customerupgrade/index.shtml#/account/pwd',
		'01':domain+'/customerupgrade/index.shtml#/account/certify',
		'03':domain+'/customerupgrade/index.shtml#/account/newCertify',
	}
}

export const OXYGEN = `${domain}/payPre/auth/index.shtml`
export const NEXTLINK = "/welding"

export function checkIfAdult(){//查询是否满足18岁
	return request({
		url:domain+'/yanglao/order/checkInfoForPlacingOrder.do',
		method:'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8'
	})
}

//判断是否需要橙子账户鉴权和开户
export function orangeAccount(data){
	return request({
		url:`${process.env.ISMORK?'':domain}/scence/orangebank/orangeAccount.jsonp`,
		method:'GET',
		type:'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data:data
	})
}

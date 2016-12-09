import request from 'reqwest'
const domain = process.env.DEV_ENV === 'production' ?
	'https://m.pingan.com/chaoshi' :
  'https://pa18-wapmall-dmzstg1.pingan.com.cn:53443/chaoshi'
const timeout = 10000

export function queryDetilInfo(productId) {
	return request({
		url: domain + '/support/insurance/productInfo.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			productId: productId,
      productSide: '20001',
      platformType: '02'
		}
	})
}

export function isLogin() {
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
		url: domain + '/support/insurance/getNewInsurer.do',
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

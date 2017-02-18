import request from 'reqwest'
import { App, YztApp } from 'utils/native_h5'
const domain = process.env.DEV_ENV === 'production' ?
	'https://m.pingan.com/chaoshi' :
  'https://pa18-wapmall-dmzstg1.pingan.com.cn:53443/chaoshi'//
const isGp = false
const timeout = 10000
const domainGP = 'https://test-toa-web-h5-stg1.pingan.com.cn:34943' //location.origin
//http:34980  https:34943
// const gpUrl = ais === 1 ? 'https://toa-gp-dmzstg1.pingan.com.cn:34943/toa-mgw/rest/webgateway' :  'https://test-toa-web-h5-stg1.pingan.com.cn:34943/yizhangtong/api/gp'
const gpUrl = 'https://test-toa-web-h5-stg1.pingan.com.cn:34943/yizhangtong/api/gp/'
const osTypes = App.IS_IOS === true ? "1" : "2"
const publicParam = {"osType": "3", "deviceId": "D14634788288402628", "longitude": "22", "appVersion": "5.2.9", "osVersion": "9.3", "appClientId": "C14634788288460974", "reqTracer": "D14634788288402628C5AE6248-8E8D-452B-8B12-3AC4ECABD9DD", "latitude":"22", "dpi":"750x1334"};
const detailParams = [{"osType": "3", "deviceId": "D14634788288402628", "longitude": "22", "appVersion": "5.2.9", "osVersion": "9.3", "appClientId": "C14634788288460974", "reqTracer": "D14634788288402628C5AE6248-8E8D-452B-8B12-3AC4ECABD9DD", "latitude":"22", "dpi":"750x1334"},{productId:'10028680',
productCode:'10007603', productSide: '20001', platformType: '002'}]

function gpFn(operationType, paramas) {
	return request({
    url: gpUrl,
    method: 'post',
		contentType: 'application/x-www-form-urlencoded',
    type: 'json',
    data: {'operationType': operationType, 'requestData': JSON.stringify([publicParam, paramas])},
  })
}

export function queryDetilInfo(productId, productCode) {
	let paramst = {productId: productId, productCode: productCode, productSide: '20001', platformType: '002'}
	if(isGp === true) {
		return gpFn('GetProductDetail', paramst)
	}else {
		return request({
			url: domain + '/support/insurance/productInfo.do',
			method: 'get',
			type: 'jsonp',
			timeout: timeout,
			contentType: 'application/json;charset=utf-8',
			data: {
				productId: productId,
	      productCode: '2342342',
	      productSide: '20001',
	      platformType: '02'
			}
		})
	}
}


//核保
export function preSubmit(params){
	let paramst = {
		// clientNo: '613591470048742560',
		from: 'wap-chaoshi',
		userChannel: '0',
		buyPlatform: '1',
		serialNo: params.serialNo,
		orderType: '0',
		productId: params.productId,
		productCode: params.productCode,
		orderSpliteFlag: params.orderSpliteFlag,
		productInsuranceCode: params.productInsuranceCode,
		skuId: params.skuid,
		policyholdersInfo: params.insurerInfo,
		insuranceInfoList: params.insuranceInfoList,
		invoceInfo: params.invoceInfo,
		linkManInfo: params.linkManInfo,
		in: params.insurantInfoList
	}
	console.log(JSON.stringify(paramst))
	if(isGp === true) {
		return gpFn('premiumConfirm', paramst)
	}else {
		return request({
			url: 'https://m.pingan.com/chaoshi/support/insurance/getNewInsurant.do?insurantId=&callback=reqwest_1486179288247',
			method: 'GET',
			type: 'jsonp',
			timeout: timeout,
			contentType: 'application/json;charset=utf-8',
			data: {
				// buyPlatform: '1',
				// serialNo: params.serialNo,
				// orderType: '0',
				// productId: params.productId,
				// productCode: params.productCode,
				// orderSpliteFlag: '1',
				// productInsuranceCode: parasm.productInsuranceCode,
				// skuid: params.skuid,
				// insurerInfo: params.insurerInfo,
				// insuranceInfoList: params.insuranceInfoList,
				// invoceInfo: params.invoceInfo,
				// linkManInfo: params.linkManInfo,
				// in: params.insurantInfoList
			}
		})
	}
}
/*保费测算*/
export function premiumMeasure(params){
	const paramsGp = {
		serialNo: params.serialNo,
		from: 'wap-chaoshi',
		userChannel: '0',
		quantity: 1,//params.insurantInfoList.length,
		buyPlatform: '1',
		orderType: '2',
		productId: params.productId,
		productCode: params.productCode,
		orderSpliteFlag: params.orderSpliteFlag,
		productInsuranceCode: params.productInsuranceCode || "P1130B48",
		insuranceInfoList: params.insurantInfoList
	}
	console.log(JSON.stringify(paramsGp))
	let paramst = {
			// "clientNo": "4215114760062584223",
			"productId": "10028680",
			"productInsuranceCode": "P1130B48",
			"productCode": "10007603",
			"orderType": "2",
			"quantity": "1",
			"buyPlatform": "1",
			"userId": "421511476006258422",
			"from": "wap-chaoshi",
			"userChannel": "0",
			"serialNo": "3222222222",
			"orderSpliteFlag": "1",
			"insuranceInfoList": [
					{
						"policyInfo":{
									"insuranceBeginTime": "2017-2-20 10:30:30",
									"insuranceStartTime": "2017-2-20 10:30:30",
									"insuranceEndTime": "2017-2-20 10:30:30",
									"insurancePeriod": "40",
									"insurancePriodUnit": "D",
									"annualPremium": "1804",
									"paymentType": "1",
									"discount": "1"
							},
							"insurantInfoList": [
									{
											"relation": "1",
											"insurantCount": "1",
											"insurantName": "王五",
											"insurantBirth": "1986-08-30",
											"insurantIdType": "1",
											"insurantSex": "M",
											"insurantIdno": "110101201606200057777",
											"mobile": "18351663326",
											"email": "123@123.com",
											"personType": "2",
											"type": 1,
											"planInfoList": [
													{
															"benLevel": "00",
															"planCode": "P033501",
															"sumIns": 350000,
															"premType": 1,
															"premTerm": 12
													}
											]
									}
							]
					},
					{
						"policyInfo":{
									"insuranceBeginTime": "2017-2-20 10:30:30",
									"insuranceStartTime": "2017-2-20 10:30:30",
									"insuranceEndTime": "2017-2-20 10:30:30",
									"insurancePeriod": "40",
									"insurancePriodUnit": "D",
									"annualPremium": "1804",
									"actualPremium": "1804",
									"paymentType": "1",
									"discount": "1"
							},
							"insurantInfoList": [
									{
											"relation": "1",
											"insurantCount": "1",
											"insurantName": "赵小姐",
											"insurantBirth": "2000-08-30",
											"insurantIdType": "1",
											"insurantSex": "F",
											"insurantIdno": "110101201606200057666",
											"mobile": "1257890000",
											"email": "1389@189.com",
											"personType": "2",
											"type": 1,
											"planInfoList": [
													{
															"benLevel": "00",
															"planCode": "P033501",
															"sumIns": 350000,
															"premType": 1,
															"premTerm": 12
													}
											]
									}
							]
					}
			]
	}
	if(isGp === true) {
		return gpFn('premiumCalculate', paramsGp)
	}else {
		return request({
			url: 'https://m.pingan.com/chaoshi//support/insurance/productInfo.do?productId=10000400&productSide=20001&platformType=02&callback=reqwest_1486711510630',
			method: 'GET',
			type: 'jsonp',
			timeout: timeout,
			contentType: 'application/json;charset=utf-8',
			data: {
				serialNo: params.serialNo,
				from: 'wap-chaoshi',
				userChannel: '0',
				buyPlatform: '1',
				orderType: '2',
				productId: params.productId,
				productCode: params.productCode,
				orderSpliteFlag: '1',
				insuranceList: [
					{
						policyInfo: params.policyInfo,
						productInsuranceCode: params.productInsuranceCode,
						skuId: params.skuid,
						insurantInfoList: params.insurantInfoList,
					}
				]
			}
		})
	}
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
/*
查询投保人
*/
export function getPolicyUserInfo() {
	if(isGp === true) {
		return gpFn('GetInsurerInfo', {})
	}else {
		return request({
			url: domain + '/support/insurance/getNewInsurer.do',
			method: 'GET',
			type: 'jsonp',
			timeout: timeout,
			contentType: 'application/json;charset=utf-8'
		})
	}
}
/*
更新投保人
*/
export function updatePolicyUserInfo(params){
	let paramst = {
		// clientNo: '613591470048742560',
		insurerId: params.insurerId,
		insurerName: params.insurerName,
		insurerIdNo: params.insurerIdNo,
		insurerBirthday: params.insurerBirthday,
		insurerMobile: params.insurerMobile,
		insurerEmail: params.insurerEmail,
		insurerIdType: '1',
		insurerSex: params.insurerSex
	};
	if(isGp === true) {
		return gpFn('SetInsurerInfo', paramst)
	}else {
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
}

export function getInsuredUserInfo(id){
	if(isGp === true) {
		return gpFn('GetInsurantInfo', {})
	}else {
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
}

export function updateInsuredUserInfo(params){
	let paramst = {
		// clientNo: '613591470048742560',
		insurantId: params.insurerId,
		insurantName: params.insurantName,
		insurantIdNo: params.insurantIdNo,
		insurantIdType: params.insurantIdType,
		insurantMobile: params.insurantMobile,
		insurantRelation: params.insurantRelation,
		insurantSex: params.insurantSex,
		insurantBirthday: params.insurantBirthday
	}
	if(isGp === true) {
		return gpFn('SetInsurantInfo', paramst)
	}else {
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
}

export function addInsuredUserInfo(params){
	const paramst = {
		// clientNo: '613591470048742560',
		insurantName: params.insurantName,
		insurantIdNo: params.insurantIdNo,
		insurantIdType: params.insurantIdType,
		insurantMobile: params.insurantMobile,
		insurantRelation: params.insurantRelation,
		insurantSex: params.insurantSex,
		insurantBirthday: params.insurantBirthday
	}
	if(isGp === true) {
		return gpFn('NewInsurantInfo', paramst)
	}else {
		return request({
			url: domain + '/support/insurance/addNewInsurant.do',
			method: 'GET',
			type: 'jsonp',
			timeout: timeout,
			contentType: 'application/json;charset=utf-8',
			data: paramst
		})
	}
}
//
export function deleteInsuredUserInfo(insurantId){
	if(isGp === true) {
		return gpFn('RemoveInsurantInfo', {insurantId: insurantId})
	}else {
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
}
/*app 登录*/

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
export function getAccessTicketGP(params) {
	return gpFn('mamcLogin', params)
}
/* 是否需要升级 */
export function checkOrderPayCondition(params) {
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

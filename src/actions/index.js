import * as api from 'api'
import * as types from '../constants/actionTypes'
import incinerator from 'hooks/incinerator'

/*
查询详情页
*/
export function queryDetilInfo(productId){
  return (dispatch, getState) => {
    dispatch(getDetailInfoBegin())
    return api.queryDetilInfo(productId)
    .then(res => {
      incinerator('getDetail', res.responseCode, {
        success: dispatch.bind(this, getDetailSuccess(res.responseData)),
        fail: dispatch.bind(this, getDetailInfoError(res.responseCode, res.responseMessage))
      })
    })
    .fail(() => {
      dispatch(getDetailInfoError('90012','系统异常'))
    })
  }
}

function getDetailInfoBegin() {
  return {
    type: types.GET_DETAIL_BEGIN
  }
}

function getDetailSuccess(resultData) {
  return {
    type: types.GET_DETAIL_SUCCESS,
    resultData: resultData
  }
}

function getDetailInfoError(errorCode, errorMsg) {
  return {
    type: types.GET_DETAIL_ERROR,
    errorCode: errorCode,
    errorMsg: errorMsg
  }
}

/*
查询详情页
*/
export function premiumMeasure(params){
  return (dispatch, getState) => {
    dispatch(premiumMeasureBegin())
    return api.premiumMeasure(params)
    .then(res => {
      incinerator('premiumMeasure', res.responseCode, {
        success: dispatch.bind(this, premiumMeasureSuccess(res.responseData)),
        fail: dispatch.bind(this, premiumMeasureError(res.responseCode, res.responseMessage))
      })
    })
    .fail(() => {
      dispatch(premiumMeasureError('90012','系统异常'))
    })
  }
}
function premiumMeasureBegin() {
  return {
    type: types.MEASURE_PREMIUM_BEGIN
  }
}

function premiumMeasureSuccess(resultData) {
  return {
    type: types.MEASURE_PREMIUM_SUCCESS,
    resultData: resultData
  }
}

function premiumMeasureError(errorCode, errorMsg) {
  return {
    type: types.MEASURE_PREMIUM_ERROR,
    errorCode: errorCode,
    errorMsg: errorMsg
  }
}
export default function premiumMeasureReset() {
  return {
    type: types.RESET_MEASURE_PREMIUM
  }
}

/*
是否登录
*/
export function isLogin(){
  return (dispatch, getState) => {
    dispatch(getLoginstatusBegin())
    return api.isLogin()
    .then(res => {
      dispatch(getLoginstatusSuccess(res))
      //window.location.href=res.url
    })
    .fail(() => {
      dispatch(getLoginstatusError())
    })
  }
}

function getLoginstatusBegin() {
  return {
    type: types.GET_LOGIN_STATUS_BEGIN
  }
}

function getLoginstatusSuccess(resultData){
  return {
    type: types.GET_LOGIN_STATUS_SUCCESS,
    responseCode: resultData.responseCode,
    url: resultData.url
  }
}

function getLoginstatusError(){
  return {
    type: types.GET_LOGIN_STATUS_ERROR
  }
}

export function resetLogin() {
  return {
    type: types.RESET_LOGIN_STATUS
  }
}

/*投保人查询与修改*/
export function getPolicyUserInfo(){
  return (dispatch, getState) => {
    dispatch(getPolicyUserInfoBegin())
    return api.getPolicyUserInfo()
    .then(res => {
      incinerator('getPolicyUserInfo', res.responseCode, {
        success: dispatch.bind(this, getPolicyUserInfoSuccess(res.responseData)),
        fail: dispatch.bind(this, getPolicyUserInfoError(res.responseMessage)),
        unlogin: dispatch.bind(this, getPolicyUserInfoError('90002'))
      })
    })
    .fail(() => {
      dispatch(getPolicyUserInfoError('系统异常'))
    })
  }
}

function getPolicyUserInfoBegin() {
  return {
    type: types.GET_POLICY_USER_BEGIN
  }
}

function getPolicyUserInfoSuccess(resultData) {
  return {
    type: types.GET_POLICY_USER_SUCCESS,
    getResultData: resultData
  }
}

function getPolicyUserInfoError(errorMsg) {
  return {
    type: types.GET_POLICY_USER_ERROR,
    errorMsg: errorMsg
  }
}

export function updatePolicyUserInfo(params){
  return (dispatch, getState) => {
    dispatch(updatePolicyUserInfoBegin())
    return api.updatePolicyUserInfo(params)
    .then(res => {
      incinerator('getPolicyUserInfo', res.responseCode, {
        success: dispatch.bind(this, updatePolicyUserInfoSuccess(res.responseData)),
        fail: dispatch.bind(this, updatePolicyUserInfoError(res.responseMessage)),
        unlogin: dispatch.bind(this, updatePolicyUserInfoError('90002'))
      })
    })
    .fail(() => {
      dispatch(updatePolicyUserInfoError('系统异常'))
    })
  }
}

function updatePolicyUserInfoBegin() {
  return {
    type: types.UPDATE_POLICY_USER_BEGIN
  }
}
function updatePolicyUserInfoSuccess(resultData) {
  return {
    type: types.UPDATE_POLICY_USER_SUCCESS,
    updateResultData: resultData
  }
}
function updatePolicyUserInfoError(errorMsg) {
  return {
    type: types.UPDATE_POLICY_USER_ERROR,
    updataPolicyErrorMsg: errorMsg
  }
}

export function resetPolicyUserInfo() {
  return {
    type: types.RESET_POLICY_USER
  }
}
//被保人增删查改
export function getInsuredUserInfo(id){
  return (dispatch, getState) => {
    dispatch(getInsuredUserInfoBegin())
    return api.getInsuredUserInfo(id)
    .then(res => {
      incinerator('insuredInfo', res.responseCode, {
        success: dispatch.bind(this, getInsuredUserInfoSuccess(res.responseData)),
        fail: dispatch.bind(this, getInsuredUserInfoError(res.responseMessage)),
        unlogin: dispatch.bind(this, getInsuredUserInfoError('90002'))
      })
    })
    .fail(() => {
      dispatch(getInsuredUserInfoError('系统异常'))
    })
  }
}

function getInsuredUserInfoBegin() {
  return {
    type: types.GET_INSURED_USER_BEGIN
  }
}

function getInsuredUserInfoSuccess(resultData) {
  return {
    type: types.GET_INSURED_USER_SUCCESS,
    getIResultData: resultData
  }
}

function getInsuredUserInfoError(errorMsg) {
  return {
    type: types.GET_INSURED_USER_ERROR,
    errorMsg: errorMsg
  }
}

export function updateInsuredUserInfo(params){
  return (dispatch, getState) => {
    dispatch(updateInsuredUserInfoBegin())
    return api.updateInsuredUserInfo(params)
    .then(res => {
      incinerator('insuredInfo', res.responseCode, {
        success: dispatch.bind(this, updateInsuredUserInfoSuccess(res.responseData)),
        fail: dispatch.bind(this, updateInsuredUserInfoError(res.responseMessage)),
        unlogin: dispatch.bind(this, updateInsuredUserInfoError('90002'))
      })
    })
    .fail(() => {
      dispatch(updateInsuredUserInfoError('系统异常'))
    })
  }
}

function updateInsuredUserInfoBegin() {
  return {
    type: types.UPDATE_INSURED_USER_BEGIN
  }
}
function updateInsuredUserInfoSuccess(resultData) {
  return {
    type: types.UPDATE_INSURED_USER_SUCCESS,
    updateIResultData: resultData
  }
}
function updateInsuredUserInfoError(errorMsg) {
  return {
    type: types.UPDATE_INSURED_USER_ERROR,
    errorMsg: errorMsg
  }
}

export function addInsuredUserInfo(params){
  return (dispatch, getState) => {
    dispatch(addInsuredUserInfoBegin())
    return api.addInsuredUserInfo(params)
    .then(res => {
      incinerator('insuredInfo', res.responseCode, {
        success: dispatch.bind(this, addInsuredUserInfoSuccess(res.responseData)),
        fail: dispatch.bind(this, addInsuredUserInfoError(res.responseMessage)),
        unlogin: dispatch.bind(this, addInsuredUserInfoError('90002'))
      })
    })
    .fail(() => {
      dispatch(addInsuredUserInfoError('系统异常'))
    })
  }
}

function addInsuredUserInfoBegin() {
  return {
    type: types.ADD_INSURED_USER_BEGIN
  }
}
function addInsuredUserInfoSuccess(resultData) {
  return {
    type: types.ADD_INSURED_USER_SUCCESS,
    addIResultData: resultData
  }
}
function addInsuredUserInfoError(errorMsg) {
  return {
    type: types.ADD_INSURED_USER_ERROR,
    errorMsg: errorMsg
  }
}

export function deleteInsuredUserInfo(params){
  return (dispatch, getState) => {
    dispatch(deleteInsuredUserInfoBegin())
    return api.deleteInsuredUserInfo(params)
    .then(res => {
      incinerator('insuredInfo', res.responseCode, {
        success: dispatch.bind(this, deleteInsuredUserInfoSuccess(res.responseData)),
        fail: dispatch.bind(this, deleteInsuredUserInfoError(res.responseMessage)),
        unlogin: dispatch.bind(this, deleteInsuredUserInfoError('90002'))
      })
    })
    .fail(() => {
      dispatch(deleteInsuredUserInfoError('系统异常'))
    })
  }
}

function deleteInsuredUserInfoBegin() {
  return {
    type: types.DELETE_INSURED_USER_BEGIN
  }
}
function deleteInsuredUserInfoSuccess(resultData) {
  return {
    type: types.DELETE_INSURED_USER_SUCCESS,
    deleteIResultData: resultData
  }
}
function deleteInsuredUserInfoError(errorMsg) {
  return {
    type: types.DELETE_INSURED_USER_ERROR,
    errorMsg: errorMsg
  }
}
export function resetInsuredUserInfo() {
  return {
    type: types.RESET_INSURED_USER
  }
}
/*核保*/
export function preSubmit(params){
  return (dispatch, getState) => {
    dispatch(getPreSubmitBegin())
    return api.preSubmit(params)
    .then(res => {
      incinerator('preSubmit', res.responseCode, {
        success: dispatch.bind(this, getPreSubmitSuccess(res.responseData)),
        fail: dispatch.bind(this, getPreSubmitError(res.responseMessage)),
        unlogin: dispatch.bind(this, getPreSubmitError('90002'))
      })
    })
    .fail(() => {
      dispatch(getPreSubmitError('系统异常'))
    })
  }
}

function getPreSubmitBegin(resultData) {
  return {
    type: types.GET_PRESUBMIT_BEGIN
  }
}
function getPreSubmitSuccess(resultData) {
  return {
    type: types.GET_PRESUBMIT_SUCCESS,
    preResultData: resultData
  }
}

function getPreSubmitError(errorMsg) {
  return {
    type: types.GET_PRESUBMIT_ERROR,
    errorMsg: errorMsg
  }
}

export function resetPreSubmit() {
  return {
    type: types.RESET_PRESUBMIT
  }
}

/**
 * APP用户同步登录态
 */

function appLoginBegin(){
	return {
		type: types.APP_LOGIN_BEGIN
	}
}

function appLoginSuccess(responseData){
	return {
		type: types.APP_LOGIN_SUCCESS,
    appLoginResult: responseData
	}
}

function appLoginFail(errorCode, error){
	return {
		type: types.APP_LOGIN_ERROR,
    errorCode: errorCode,
		error:error
	}
}

export function AppUserLogin() {
	function getSSO(){
		return new Promise((resolve,reject)=>{
			YztApp.getLoginStatus((status,data)=>{
				if(status != 'success'){
					reject('native api call error');
				}
				if(status === 'success' && !data.clientNo){
					YztApp.accessNativeModule('patoa://pingan.com/login')
				}
				if(data.clientNo){
					YztApp.getSSOTicket((status,data)=>{
						if(status==='success' && data){
							resolve(data)
						}
						else{
							reject('native api call error')
						}
					})
				}
			})
		})
	}

	return (dispatch, getState) => {
		dispatch(appLoginBegin())
		return (async function(){
			try{
				let sso = await getSSO();
				api.getAccessTicket(sso)
          .then(res => {
            // dispatch(appLoginSuccess(res.responseData))
            if(res.responseData && res.responseData.clientNo){
              dispatch(appLoginSuccess(res.responseData))
            }
            else{
              dispatch(appLoginFail('90002','未登录'))
            }
          })
          .fail(() => {
						dispatch(appLoginFail('111','当前网络异常，请检查您的网络设置'))
					});
			}
			catch(err){
				dispatch(appLoginFail('22',err))
			}
		})()
	}
}

// 获取升级信息
function getUpdataInfoBegin(){
	return {
		type:types.GET_UPDATREINFO_BEGIN
	}
}

function getUpdataInfoSuccess(upDataInfos){
	return {
		type:types.GET_UPDATREINFO_SUCCESS,
		upDataInfo: upDataInfos
	}
}
function getUpdataInfoFail(errorCode,errorMessage){
	return {
		type:types.GET_UPDATREINFO_FAIL,
		errorCode: errorCode,
		errorMessage: errorMessage
	}
}

export function resetUpdataInfo(){
	return {
		type:types.RESET_UPDATREINFO
	}
}

export function getUpdateInfo(params){
	return (dispatch, getState) => {
		dispatch(getUpdataInfoBegin())
		return api.getUpdateInfo(params)
			.then(res => {
				incinerator('checkOrderPayCondition', res.responseCode, {
					success: dispatch.bind(this, getUpdataInfoSuccess(res.responseData)),
					fail: dispatch.bind(this, getUpdataInfoFail(res.responseCode, res.responseMessage)),
					unlogin: ()=>{
            YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
            })
          }
				})
			})
			.fail(() => {
				dispatch(getUpdataInfoFail('77777', '当前网络异常，请检查您的网络设置'))
			})
	}
}

//用户信息回显
export function getAccountInfo(){
	return (dispatch, getState) => {
		dispatch(getAccountInfoBegin())
		return api.getAccountInfo()
		.then(res => {
			incinerator('getAccountInfo', res.responseCode, {
				success: dispatch.bind(this, getAccountInfoSuccess(res)),
				fail: dispatch.bind(this, getAccountInfoFail(res.responseCode, res.responseMessage)),
				//unlogin: dispatch.bind(this, loginAccountFail(getState().routing.path, res.url))
        unlogin:()=>{
          dispatch(getAccountInfoFail(res.responseCode,res.responseMessage));
          YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
          })
        }
			})
		})
		.fail(() => {
			dispatch(getAccountInfoFail('77777', '当前网络异常，请检查您的网络设置'))
		})
	}
}

export function getAccountInfoBegin() {
	return {
		type: types.GET_ACCOUNT_INFO_BEGIN
	}
}

export function getAccountInfoSuccess(result) {
	return {
		type: types.GET_ACCOUNT_INFO_SUCCESS,
		result: result
	}
}

function getAccountInfoFail(errorCode, errorMessage) {
	return {
		type: types.GET_ACCOUNT_INFO_FAIL,
		errorCode: errorCode,
		errorMessage: errorMessage
	}
}

// 用户态实效
export function loginAccountFail(currentUrl, loginUrl) {
  return {
    type: types.LOGIN_ACCOUNT_FAIL,
    currentUrl,
    loginUrl
  }
}


//用户登录

function loginBegin(){
	return {
		type: types.LOGIN_BEGIN
	}
}

function loginSuccess(clientNo){
	return {
		type: types.LOGIN_SUCCESS,
	}
}

function loginFail(error){
	return {
		type: types.LOGIN_FAIL,
		error:error
	}
}

function ssoBegin(){
	return {
		type:types.SSO_BEGIN
	}
}

function ssoSuccess(clientNo){
	return {
		type:types.SSO_SUCCESS,
		clientNo:clientNo
	}
}

function ssoFail(error){
	return {
		type:types.SSO_FAIL,
		error:error
	}
}

export function userLogin() {
	//if(!App.IS_YZT ){
	//	YztApp.getLoginStatus= function(cb){
	//		setTimeout(()=>{cb('success',{clientNo:'111'})},1000);
	//	}
	//	YztApp.getSSOTicket= function(cb){
	//		setTimeout(()=>{cb('success',JSON.stringify({signature:'111'}))},1000);
	//	}
	//	//return
	//};
	return (dispatch, getState) => {
		dispatch(loginBegin())
		return YztApp.getLoginStatus((status,data)=> {
			if (status !== 'success') {
				dispatch(ssoFail('native api call error'));
				return;
			}
			if (status === 'success' && !data.clientNo) {//未登录先去登录
				YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
				})
			}
			if(data.clientNo){
				dispatch(loginSuccess(data.clientNo))
				dispatch(ssoBegin());
				YztApp.getSSOTicket((status,data)=>{
						//let sso = data ?JSON.parse(data.toString()):false;
            let sso = data
						if(status==='success' && sso){
							api.getAccessTicket(sso)
								.then(res => {
									incinerator('getAccessTicket', res.responseCode, {
										success:()=>{
											if(res.responseData && res.responseData.clientNo){
												dispatch(ssoSuccess(res.responseData.clientNo))
											}
											else{
												dispatch(ssoFail('请求接口失败'))
											}
										},
										fail:dispatch.bind(this, ssoFail(res.responseMessage)),
										unlogin:()=>{
											dispatch(ssoFail(res.responseMessage));
											YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
											})
										}
									})
								})
								.fail(() => {
									dispatch(ssoFail('请求接口失败'))
								});
						}
					})
			}
		})
	}
}

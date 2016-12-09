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
      dispatch(getPolicyUserInfoSuccess(res))
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
      dispatch(updatePolicyUserInfoSuccess(res))
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
    errorMsg: errorMsg
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
      dispatch(getInsuredUserInfoSuccess(res))
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
      dispatch(updateInsuredUserInfoSuccess(res))
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
      dispatch(addInsuredUserInfoSuccess(res))
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
      dispatch(deleteInsuredUserInfoSuccess(res))
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

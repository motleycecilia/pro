import {
  GET_LOGIN_STATUS_BEGIN,
  GET_LOGIN_STATUS_SUCCESS,
  GET_LOGIN_STATUS_ERROR,
  RESET_LOGIN_STATUS,
  APP_LOGIN_BEGIN,
  APP_LOGIN_SUCCESS,
  APP_LOGIN_ERROR,
  GET_UPDATREINFO_BEGIN,
  GET_UPDATREINFO_SUCCESS,
  GET_UPDATREINFO_FAIL,
  RESET_UPDATREINFO
}
from 'constants/actionTypes'

const defaultState = {
  getLoginStatusBegin: false,
  getLoginStatusSuccess: false,
  getLoginStatusError: false,
  appLoginBegin: false,
  appLoginSuccess: false,
  appLoginError: false,
  getUpDataInfoBegin: false,
  getUpDataInfoSuccess: false,
  getUpDataInfoFail: false
}

export default function isLogins(state = defaultState, action) {
  switch(action.type){
    case GET_LOGIN_STATUS_BEGIN:
      return Object.assign({}, state, {
        getLoginStatusBegin: true
      })
    case GET_LOGIN_STATUS_SUCCESS:
      return Object.assign({}, state, {
        getLoginStatusBegin: false,
        getLoginStatusSuccess: true,
        responseCode: action.responseCode,
        resJompUrl: action.url
      })
    case GET_LOGIN_STATUS_ERROR:
      return Object.assign({}, state, {
        getLoginStatusBegin: false,
        getLoginStatusError: true,
        errorCode: action.responseCode,
        errorMsg: action.responseMessage
      })
    case RESET_LOGIN_STATUS:
      return Object.assign({}, state, {
        getLoginStatusBegin: false,
        getLoginStatusError: false,
        getLoginStatusSuccess: false,
        appLoginBegin: false,
        appLoginSuccess: false,
        appLoginError: false
      })
    case APP_LOGIN_BEGIN:
      return Object.assign({}, state, {
        appLoginBegin: true
      })
    case APP_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        appLoginBegin: false,
        getLoginStatusSuccess: false,
        appLoginSuccess: true,
        appLoginResult: action.appLoginResult
      })
    case APP_LOGIN_ERROR:
      return Object.assign({}, state, {
        getLoginStatusSuccess: false,
        appLoginBegin: false,
        appLoginError: true,
        errorCode: action.errorCode,
        errorMsg: action.error
      })
    case GET_UPDATREINFO_BEGIN:
      return Object.assign({}, state, {
        getUpDataInfoBegin: true
      })
    case GET_UPDATREINFO_SUCCESS:
      return Object.assign({}, state, {
        getUpDataInfoBegin: false,
        getUpDataInfoFail: false,
        getUpDataInfoSuccess: true,
        upDataInfo: action.upDataInfo
      })
    case GET_UPDATREINFO_FAIL:
      return Object.assign({}, state, {
        getUpDataInfoBegin: false,
        getUpDataInfoSuccess: false,
        getUpDataInfoFail: true,
        errorCode: action.errorCode,
        errorMsg: action.errorMessage
      })
    case RESET_UPDATREINFO:
      return defaultState
    default:
      return state
  }
}

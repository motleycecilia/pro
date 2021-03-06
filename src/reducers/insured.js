import {
  GET_INSURED_USER_BEGIN,
  GET_INSURED_USER_SUCCESS,
  GET_INSURED_USER_ERROR,
  ADD_INSURED_USER_BEGIN,
  ADD_INSURED_USER_SUCCESS,
  ADD_INSURED_USER_ERROR,
  UPDATE_INSURED_USER_BEGIN,
  UPDATE_INSURED_USER_SUCCESS,
  UPDATE_INSURED_USER_ERROR,
  DELETE_INSURED_USER_BEGIN,
  DELETE_INSURED_USER_SUCCESS,
  DELETE_INSURED_USER_ERROR,
  RESET_INSURED_USER
}
from 'constants/actionTypes'

const defaultState = {
  getInsuredUserBegin: false,
  getInsuredUserSuccess: false,
  getInsuredUserError: false,
  updateInsuredUserBegin: false,
  updateInsuredUserSuccess: false,
  updateInsuredUserError: false,
  addInsuredUserBegin: false,
  addInsuredUserSuccess: false,
  addInsuredUserError: false,
  deleteInsuredUserBegin: false,
  deleteInsuredUserSuccess: false,
  deleteInsuredUserError: false
}

export default function policyUserInfo(state = defaultState, action) {
  switch(action.type){
    case GET_INSURED_USER_BEGIN:
      return Object.assign({}, state, {
        getInsuredUserBegin: true
      })
    case GET_INSURED_USER_SUCCESS:
      return Object.assign({}, state, {
        getInsuredUserSuccess: true,
        getInsuredUserBegin: false,
        getInsuredUserError: false,
        getIResultData: action.getIResultData
      })
    case GET_INSURED_USER_ERROR:
      return Object.assign({}, state, {
        getInsuredUserBegin: false,
        getInsuredUserError: true,
        errorMsg: action.errorMsg
      })
    case ADD_INSURED_USER_BEGIN:
      return Object.assign({}, state, {
        addInsuredUserBegin: true
      })
    case ADD_INSURED_USER_SUCCESS:
      return Object.assign({}, state, {
        addInsuredUserBegin: false,
        addInsuredUserSuccess: true,
        addIResultData: action.addIResultData
      })
    case ADD_INSURED_USER_ERROR:
      return Object.assign({}, state, {
        addInsuredUserBegin: false,
        addInsuredUserError: true,
        errorMsg: action.errorMsg
      })
    case UPDATE_INSURED_USER_BEGIN:
      return Object.assign({}, state, {
        updateInsuredUserBegin: true
      })
    case UPDATE_INSURED_USER_SUCCESS:
      return Object.assign({}, state, {
        updateInsuredUserBegin: false,
        updateInsuredUserSuccess: true,
        updateIResultData: action.updateIResultData
      })
    case UPDATE_INSURED_USER_ERROR:
      return Object.assign({}, state, {
        updateInsuredUserBegin: false,
        updateInsuredUserError: true,
        errorMsg: action.errorMsg
      })
    case DELETE_INSURED_USER_BEGIN:
      return Object.assign({}, state, {
        deleteInsuredUserBegin: true
      })
    case DELETE_INSURED_USER_SUCCESS:
      return Object.assign({}, state, {
        deleteInsuredUserBegin: false,
        deleteInsuredUserSuccess: true,
        deleteIResultData: action.deleteIResultData
      })
    case DELETE_INSURED_USER_ERROR:
      return Object.assign({}, state, {
        deleteInsuredUserBegin: false,
        deleteInsuredUserError: true,
        errorMsg: action.errorMsg
      })
    case RESET_INSURED_USER:
      return defaultState
    default:
      return state
  }
}

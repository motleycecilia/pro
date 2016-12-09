import {
  GET_LOGIN_STATUS_BEGIN,
  GET_LOGIN_STATUS_SUCCESS,
  GET_LOGIN_STATUS_ERROR,
  RESET_LOGIN_STATUS
}
from 'constants/actionTypes'

const defaultState = {
  getLoginStatusBegin: false,
  getLoginStatusSuccess: false,
  getLoginStatusError: false
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
        getLoginStatusError: true
      })
    case RESET_LOGIN_STATUS:
      return defaultState
    default:
      return state
  }
}

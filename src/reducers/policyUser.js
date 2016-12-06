import {
  GET_POLICY_USER_BEGIN,
  GET_POLICY_USER_SUCCESS,
  GET_POLICY_USER_ERROR,
  UPDATE_POLICY_USER_BEGIN,
  UPDATE_POLICY_USER_SUCCESS,
  UPDATE_POLICY_USER_ERROR,
  RESET_POLICY_USER
}
from 'constants/actionTypes'

const defaultState = {
  getPolicyUserBegin: false,
  getPolicyUserSuccess: false,
  getPolicyUserError: false,
  updatePolicyUserBegin: false,
  updatePolicyUserSuccess: false,
  updatePolicyUserError: false
}

export default function policyUserInfo(state = defaultState, action) {
  switch(action.type){
    case GET_POLICY_USER_BEGIN:
    return Object.assign({}, state, {
      getPolicyUserBegin: true,
      getResultData: action.getResultData
    })
    case GET_POLICY_USER_SUCCESS:
      return Object.assign({}, state, {
        getPolicyUserBegin: false,
        getPolicyUserSuccess: true,
        getResultData: action.getResultData
      })
    case GET_POLICY_USER_ERROR:
      return Object.assign({}, state, {
        getPolicyUserBegin: false,
        getPolicyUserError: true
      })
    case UPDATE_POLICY_USER_BEGIN:
      return Object.assign({}, state, {
        updatePolicyUserBegin: true,
        getPolicyUserSuccess: false,
        getPolicyUserError: false
      })
    case UPDATE_POLICY_USER_SUCCESS:
      return Object.assign({}, state, {
        updatePolicyUserBegin: false,
        updatePolicyUserSuccess: true,
        updateResultData: action.updateResultData
      })
    case UPDATE_POLICY_USER_ERROR:
      return Object.assign({}, state, {
        updatePolicyUserBegin: false,
        updatePolicyUserError: true
      })
    case RESET_POLICY_USER:
      return defaultState
    default:
      return state
  }
}

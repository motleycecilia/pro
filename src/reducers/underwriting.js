import {
  GET_PRESUBMIT_BEGIN,
  GET_PRESUBMIT_SUCCESS,
  GET_PRESUBMIT_ERROR,
  RESET_PRESUBMIT
}
from 'constants/actionTypes'

const defaultState = {
  getPreSubmitBegin: false,
  getPreSubmitSuccess: false,
  getPreSubmitError: false
}

export default function underwriting(state = defaultState, action) {
  switch(action.type){
    case GET_PRESUBMIT_BEGIN:
      return Object.assign({}, state, {
        getPreSubmitBegin: true
      })
    case GET_PRESUBMIT_SUCCESS:
      return Object.assign({}, state, {
        getPreSubmitBegin: false,
        getPreSubmitSuccess: true,
        preResultData: action.preResultData
      })
    case GET_PRESUBMIT_ERROR:
      return Object.assign({}, state, {
        getPreSubmitBegin: false,
        getPreSubmitError: true
      })
    case RESET_PRESUBMIT:
      return defaultState
    default:
      return state
  }
}

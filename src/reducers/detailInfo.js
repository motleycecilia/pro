import {
  GET_DETAIL_BEGIN,
  GET_DETAIL_SUCCESS,
  GET_DETAIL_ERROR
}
from 'constants/actionTypes'

const defaultState = {
  getDetailBegin: false,
  getDetailSuccess: false,
  getDetailError: false
}

export default function detail(state = defaultState, action) {
  switch(action.type){
    case GET_DETAIL_BEGIN:
      return Object.assign({}, state, {
        getDetailBegin: true
      })
    case GET_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        getDetailBegin: false,
        getDetailSuccess: true,
        detail: action.resultData
      })
    case GET_DETAIL_ERROR:
      return Object.assign({}, state, {
        getDetailBegin: false,
        getDetailError: true,
        errorCode: action.errorCode,
        errorMsg: action.errorMsg
      })
    default:
      return state
  }
}

import {
  MEASURE_PREMIUM_BEGIN,
  MEASURE_PREMIUM_SUCCESS,
  MEASURE_PREMIUM_ERROR,
  RESET_MEASURE_PREMIUM
}
from 'constants/actionTypes'

const defaultState = {
  measurePremiumBegin: false,
  measurePremiumSuccess: false,
  measurePremiumError: false,
  measurePremiumReset: false
}

export default function premiumInfo(state = defaultState, action) {
  switch(action.type){
    case MEASURE_PREMIUM_BEGIN:
    return Object.assign({}, state, {
      measurePremiumBegin: true
    })
    case MEASURE_PREMIUM_SUCCESS:
      return Object.assign({}, state, {
        measurePremiumBegin: false,
        measurePremiumSuccess: true,
        premiumResultData: action.resultData
      })
    case MEASURE_PREMIUM_ERROR:
      return Object.assign({}, state, {
        measurePremiumBegin: false,
        measurePremiumError: true,
        errorMsg: action.errorMsg
      })
    case RESET_MEASURE_PREMIUM:
      return defaultState
    default:
      return state
  }
}

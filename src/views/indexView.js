import React from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import { queryDetilInfo, isLogin} from 'actions'
import Loading from 'components/loading'

@connect(
  state => ({
    detail: state.detail,
    loginInfo: state.loginInfo
  }),
  {
    queryDetilInfo,
    isLogin
  }
)

export default class indexView extends React.Component {

  state = {
    currentTapIndex: 0,
    contenInfoShow: false,
    planInfoCode: null,
    isLogin: false
  }

  componentWillMount(){
    this.props.queryDetilInfo()
  }

  componentWillReceiveProps(nextProps){
    const { detail ,loginInfo} = nextProps
    if (!!detail.getDetailSuccess && !!detail.detail) {
      this.setState({
        planInfoCode: detail.detail.priceList[0].insurancePriceId
      })
    }
    if(!!loginInfo.getLoginStatusSuccess === true){
      if(loginInfo.responseCode === '900002'){
        history.replaceState(null, '/about')//window.location.href = loginInfo.resJompUrl
      }else{
        history.pushState(null, '/about')
      }
    }
  }

  renderContent(detail) {
    return(
      <div>
        success
      </div>
    )
  }

  render() {
    const { detail } = this.props
    return (
      <div>
        { !detail.getDetailSuccess ? <Loading /> : this.renderContent(detail.detail) }
      </div>
    );
  }
}
export default indexView;

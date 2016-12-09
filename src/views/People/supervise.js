import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import {getInsuredUserInfo, resetInsuredUserInfo} from 'actions'
import beInsure from 'mock/beInsure'
import { App, YztApp } from 'utils/native_h5'


@connect(
  state => ({
    insured: state.insured
  }),
  {
    getInsuredUserInfo,
    resetInsuredUserInfo
  }
)


export default class supervise extends React.Component {
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
    this.props.getInsuredUserInfo('')
  }
  componentWillReceiveProps(nextProps) {
    const {insured} = nextProps
    if(insured.getIResultData && insured.getIResultData.responseCode === '900002') {
      this.context.router.push({
        pathname: '/login'
      })
      return
    }
  }
  componentWillUnmount() {
    this.props.resetInsuredUserInfo()
  }
  onClickBack() {
    history.go(-1)
  }

  onClickEditInsurant(id) {
    this.context.router.push({
      pathname: '/bePeople',
      query: { operation: 1, ide: id }
    })
  }

  onclickAddInsured() {
    this.context.router.push({
      pathname: '/bePeople',
      query: { operation: 0 }
    })
  }

  onclickBcakFilmation() {
    const filmaPara = JSON.parse(sessionStorage.getItem('filmaPara'))
    this.context.router.push({
      pathname: '/fillMation',
      query: {
        productId: filmaPara.productId,
        insurancePriod: filmaPara.insurancePriod,
        insurancePriodUnit: filmaPara.insurancePriodUnit,
        productCode: filmaPara.productCode,
        skuId: filmaPara.skuId,
        productInsuranceCode: filmaPara.productInsuranceCode,
        annualPremium: filmaPara.annualPremium
      }
    })
  }

  renderInsuredList(insuredResponse) {
    return(
      insuredResponse.map((val,index) => {
        return(
          <div className="col-line" key={index} onTouchTap={this.onClickEditInsurant.bind(this, val.id)}>
            <span>{val.insurantName}</span>
            <span className="icon-right"></span>
          </div>
        )
      })
    )
  }

  renderContent(insuredResponse) {
    return(
      <div>
        <div className="tagging bd-top-y">
          被投保人
        </div>
        <div className="bg-fff">
          {
            this.renderInsuredList(insuredResponse)
          }
        </div>
        <div className="m-tb24">
          <div className="incomplete-fill-btn" onTouchTap={this.onclickAddInsured.bind(this)}>
            添加被保人
          </div>
        </div>
        <div className="m-tb24">
          <div className="incomplete-fill-btn" onTouchTap={this.onclickBcakFilmation.bind(this)}>
            返回保单填写页
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { title } = this.props.route
    const { insured } = this.props
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        {
          insured.getInsuredUserBegin ?
          <Loading /> :
          insured.getIResultData && !!insured.getIResultData.responseData ?
          this.renderContent(insured.getIResultData.responseData) :
          "系统异常请稍后重试"
        }
      </div>
    )
  }
}
export default supervise

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import { queryDetilInfo, isLogin, resetLogin, AppUserLogin} from 'actions'
import Loading from 'components/loading'
import util from 'utils/utils'
import Header from 'components/Header'
import termUnit from 'utils/termUnit'
import {getUrlParam} from 'utils/urlParams'
import detailJSON from 'resJSON/detailJSON'
import { App, YztApp } from 'utils/native_h5'

@connect(
  state => ({
    detail: state.detail,
    loginInfo: state.loginInfo
  }),
  {
    queryDetilInfo,
    isLogin,
    resetLogin,
    AppUserLogin
  }
)
export default class testView extends React.Component {

  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  state = {
    currentTapIndex: 0,
    isClick: false,
    productId: '',
    skuId: '',
    productInsuranceCode: '',
    annualPremium: '',
    takeEffectDate: '',
    dtype: '0'
  }

  componentWillMount(){
    let productId = getUrlParam('productId')
    this.setState({
      productId: '10015720'//productId
    })
    this.props.queryDetilInfo(10015720)//productId
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    this.setState({
      takeEffectDate: this.props.location.query.date
    })
    YztApp.setTitle(this.props.route.title)
  }

  componentWillUnmount() {
    this.props.resetLogin()
  }

  componentDidMount() {
    // let getEle = document.querySelector.bind(document)
    // this.setState({
    //   takeEffectDate: util.getEndDate(getEle('#sysDate').value, 1, 'D')
    // })
  }

  onClickBack() {
    if (App.isNative) {//显示关闭
      if (App.IS_IOS) {
        App.oldVersion.call('paone://jsCloseAndRefresh')
      }
      if (App.IS_ANDROID) {
        App.call(['closeWebAndRefresh'], null, null, { needRefresh: 'true' })
      }
      return
    }
    //window.location.href = 'http://m.pingan.com/c3/chaoshi/index.shtml'
  }

  onChangeTakeEffectDate(e) {
    let eValue = e.target.value
    this.setState({
      endDate: util.getEndDate(eValue, -1, 'D', true),
      takeEffectDate: eValue
    })
  }

  onFocusDate(e) {
    e.target.type = "date"
  }

  componentWillReceiveProps(nextProps) {
    let {date} = this.refs
    if(!!date) {
      date.type = 'date'
    }
    const { detail ,loginInfo} = nextProps
    if(detail.getDetailSuccess === true && detail.detail.responseCode === '000000' && detail.detail.responseData && this.state.currentTapIndex === 0) {
      YztApp.setTitle(detail.detail.responseData.productName)
      this.setState({
        skuId: detail.detail.responseData.priceList[0].skuId,
        productInsuranceCode: detail.detail.responseData.priceList[0].productInsuranceCode,
        annualPremium: detail.detail.responseData.priceList[0].pricePremium,
        dtype: '1'
      })
    }
    if(loginInfo.appLoginSuccess === true){
      const detalData = detail.detail.responseData
      this.context.router.push({
        pathname: '/fillMation',
        query: {
          productId: this.state.productId,
          insurancePriod: detalData.insurancePriod,
          insurancePriodUnit: detalData.insurancePriodUnit,
          productCode: detalData.productCode,
          skuId: this.state.skuId,
          productInsuranceCode: this.state.productInsuranceCode,
          annualPremium: this.state.annualPremium
        }
      })
    }
    if(loginInfo.appLoginError === true) {
      if(loginInfo.errorCode === '90002') {//APP未登录
        YztApp.accessNativeModule('patoa://pingan.com/login', () => {
        })
      }
      // alert('系统异常')
    }
    if(loginInfo.getLoginStatusSuccess === true && this.state.isClick === true){
      sessionStorage.setItem('ageSection', '1-30')
      if(loginInfo.responseCode === '900002') {
        if(!App.IS_YZT) {
          // const domain = location.protocol+'//'+location.host+'/chaoshi/'
          const domain = 'https://pa18-wapmall-dmzstg1.pingan.com.cn:53443/chaoshi/';
          const jomp = domain+'wap/login.do?appid=10183&ptag=';
          window.location.href = jomp + domain + 'chanxian/index.shtml?productId='+getUrlParam('productId')
        }else {
          YztApp.accessNativeModule('patoa://pingan.com/login', () => {
          })
        }
      }else{
        const detalData = detail.detail.responseData
        this.context.router.push({
          pathname: '/fillMation',
          query: {
            productId: this.state.productId,
            insurancePriod: detalData.insurancePriod,
            insurancePriodUnit: detalData.insurancePriodUnit,
            productCode: detalData.productCode,
            skuId: this.state.skuId,
            productInsuranceCode: this.state.productInsuranceCode,
            annualPremium: this.state.annualPremium
          }
        })
        this.setState({
          isClick: false
        })
      }
    }
  }
  componentWillUnmount() {
    this.props.resetLogin()
  }

  renderContent() {
    return(
      <div>
        <input
          ref="date"
          type={this.dtype === '0' ? "text" : "date"}
          className="input-style"
          id="takeEffectDate"
          value={this.state.takeEffectDate}
          onChange={this.onChangeTakeEffectDate.bind(this)}
        />
      </div>
    )
  }

  render() {
    const { detail } = this.props
    return (
      <div className="bg-fff">
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)}
          title={
            detail.getDetailSuccess && detail.detail.responseCode === '000000' && detail.detail.responseData ? detail.detail.responseData.productName :
            "详情"
          }/>
        {
          detail.getDetailBegin ?
          <Loading /> :
          detail.getDetailSuccess && detail.detail.responseCode === '000000' && detail.detail.responseData ? this.renderContent(detail.detail.responseData) :
          "系统异常"
        }
      </div>
    );
  }
}
export default testView;

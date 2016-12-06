import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import BtnLoading from 'components/btnLoading'
import { queryDetilInfo, isLogin, resetLogin, AppUserLogin, getUpdateInfo, resetUpdataInfo} from 'actions'
import Loading from 'components/loading'
import * as api from 'api'
import Header from 'components/Header'
import termUnit from 'utils/termUnit'
import {getUrlParam} from 'utils/urlParams'
import detailJSON from 'resJSON/detailJSON'
import Modal from 'components/modal'
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
    AppUserLogin,
    getUpdateInfo,
    resetUpdataInfo
  }
)

export default class detailView extends React.Component {

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
    securtiIdx: '',
    showPayErrorModal: false,
    payErrorMessage: '',
    btnLoding: false
  }

  componentWillMount(){
    let productId = getUrlParam('productId')
    // if(location.protocol === "http:"){
    //   window.location.href = "https://"+location.host.replace("5380","53443")+"/chaoshi/chanxian/index.shtml?productId=" + productId
    // }
    this.setState({
      productId: '10015720'//this.props.location.query.productId
    })
    this.props.queryDetilInfo(10015720)//productId
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }

  componentWillUnmount() {
    this.props.resetLogin()
    this.props.resetUpdataInfo()
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

  onClickTag(index, cannualPremium, cskuId, cproductInsuranceCode) {
    this.setState({
      currentTapIndex: index,
      skuId: cskuId,
      productInsuranceCode: cproductInsuranceCode,
      securtiIdx: '',
      annualPremium: cannualPremium
    })
    console.log(this.state.annualPremium)
  }

  onClickNowInsure() {
    // this.setState({
    //   isClick: true
    // })
    // this.props.isLogin()
    this.props.getUpdateInfo()
    // this.props.AppUserLogin()
    return
    if(App.IS_YZT) {
      this.props.AppUserLogin()
    }else {
      this.props.isLogin()
      this.setState({
        isClick: true
      })
    }
  }

  onClickGuarantee(category) {
    this.context.router.push({
      pathname: '/guarantee',
      query: {
        productId: this.state.productId,
        category: category
      }
    })
  }

  onClickCount(index) {
    this.setState({
      securtiIdx: this.state.securtiIdx === index ? '' : index
    })
  }
  cancelPayErrorModal() {
    this.setState({
      showPayErrorModal: false,
      payErrorMessage: ''
    })
    this.props.resetUpdataInfo()
  }
  componentWillReceiveProps(nextProps){
    const { detail ,loginInfo} = nextProps
    if(detail.getDetailSuccess === true && detail.detail.responseCode === '000000' && detail.detail.responseData && this.state.currentTapIndex === 0) {
      YztApp.setTitle(detail.detail.responseData.productName)
      this.setState({
        skuId: detail.detail.responseData.priceList[0].skuId,
        productInsuranceCode: detail.detail.responseData.priceList[0].productInsuranceCode,
        annualPremium: detail.detail.responseData.priceList[0].pricePremium
      })
      sessionStorage.setItem('productId', getUrlParam('productId'))
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
      return
    }
    if (loginInfo.getUpDataInfoBegin) {
      this.setState({
        isClick: false,
        btnLoding: true
      })
    }
    if (loginInfo.getUpDataInfoSuccess) {
      this.setState({
        btnLoding: false
      })
      const detalData = detail.detail.responseData
      const filmaPara = {
        productId: this.state.productId,
        insurancePriod: detalData.insurancePriod,
        insurancePriodUnit: detalData.insurancePriodUnit,
        productCode: detalData.productCode,
        skuId: this.state.skuId,
        productInsuranceCode: this.state.productInsuranceCode,
        annualPremium: this.state.annualPremium
      }
      sessionStorage.setItem('filmaPara', JSON.stringify(filmaPara))
      if(!App.isNative){
          sessionStorage.setItem('sso',JSON.stringify({ssoTicket:loginInfo.upDataInfo.SSOTicket,
              timestamp:loginInfo.upDataInfo.timestamp,
              sign:loginInfo.upDataInfo.signature}))
      }
      sessionStorage.setItem('clientNo',loginInfo.upDataInfo.clientNo);
      let urlMap = api.getUpdateUrl(),
          symbol = loginInfo.upDataInfo?loginInfo.upDataInfo.targetURLSymbol:'';
      if(symbol && urlMap[symbol]){//跳转升级
          let {origin,pathname,hash,href,search} = location;
          let pre  = encodeURIComponent(`${href}`),
              next = encodeURIComponent(`${origin}${pathname}${search}&updated=true${hash}`);
          location.href = urlMap[symbol]+`?preLink=${pre}&nextLink=${encodeURIComponent(next)}`
      }
      if(symbol && symbol==='04'){//查询是否满足18岁
        this.context.router.push({
          pathname: '/welding'
        })
      }
    }
    if (loginInfo.getUpDataInfoFail) {
      this.setState({
        isClick: true,
        showPayErrorModal: true,
        btnLoding: false,
        payErrorMessage: loginInfo.errorMsg
      })
    }
  }

  renderTagList(priceList) {
    return(
      priceList.map((val, index) => {
        return(
          <div key={ index }
            onClick={this.onClickTag.bind(this, index, val.pricePremium, val.skuId, val.productInsuranceCode)} className={this.state.currentTapIndex === index ? "col-tab col-tab-chose" : "col-tab"}>
            <p className="p-b6">
              {val.priceName}
            </p>
            <p className="p-b12">
              {val.pricePremium}元
            </p>
          </div>
        )
      })
    )
  }

  renderGuaranteeContent(planList) {
    return(
      planList.map((val, index) => {
        return(
          <div className="col-bd" key={index}>
            <div
              className={this.state.securtiIdx === index ? "col-line-nbd count-up" : "col-line-nbd"} onTouchTap={this.onClickCount.bind(this, index)}>
              <span className="detail-proname">
                {val.securityProName}
              </span>
              <span className="detail-money">
                {val.securityProAssuredSum}
              </span>
            </div>
            <div className={this.state.securtiIdx === index ? "content-list-text" : "content-list-text hide"}>
              {val.securityProInstruction}
            </div>
          </div>
        )
      })
    )
  }

  renderContent(detail) {
    return(
      <div>
        <div className="detail-banner">
          <img src="http://m.pingan.com/app_images/wap/v30/c3/chaoshi/sys/baoxian/jiaotongzongheyiwai_banner.jpg"/>
          <span className="hide">{detail.productbannerUrl}</span>
        </div>
        <div className="detail-describe">
          {detail.productIntroduce}
        </div>
        <section className="bg-f5f5f5">
          <div className="tabs">
            {this.renderTagList(detail.priceList)}
          </div>
        </section>
        <div className="col-line">
          <span>适用人群</span>
          <span className="col-9b9b9b">
            {

            }
          </span>
        </div>
        <div className="col-line">
          <span>保障期限</span>
          <span className="col-9b9b9b">
            {detail.insurancePriod}
            {termUnit[detail.insurancePriodUnit]}
          </span>
        </div>
        <div className="tagging">
          保障内容
        </div>
        {
          this.renderGuaranteeContent(detail.priceList[this.state.currentTapIndex].planList)
        }
        <div className="tagging">
          其他
        </div>
        <div className="col-line" onTouchTap={this.onClickGuarantee.bind(this, 1)}>
          <span>投保人声明</span>
          <span className="icon-right"></span>
        </div>
        <div className="col-line" onTouchTap={this.onClickGuarantee.bind(this, 2)}>
          <span>保险条款</span>
          <span className="icon-right"></span>
        </div>
        <div className="col-line" onTouchTap={this.onClickGuarantee.bind(this, 3)}>
          <span>常见问题</span>
          <span className="icon-right"></span>
        </div>
        <div className="col-line m-b70" onTouchTap={this.onClickGuarantee.bind(this, 4)}>
          <span>理赔指南</span>
          <span className="icon-right"></span>
        </div>
        {
          this.state.btnLoding ? <BtnLoading /> : <div className="complete-fill-btn" onTouchTap={this.onClickNowInsure.bind(this)}>
            马上投保
          </div>
        }

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
        {
          this.state.showPayErrorModal &&
            <Modal
              mutil="true"
              title="提示"
              content={this.state.payErrorMessage}
              goto={this.cancelPayErrorModal.bind(this)}
            />
        }
      </div>
    );
  }
}
export default detailView;

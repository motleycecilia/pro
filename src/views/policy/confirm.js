import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {confirmation} from 'actions'
import TYpes from 'utils/TYpes'
import Loading from 'components/loading'
import Header from 'components/Header'
import { App, YztApp } from 'utils/native_h5'

@connect(
  state => ({
    detail: state.detail
  }),
  {
    confirmation
  }
)


export default class confirmView extends React.Component {

  state = {
    isAgree: false,
    errorInfo: ''
  }

  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    console.log(this.props.location.query.orderNo)
    YztApp.setTitle(this.props.route.title)
    this.props.confirmation(this.props.location.query.orderNo)
  }
  onClickBack() {
    history.go(-1)
  }

  onClickisAgree() {
    this.setState({
      isAgree: !this.state.isAgree
    })
  }
  onClickNowPay() {
    if(this.state.isAgree === false) {
      this.setState({
        errorInfo: '请同意投保声明'
      })
      return
    }
    window.location.href = `https://pa18-wapmall-dmzstg1.pingan.com.cn:53443/chaoshi/payPre/life/index.shtml?orderNo=${this.props.location.query.orderNo}&payOrderNo=${this.props.location.query.payOrderNo}&from=wap-chaoshi&channel=1982&channelSecond=1982003&platId=999202&userId=277121462956038738&payClassify=23&hook=/chanxian/order.shtml`
  }

  renderPlanList(planList) {
    return(
      planList.map((val, index) =>{
        return(
          <div className="col-line" key={index}>
            <span>{val.securityProName}</span>
            <span className="col-9b9b9b">{val.sumIns}</span>
          </div>
        )
      })
    )
  }

  renderContent(detail) {
    return(
      <div>
        <div className="tagging bd-top-y">
          保障期限
        </div>
        <section>
          <div className="col-line">
            <span>保险生效时间</span>
            <span className="col-9b9b9b">
              {detail.effectiveDate}
            </span>
          </div>
          <div className="col-line">
            <span>保险结束时间</span>
            <span className="col-9b9b9b">
              {detail.datePolicyEnd}
            </span>
          </div>
        </section>
        <section>
          <div className="tagging">
            投保人信息
          </div>
          <div className="col-line">
            <span>姓名</span>
            <span className="col-9b9b9b">
              {detail.applicantName}
            </span>
          </div>
          <div className="col-line">
            <span>身份证号</span>
            <span className="col-9b9b9b">
              {detail.applicantCardNo}
            </span>
          </div>
          <div className="col-line">
            <span>手机号</span>
            <span className="col-9b9b9b">
              {detail.applicantMobile}
            </span>
          </div>
        </section>
        <section>
          <div className="tagging">
            被保人信息
          </div>
          <div className="col-line">
            <span>姓名</span>
            <span className="col-9b9b9b">
              {detail.recogNizeeList[0].recogNizeeName}
            </span>
          </div>
          <div className="col-line">
            <span>证件类型</span>
            <span className="col-9b9b9b">
              {TYpes.cardType[detail.recogNizeeList[0].recogNizeeCardType]}
            </span>
          </div>
          <div className="col-line">
            <span>证件号码</span>
            <span className="col-9b9b9b">
              {detail.recogNizeeList[0].recogNizeeCardNo}
            </span>
          </div>
          <div className="col-line">
            <span>手机号</span>
            <span className="col-9b9b9b">
              {detail.recogNizeeList[0].recogNizeeMobile || ""}
            </span>
          </div>
          <div className="col-line">
            <span>出生日期</span>
            <span className="col-9b9b9b">
              {detail.recogNizeeList[0].recogNizeeBirth}
            </span>
          </div>
          <div className="col-line">
            <span>性别</span>
            <span className="col-9b9b9b">
              {TYpes.sex[detail.recogNizeeList[0].recogNizeeSex]}
            </span>
          </div>
          <div className="col-line">
            <span>与投保人关系</span>
            <span className="col-9b9b9b">
              {TYpes.relation[detail.recogNizeeList[0].relation]}
            </span>
          </div>
        </section>
        <section>
          <div className="tagging">
            保障内容
          </div>
          {
            // this.renderPlanList(detail.recogNizeeList[0].planList)
          }
        </section>
        <div className="bg-f5f5f5">
          <div className="confim-btom-statement">
            <input type="checkbox" className="ipt-checkbox" id="cbx-1"/>
            <label className="lab-checkbox" htmlFor="cbx-1" onTouchTap={this.onClickisAgree.bind(this)}></label>
            <span className="m-l7">我已阅读并同意<span className="col-558dd7">《投保声明》</span></span>
          </div>
          <div className="confim-error">
            {this.state.errorInfo}
          </div>
          <div className="incomplete-fill-btn m-b20" onTouchTap={this.onClickNowPay.bind(this)}>
            立即支付
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { title } = this.props.route
    const { detail } = this.props
    return (
      <div className="bg-fff">
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        { detail.getConfirmationBegin === true ?
          <Loading /> :
          detail.getConfirmationSuccess === true && detail.confirmDetailResData.responseCode === '000000' ?
          this.renderContent(detail.confirmDetailResData.responseData) :
          "系统异常请稍后重试"
        }
      </div>
    )
  }
}
export default confirmView;

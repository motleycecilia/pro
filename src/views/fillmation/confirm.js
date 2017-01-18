import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import { App, YztApp } from 'utils/native_h5'


export default class confirm extends React.Component {
  state = {
    showConfirmPolicy: false,
    ConfirmBepoleIndex: -1,
    ConfirmGuaranteeIndex: -1
  }

  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }
  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle("保单信息确认")
  }
  onClickBack() {
    history.go(-1)
  }
  onClickConfimPolicy() {
    this.setState({
      showConfirmPolicy: !this.state.showConfirmPolicy
    })
  }
  onClickPay() {
    const sso = sessionStorage.getItem('sso')
    window.location.href = `http://jkkit-cashier-stg1.pingan.com.cn:20380/cashier-web/main/login.shtml?channel=1982
    &channelSecond=1982003
    &platId=999201007
    &payClassify=13
    &orderNo=${orderNo}
    &payOrderNo=${payOrderNo}
    &ssoTicket=${sso.ssoTicket}
    &timestamp=${sso.timestamp}
    &sign=${sso.sign}
    &digest=
    &hook=111111
    &from=wap-chaoshi
    &productSide=&customid`
  }
  onClickConfirmBepole(index) {
    this.setState({
      ConfirmBepoleIndex: index === this.state.ConfirmBepoleIndex ? -1 : index
    })
  }
  onClickConfirmGuarantee(index) {
    this.setState({
      ConfirmGuaranteeIndex: index === this.state.ConfirmGuaranteeIndex ? -1 : index
    })
  }
  renderGuarantee(planList) {
    return(
      [0, 1, 2].map((val, index) => {
        return(
          <li key={index}>
            <a href="javascript: void(0);" className="arrow-down showInfo" onTouchTap={this.onClickConfirmGuarantee.bind(this, index)}>
              <div className="content-list-title">
                <span className="project-name">文件佛教</span>
                <span className="money">我懂你今晚都</span>
              </div>
            </a>
            <div className={index === this.state.ConfirmGuaranteeIndex ? "content-list-text" : "content-list-text hide"}>
              <p>
                发未分配文件访贫问苦
              </p>
            </div>
          </li>
        )
      })
    )
  }
  renderConfirmbePeople() {
    return(
      [0, 1].map((val, index) => {
        return(
          <div className="confirm-center-contents" key={index}>
            <div className="center-content">
              <div className="col-line-fillmation" onTouchTap={this.onClickConfirmBepole.bind(this, index)}>
                <span>为范围</span>
                <span className="col-line-cr txt-through"></span>
                <span className={this.state.ConfirmBepoleIndex === index ? "icon-max-up" : "icon-max-down"}></span>
              </div>
              <div className={this.state.ConfirmBepoleIndex === index ? "" : "hide"}>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    身份证号
                  </span>
                  <span className="fill-content-txt">
                    271829328728920937
                  </span>
                </div>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    手机号码
                  </span>
                  <span className="fill-content-txt">
                    13212312322
                  </span>
                </div>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    生日
                  </span>
                  <span className="fill-content-txt">
                    1990-01-21
                  </span>
                </div>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    与投保人关系
                  </span>
                  <span className="fill-content-txt">
                    本人
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })
    )
  }
  render() {
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title="保单信息确认"/>
        <div className="fillbox">
          <div className="product-intro white-bg">
            <div className="p-l-10">
              <dl>
                <dt>保险名称</dt>
                <dd>女性关爱保险</dd>
              </dl>
            </div>
            <div className="p-l-10">
              <dl>
                <dt>旅行目的地</dt>
                <dd>🇮🇹、🇵🇱、🇬🇷、🇦🇺</dd>
              </dl>
            </div>
            <div className="p-l-10">
              <dl>
                <dt>套餐类型</dt>
                <dd>全面型</dd>
              </dl>
            </div>
            <div className="confirm-top-date">
              <div className="confirm-date-tit">
                保障时间
              </div>
              <div className="confirm-date-dates">
                <p>2016-12-06零时起</p>
                <p>2017-12-06二十四时止</p>
              </div>
            </div>
          </div>
          <div className="confirm-center-tit">
            投保人
          </div>
          <div className="confirm-center-contents">
            <div className="center-content">
              <div className="col-line-fillmation" onTouchTap={::this.onClickConfimPolicy}>
                <span>例如风</span>
                <span className={this.state.showConfirmPolicy ? "icon-max-up" : "icon-max-down"}></span>
              </div>
              <div className={this.state.showConfirmPolicy ? "" : "hide"}>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    身份证号
                  </span>
                  <span className="fill-content-txt">
                    271829328728920937
                  </span>
                </div>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    手机号码
                  </span>
                  <span className="fill-content-txt">
                    13212312322
                  </span>
                </div>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    电子邮箱
                  </span>
                  <span className="fill-content-txt">
                    298fwf@23.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="confirm-center-tit">
            被保人
          </div>
            {
              this.renderConfirmbePeople()
            }
          <div className="content white-bg m-t10">
            <div className="content-title">保障范围</div>
            <div className="content-list content0">
              <ul>
                {
                  this.renderGuarantee()
                }
              </ul>
            </div>
            <div className="bottom-line"></div>
          </div>
          <div className="confirm-pre-money">
            保单测算金额： <span className="txt-through">￥234234.00</span>
          </div>
          <div className="confirm-fill-money">
            实际保额: ￥3000.00
          </div>
          <div className="complete-fill-btn" onTouchTap={::this.onClickPay}>
            立即支付
          </div>
        </div>
      </div>
    )
  }
}
export default confirm

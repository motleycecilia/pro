import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import { App, YztApp } from 'utils/native_h5'


export default class confirm extends React.Component {
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
              <div className="col-line-fillmation">
                <span>left</span>
                <span className="col-line-cr">left</span>
                <span className="icon-max-right"></span>
              </div>
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
      </div>
    )
  }
}
export default confirm

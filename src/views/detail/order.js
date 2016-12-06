import React from 'react'
import Header from 'components/Header'
import { createChecker } from 'utils/checker'
import { App, YztApp } from 'utils/native_h5'

export default class order extends React.Component {


  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  onClickBack() {
    history.go(-1)
  }

  render() {
    const { title } = this.props.route
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        <section className="bg-fff">
          <div className="col-line">
            <span>保险名称</span>
            <span className="col-9b9b9b f-s14">right</span>
          </div>
          <div className="col-line">
            <span>订单金额</span>
            <span className="col-9b9b9b f-s14">right</span>
          </div>
          <div className="col-line">
            <span>订单状态</span>
            <span className="col-9b9b9b f-s14">right</span>
          </div>
          <div className="col-line">
            <span>订单编号</span>
            <span className="col-9b9b9b f-s14">right</span>
          </div>
          <div className="col-line">
            <span>生效日期</span>
            <span className="col-9b9b9b f-s14">right</span>
          </div>
          <div className="col-line">
            <span>保障期限</span>
            <span className="col-9b9b9b f-s14">right</span>
          </div>
          <div className="col-line">
            <span>被保人姓名</span>
            <span className="col-9b9b9b f-s14">right</span>
          </div>
        </section>
        <div className="m-t24">
          <div className="incomplete-fill-btn">
            确定
          </div>
        </div>
      </div>
    )
  }
}
export default order

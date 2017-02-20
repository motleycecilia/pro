import React from 'react'
import Header from 'components/Header'
import { App, YztApp } from 'utils/native_h5'

export default class loginView extends React.Component {

  state = {
    errorPhone: '',
  }

  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  onClickBack() {
    let preMiumPara = JSON.parse(sessionStorage.getItem('prePara'))
    location.href=`https://test-toa-web-h5-stg1.pingan.com.cn:34943/yizhangtong/static/finance/ylx3/index.html?productCode=${preMiumPara.productCode}&productId=${preMiumPara.productId}`
  }

  render() {
    const { title } = this.props.route
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        <div className="login-err">
          登录超时请点击<span className="no-login-back" onTouchTap={::this.onClickBack}>返回</span>重新从详情页登录
        </div>
      </div>
    )
  }
}
export default loginView

import React from 'react'
import Header from 'components/Header'
import { createChecker } from 'utils/checker'
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
    history.go(-1)
  }


  render() {
    const { title } = this.props.route
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        <div className="login-err">
          会话失效请点击<a href={"http://m.pingan.com/chaoshi/fenlei.shtml?productId="+11312312}>返回详情页</a>重新从详情页登录
        </div>
      </div>
    )
  }
}
export default loginView

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Loading from 'components/loading'
import Headert from 'components/Headert'
import { App, YztApp } from 'utils/native_h5'

export default class healthInform extends React.Component {
  state = {
    showDialog: false
  }

  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
  }
  onClickBack() {
    history.go(-1)
  }
  onClickWOEDialog(flag) {
    this.setState({
      showDialog: flag
    })
  }
  render() {
    const { title } = this.props.route
    return (
      <div className="bg-fff">
        <Headert isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)}
          title={title}/>
          <div className="guarantee-content">
            健康告知健康告知健康告知健康告知健康告知健康告知健康告知健康告知
          </div>
          <div className="heath-buttons">
            <a className="heath-btn heath-btn-sub" href="javascript:void(0);">
              我没有上述情况
            </a>
            <div className="heath-btn heath-btn-n" href="javascript:void(0);" onTouchTap={this.onClickWOEDialog.bind(this, true)}>
              我有上述情况
            </div>
          </div>
          <div className={this.state.showDialog ? "mask" : "mask hide"}>
          </div>
          <div className={this.state.showDialog ? "pop-heath-bottom dialog-btns dialog-btns-show" : "pop-heath-bottom"}>
            <div className="pop-top-font">
              该保险产品可能无法向您提供保障
            </div>
            <div className="pop-top-font">
              建议选择其他保险产品
            </div>
            <a className="pop-center-button m-tb18" href="javascript:void(0);" onTouchTap={this.onClickWOEDialog.bind(this, false)}>
              返回
            </a>
            <a className="pop-center-button m-tb6" href="javascript:void(0);" onTouchTap={this.onClickBack.bind(this)}>
              不买了
            </a>
          </div>
      </div>
    )
  }
}
export default healthInform

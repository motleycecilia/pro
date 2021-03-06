import {connect} from 'react-redux'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Loading from 'components/loading'
import Headert from 'components/Headert'
import { App, YztApp } from 'utils/native_h5'
import { queryDetilInfo } from 'actions'

@connect(
  state => ({
    detailInfo: state.detailInfo
  }),
  {
    queryDetilInfo
  }
)
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
    this.props.queryDetilInfo(this.props.location.query.productId)
  }
  onClickBack() {
    history.go(-1)
  }
  onClickWOEDialog(flag) {
    this.setState({
      showDialog: flag
    })
  }
  onClickNextPage() {
    this.context.router.push({
      pathname: '/premium',
      query: {
        productId: this.props.location.query.productId,
        productCode: this.props.location.query.productCode,
        skuId: this.props.location.query.skuId,
        productInsuranceCode: this.props.location.query.productInsuranceCode
      }
    })
  }
  renderContent(title, detailInfo) {
    return(
      <div className="bg-fff">
        <Headert isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)}
          title={title}/>
        <div className="guarantee-content">
          {
            detailInfo.captionDoc || "暂无健康告知"
          }
        </div>
        <div className="heath-buttons">
          <a className="heath-btn heath-btn-sub" href="javascript:void(0);" onTouchTap={this.onClickNextPage.bind(this)}>
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
  render() {
    const { title } = this.props.route
    const { detailInfo } = this.props
    return (
      <div>
        {
          detailInfo.getDetailSuccess === true ? this.renderContent(title, detailInfo.detail) : <Loading />
        }
      </div>
    )
  }
}
export default healthInform

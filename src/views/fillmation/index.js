import React, { PropTypes } from 'react'
import Header from 'components/Header'
import { App, YztApp } from 'utils/native_h5'

export default class fillmation extends React.Component {
  state = {
    iphoneChoseBtn: false
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
  onClickChoseBtn() {
    this.setState({
      iphoneChoseBtn: !this.state.iphoneChoseBtn
    })
  }

  render() {
    const { title } = this.props.route
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
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
                <dt>套餐类型</dt>
                <dd>全面型</dd>
              </dl>
            </div>
            <div className="p-l-10">
              <dl>
                <dt>受益人</dt>
                <dd>法定受益人</dd>
              </dl>
            </div>
          </div>
          <div className="row-box white-bg m-t10">
            <div className="row-box-list">
              <div className="row-box-list-title">
                <div className="name">投保人</div>
              </div>
            </div>
            <div className="row-box-list">
              <div className="row-box-list-title router-action1">
                <div className="name col-name">李平安</div>
                <span className="arrowbox arrow-right"></span>
              </div>
            </div>
          </div>
          <section>
            <div className="p-l-10 m-t10 fillmation-l-center">
              <div className="col-line-threee col-no-bd">
                <span>被保险人</span>
                <div className="btn-add-icon" >
                  <span className="add-icon-imgs"></span>
                  <span className="add-icon-txt">编辑</span>
                </div>
              </div>
              <div className="col-line-threeetbd">
                <div className="col-line-with">
                  <span className="delete-icon-btn m-l3">
                  </span>
                  李平安
                </div>
                <span className="icon-max-right"></span>
              </div>
              <div className="col-line-threeetbd">
                <div className="col-line-with">
                  <span className="delete-icon-btn m-l3">
                  </span>
                  李平安
                </div>
                <span className="icon-max-right"></span>
              </div>
            </div>
          </section>
          <div className="fill-describe">
            *被保险人必须为本人、配偶或直系亲属
          </div>
          <div className="invoice-info">
            <span>需要发票</span>
              <section>
                <div className={this.state.iphoneChoseBtn ? "iphone-chose bg-3399ff bd-col-3399ff" : "iphone-chose"} onTouchTap={this.onClickChoseBtn.bind(this)}>
                  <div className={this.state.iphoneChoseBtn ? "iphone-nochose-btn iphone-chose-btn" : "iphone-nochose-btn"}></div>
                </div>
              </section>
          </div>
          <div className="col-line-threee p-lr-13">
            <span>李成功</span>
            <span className="col-line-cr col-line-rtxt">补全信息</span>
            <span className="icon-max-right"></span>
          </div>
          <div className="fill-statement">
            <div className="m-r10">
              <input type="checkbox" className="ipt-checkbox" id="cbx-2"/>
              <label className="lab-checkbox2" htmlFor="cbx-2"></label>
            </div>
            同意授权声明并通过用户投保
          </div>
        </div>
        <div className="complete-fill-btn">确定</div>
      </div>
    )
  }
}
export default fillmation

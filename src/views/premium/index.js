import React, { PropTypes } from 'react'
import Header from 'components/Header'
import { App, YztApp } from 'utils/native_h5'

export default class premium extends React.Component {
  state = {
    chose: false
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
  onClickChoseOption() {
    this.setState({
      chose: !this.state.chose
    })
  }

  render() {
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title="保费测算"/>
        <div className="premium-waner">
          {/*header*/}
          <div className="pre-header-line">
            <span className="pre-header-txt">
              旅游目的地
            </span>
            <div className="btn-add-icon pre-header-btn">
                <span className="add-icon-imgs"></span>
                <span className="add-icon-txt">添加</span>
            </div>
          </div>
          <div className="pre-col-citys">
            <div className="col-line-with pre-col-city">
              <span className="delete-icon-btn m-l3">
              </span>
              李平安
            </div>
            <div className="col-line-with pre-col-city">
              <span className="delete-icon-btn m-l3">
              </span>
              李平安
            </div>
            <div className="col-line-with pre-col-city">
              <span className="delete-icon-btn m-l3">
              </span>
              李平安
            </div>
            <div className="col-line-with pre-col-city">
              <span className="delete-icon-btn m-l3">
              </span>
              李平安
            </div>
            <div className="col-line-with pre-col-city">
              <span className="delete-icon-btn m-l3">
              </span>
              李平安
            </div>
            <div className="clear"></div>
          </div>
          {/* header*/}
          {/*套餐类型*/}
          <div className="pre-center-package">
            <p>旅游类型</p>
            <div className="col-line-for m-t24">
              <div>
                经济型
                <p className="m-t8">
                  ￥84起
                </p>
              </div>
              <div className={this.state.chose ? "lab-checkbox-contain lab-contain-chose" : "lab-checkbox-contain"}>
                <span className="lab-checkbox-2" htmlFor="cbx-3" onTouchTap={this.onClickChoseOption.bind(this)}></span>
                <span className="checbox-chose"></span>
              </div>
            </div>
            <div className="col-line-for m-t24">
              <div>
                经济型
                <p className="m-t8">
                  ￥84起
                </p>
              </div>
              <div className={this.state.chose ? "lab-checkbox-contain lab-contain-chose" : "lab-checkbox-contain"}>
                <span className="lab-checkbox-2" htmlFor="cbx-3" onTouchTap={this.onClickChoseOption.bind(this)}></span>
                <span className="checbox-chose"></span>
              </div>
            </div>
          </div>
          {/*套餐类型*/}
        </div>
      </div>
    )
  }
}
export default premium

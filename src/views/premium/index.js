import React, { PropTypes } from 'react'
import Header from 'components/Header'
import { createChecker } from 'utils/checker'
import Country from 'components/country'
import { App, YztApp } from 'utils/native_h5'

export default class premium extends React.Component {
  state = {
    chose: false,
    startDate: '',
    isShowCountry: false
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
  onClickRight() {
    console.log(1)
  }
  onClickChoseOption() {
    this.setState({
      chose: !this.state.chose
    })
  }
  onClickCountry(name) {
    this.setState({
      isShowCountry: false
    })
    console.log(name)
  }
  onClickIsAddCountry(flag) {
    this.setState({
      isShowCountry: flag
    })
  }
  onFocusPhone() {
    const { phone } = this.refs
    if (!this.state.phone) {
      phone.setAttribute('placeholder', '')
      phone.previousSibling.style.display = 'block'
    }
  }
  onChangePhone(va, e) {
    console.log(va)
    this.setState(
      Object.assign({

      },
        {
          va: e.target.value
        }
      )
    )
    console.log(this.state.phone)

    // this.setState({
    //   phone: e.target.value
    // })
  }
  onBlurPhone() {
    const { phone } = this.refs
    let checkList = [
        {
          checkfnName: "mobile",
          checkValue: this.state.phone
        }
      ]
    let errorContents = createChecker(checkList)
    if (!this.state.phone) {
      phone.setAttribute('placeholder', '手机号')
      phone.previousSibling.style.display = 'none'
    }
    this.setState({
      errorPhone: !!errorContents ? errorContents : ''
    })
  }

  renderPremium() {
    return(
      <div>
        <div className="premium-waner">
          <div className="pre-header-line">
            <span className="pre-header-txt">
              旅游目的地
            </span>
            <div className="btn-add-icon pre-header-btn" onTouchTap={this.onClickIsAddCountry.bind(this, true)}>
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
          <div className="pre-content">
            <p className="pre-date-txt">保障时间</p>
            <section className="pre-date-tr">
              <div className="input-outer">
                <div className="select-tit">开始时间</div>
                <input
                  type="date"
                  className="input-style"
                  placeholder="开始时间"
                  maxLength="11"
                />
              </div>
            </section>
            <section className="pre-date-tr">
              <div className="input-outer">
                <div className="select-tit">结束时间</div>
                <input
                  type="date"
                  className="input-style"
                  placeholder="结束时间"
                  maxLength="11"
                />
              </div>
            </section>
            <p className="pre-decribes">
              *如果用于办理签证，建议选择旅行日期时间前后各延长2天，详询使馆
            </p>
            <div className="col-line-threee col-no-bd">
              <span>被保险人</span>
              <div className="btn-add-icon" >
                  <span className="add-icon-imgs"></span>
                  <span className="add-icon-txt">添加</span>
              </div>
            </div>
            <div className="col-line-threeetbd">
              <div className="col-line-with">
                <span className="delete-icon-btn m-l3">
                </span>
                <input type="date" className="premium-chose-date"/>
              </div>
              <span>￥100/人</span>
            </div>
            <div className="col-line-threeetbd">
              <div className="col-line-with">
                <span className="delete-icon-btn m-l3">
                </span>
                <input type="date" className="premium-chose-date"/>
              </div>
              <span>￥100/人</span>
            </div>
            <div className="col-line-threeetbd">
              <div className="col-line-with">
                <span className="delete-icon-btn m-l3">
                </span>
                <input type="date" className="premium-chose-date"/>
              </div>
              <span>￥100/人</span>
            </div>
          </div>
          <div className="pre-tail">
          </div>
          <div className="pre-btn">
            <span className="pre-btn-left">保费总额：3860.00元</span>
            <span className="pre-btn-right">
              <span className="pre-btn-rbtn">
                立即投保
              </span>
            </span>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return(
      <div>
        {
          this.state.isShowCountry ?
          <Header
            isVisibility="true"
            rightTxt="不承保地区"
            onClickRight={this.onClickRight.bind(this)}
            onClickBack={this.onClickIsAddCountry.bind(this, false)}
            title="选择旅行目的地"/>
          :
          <Header
            isVisibility={!App.IS_YZT}
            onClickBack={this.onClickBack.bind(this)}
            title="保费测算"/>
        }
        {
          this.state.isShowCountry ?
          <Country
            onClickCountry={this.onClickCountry.bind(this)}
            onClickBacks={this.onClickIsAddCountry.bind(this, false)}
          /> : this.renderPremium()
        }
      </div>
    )
  }
}
export default premium

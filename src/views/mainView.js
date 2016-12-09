import React, { PropTypes } from 'react'
import Header from 'components/Header'
import { createChecker } from 'utils/checker'
import BtnLoading from 'components/btnLoading'
import Loading from 'components/loading'
import { App, YztApp } from 'utils/native_h5'

export default class mainView extends React.Component {

  state = {
    phone: '',
    errorPhone: ''
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

  render() {
    const { title } = this.props.route
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title="main"/>
        <section >
          main
        </section>
        <selection>
          <div className="tagging bd-top-y">
            保障期限
          </div>
          <div className="tagging">
            <span>保障期限</span>
            <span className="col-4a90e2">保障期限</span>
          </div>
        </selection>
        <section>
          <div className="col-line">
            <span>left</span>
            <span className="col-9b9b9b">right</span>
          </div>
          <div className="col-line">
            <span>left</span>
            <span>right</span>
          </div>
          <div className="col-line">
            <span>left</span>
            <span className="col-4a90e2">right</span>
          </div>
          <a className="col-line" href="">
            <span>left</span>
            <span className="icon-right"></span>
          </a>
        </section>
        <section>
          <div className="incomplete-fill-btn">
            立即支付
          </div>
          <div className="no-fill-btn">
            返回
          </div>
          <div className="complete-fill-btn">
            马上投保
          </div>
        </section>
        <section>
          <div className="tabs">
            <div className="col-tab col-tab-chose">
              <p className="p-b6">
                经济型
              </p>
              <p className="p-b12">
                100元
              </p>
            </div>
            <div className="col-tab">
              <p className="p-b6">
                经济型
              </p>
              <p className="p-b12">
                100元
              </p>
            </div>
            <div className="col-tab">
              <p className="p-b6">
                经济型
              </p>
              <p className="p-b12">
                100元
              </p>
            </div>
          </div>
        </section>
        <section className="p-lr-14">
          <div className="input-outer">
            <div className="input-tit">手机号</div>
            <input
              type="text"
              className={!!this.state.errorPhone ?
                'input-style input-style-error' : 'input-style'}
              ref="phone"
              placeholder="手机号"
              maxLength="11"
              onFocus={::this.onFocusPhone}
              onChange={this.onChangePhone.bind(this,'phone')}
              onBlur={::this.onBlurPhone}
            />
            {
              !!this.state.errorPhone &&
              <div className="remind-text">{this.state.errorPhone}</div>
            }
            {
              !!this.state.errorPhone && <span className="remind-icon-error"></span>
            }
          </div>
        </section>
        <section>
          <div>
            <input type="checkbox" className="ipt-checkbox" id="cbx-1"/>
            <label className="lab-checkbox" htmlFor="cbx-1"></label>
          </div>
          <div>
            <input type="checkbox" className="ipt-checkbox" id="cbx-2"/>
            <label className="lab-checkbox2" htmlFor="cbx-2"></label>
          </div>
        </section>
        <section className="p-lr-14">
          <div className="input-outer">
            <div className="select-tit">保障期限</div>
            <span className="select-icon"></span>
            <select className="select-cont">
              <option>1年</option>
              <option>1年</option>
              <option>1年</option>
              <option>1年</option>
            </select>
          </div>
        </section>
        <section>
          {
            <BtnLoading />
          }
        </section>
        <div className="h_45"></div>
        <div className="h_45"></div>
        <div className="mask modalWrap">
        </div>
      </div>
    )
  }
}
export default mainView

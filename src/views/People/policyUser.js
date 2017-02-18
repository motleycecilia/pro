import React, { PropTypes } from 'react'
import Link from 'valuelink'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import util from 'utils/utils'
import { getPolicyUserInfo, updatePolicyUserInfo, resetPolicyUserInfo } from 'actions'
import { createChecker } from 'utils/checker'
import { App, YztApp } from 'utils/native_h5'

@connect(
  state => ({
    policyUser: state.policyUser
  }),
  {
    getPolicyUserInfo,
    updatePolicyUserInfo,
    resetPolicyUserInfo
  }
)

export default class policyUser extends React.Component {
  state = {
    insurerId: '',
    name: '',
    cardNo: '',
    phoneNo: '',
    email: '',
    errorName: '',
    errorPhone: '',
    errorCardNo: '',
    errorEmail: '',
    errorInfo: '',
    isbindCard: ''
  }

  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.getPolicyUserInfo()
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  componentWillReceiveProps(nextProps) {
    const { policyUser } = nextProps
    if(policyUser.errorMsg === '90002') {
      this.context.router.push({
        pathname: '/login'
      })
      return
    }
    if(policyUser.updatePolicyUserSuccess === true) {
      this.context.router.push({
        pathname: '/fillmation',
        query: {
          choseBeList: this.props.location.query.choseBeList
        }
      })
      return
    }
    if(policyUser.updatePolicyUserError === true) {
      if(policyUser.updataPolicyErrorMsg === '90002') {
        this.context.router.push({
          pathname: '/login'
        })
        return
      }
      this.setState({
        errorInfo: policyUser.updataPolicyErrorMsg
      })
      return
    }
    if(policyUser.getResultData) {
      this.setState({
        insurerId: policyUser.getResultData.id,
        isbindCard: policyUser.getResultData.isBindCard || "0",
        name: policyUser.getResultData.insurerName,
        cardNo: policyUser.getResultData.insurerIdNo,
        phoneNo: policyUser.getResultData.insurerMobile,
        email: policyUser.getResultData.insurerEmail
      })
    }
  }
  componentWillUnmount() {
    this.props.resetPolicyUserInfo()
  }
  onFocusName() {
    const { name } = this.refs
    this.setState({
      errorName: ''
    })
    if (!this.state.name) {
      name.setAttribute('placeholder', '')
      name.previousSibling.style.display = 'block'
    }
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  onBlurName() {
    const { name } = this.refs
    let checkList = [
        {
          checkfnName: "uName",
          checkValue: this.state.name
        }
      ]
    let errorContents = createChecker(checkList)

    if (!this.state.name) {
      name.setAttribute('placeholder', '姓名')
      name.previousSibling.style.display = 'none'
    }
    this.setState({
      errorName: !!errorContents ? errorContents : ''
    })
  }

  onFocusPhone() {
    const { phone } = this.refs
    this.setState({
      errorPhone: ''
    })
    if (!this.state.phoneNo) {
      phone.setAttribute('placeholder', '')
      phone.previousSibling.style.display = 'block'
    }
  }
  onChangePhone(e) {
    this.setState({
      phoneNo: e.target.value
    })
  }
  onBlurPhone() {
    const { phone } = this.refs
    let checkList = [
        {
          checkfnName: "mobile",
          checkValue: this.state.phoneNo
        }
      ]
    let errorContents = createChecker(checkList)
    if (!this.state.phoneNo) {
      phone.setAttribute('placeholder', '手机号')
      phone.previousSibling.style.display = 'none'
    }
    this.setState({
      errorPhone: !!errorContents ? errorContents : ''
    })
  }

  onFocusCardNo() {
    this.setState({
      errorCardNo: ''
    })
    const { cardNo } = this.refs
    if (!this.state.cardNo) {
      cardNo.setAttribute('placeholder', '')
      cardNo.previousSibling.style.display = 'block'
    }
  }
  onChangeCardNo(e) {
    const {sex} = this.refs
    this.setState({
      cardNo: e.target.value
    })
  }
  onBlurCardNo() {
    const { cardNo } = this.refs
    let checkNmae = 'idCard'
    let checkList = [
        {
          checkfnName: checkNmae,
          checkValue: this.state.cardNo
        }
      ]
    let errorContents = createChecker(checkList)
    if(!errorContents) {
      const getEle = document.querySelector.bind(document)
      const birthDay = util.splitbirth(this.state.cardNo)
      this.setState({
        birthDay: birthDay
      })
    }
    if (!this.state.cardNo) {
      cardNo.setAttribute('placeholder', '证件号码')
      cardNo.previousSibling.style.display = 'none'
    }
    this.setState({
      errorCardNo: !!errorContents ? errorContents : ''
    })
  }
  onFocusEmail() {
    this.setState({
      errorEmail: ''
    })
    const { email } = this.refs
    if (!this.state.email) {
      email.setAttribute('placeholder', '')
      email.previousSibling.style.display = 'block'
    }
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onBlurEmail() {
    const { email } = this.refs
    let checkList = [
        {
          checkfnName: "email",
          checkValue: this.state.email
        }
      ]
    let errorContents = createChecker(checkList)
    if (!this.state.email) {
      email.setAttribute('placeholder', '电子邮箱')
      email.previousSibling.style.display = 'none'
    }
    // if(this.state.email) {
      this.setState({
        errorEmail: !!errorContents ? errorContents : ''
      })
    // }
  }
  onClickBack() {
    history.go(-1)
  }
  onClickSaveInfo() {
    if (typeof (pa_sdcajax) === 'function') {
      pa_sdcajax('WT.ti', "投保人编辑页_保存信息", false,'WT.obj', 'button', false, 'DCS.dcsuri', window.location.pathname+'\/click.event', false, 'WT.pageurl','http://'+window.location.hostname+window.location.pathname, false, 'WT.pagetitle',  document.title, false, 'WT.dl', '25', false, 'DCSext.wt_click', 'page', false)
    }
    let checkList = [
        {
          checkfnName: "uName",
          checkValue: this.state.name
        },
        {
          checkfnName: 'idCard',
          checkValue: this.state.cardNo
        },
        {
          checkfnName: "mobile",
          checkValue: this.state.phoneNo
        },
        {
          checkfnName: "email",
          checkValue: this.state.email
        }
      ]
    let errorContents = createChecker(checkList)
    if(!errorContents) {
      const birthDay = util.splitbirth(this.state.cardNo),
      sex = util.fillBirAndSex(this.state.cardNo)
      const params = {
        insurerId: this.state.insurerId,
        insurerName: this.state.name,
        insurerIdNo: this.state.cardNo,
        insurerBirthday: birthDay,
        insurerMobile: this.state.phoneNo,
        insurerEmail: this.state.email,
        insurerSex: sex === 'M' ? 'M' : 'F'
      }
      this.props.updatePolicyUserInfo(params)
      return
    }
    this.setState({
      errorInfo: !!errorContents ? errorContents : ''
    })
  }
  renderSureEdit(policyUser) {
    return (
      <div>
        <div className="input-outer m-t24">
          <div className="select-tit">姓名</div>
          <input
            type="text"
            className={!!this.state.errorName ?
              'input-style input-style-error' : 'input-style'}
            placeholder="姓名"
            defaultValue={policyUser.insurerName || ""}
            ref="name"
            maxLength="20"
            onFocus={::this.onFocusName}
            onChange={::this.onChangeName}
            onBlur={::this.onBlurName}
          />
          {
            !!this.state.errorName &&
            <div className="remind-text">{this.state.errorName}</div>
          }
          {
            !!this.state.errorName && <span className="remind-icon-error"></span>
          }
        </div>
        <div className="input-outer m-t24">
          <div className="select-tit">证件号码</div>
          <input
            type="text"
            className={!!this.state.errorCardNo ?
              'input-style input-style-error' : 'input-style'}
            placeholder="证件号码"
            maxLength="18"
            defaultValue={policyUser.insurerIdNo || ""}
            ref="cardNo"
            onFocus={::this.onFocusCardNo}
            onChange={::this.onChangeCardNo}
            onBlur={::this.onBlurCardNo}
          />
          {
            !!this.state.errorCardNo &&
            <div className="remind-text">{this.state.errorCardNo}</div>
          }
          {
            !!this.state.errorCardNo && <span className="remind-icon-error"></span>
          }
        </div>
      </div>
    )
  }
  renderNoEdit(policyUser) {
    return (
      <div>
        <div className="input-outer m-t24">
          <div className="select-tit">姓名</div>
          <input
            type="text"
            className={!!this.state.errorName ?
              'input-style input-style-error' : 'input-style'}
            placeholder="姓名"
            defaultValue={policyUser.insurerName || ""}
            ref="name"
            maxLength="20"
            readOnly
            onFocus={::this.onFocusName}
            onChange={::this.onChangeName}
            onBlur={::this.onBlurName}
          />
          {
            !!this.state.errorName &&
            <div className="remind-text">{this.state.errorName}</div>
          }
          {
            !!this.state.errorName && <span className="remind-icon-error"></span>
          }
        </div>
        <div className="input-outer m-t24">
          <div className="select-tit">证件号码</div>
          <input
            type="text"
            className={!!this.state.errorCardNo ?
              'input-style input-style-error' : 'input-style'}
            placeholder="证件号码"
            maxLength="18"
            readOnly
            defaultValue={policyUser.insurerIdNo || ""}
            ref="cardNo"
            onFocus={::this.onFocusCardNo}
            onChange={::this.onChangeCardNo}
            onBlur={::this.onBlurCardNo}
          />
          {
            !!this.state.errorCardNo &&
            <div className="remind-text">{this.state.errorCardNo}</div>
          }
          {
            !!this.state.errorCardNo && <span className="remind-icon-error"></span>
          }
        </div>
      </div>
    )
  }
  renderContent(policyUser) {
    return(
      <div>
        <section className="bePeople-content">
          {
            this.state.isbindCard === "1" ? this.renderNoEdit(policyUser) : this.renderSureEdit(policyUser)
          }
          <div className="input-outer m-t24">
            <div className="select-tit">手机号</div>
            <input
              type="text"
              className={!!this.state.errorPhone ?
                'input-style input-style-error' : 'input-style'}
              ref="phone"
              defaultValue={policyUser.insurerMobile || ""}
              placeholder="手机号"
              pattern="[0-9]*"
              maxLength="11"
              onFocus={::this.onFocusPhone}
              onChange={::this.onChangePhone}
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
          <div className="input-outer m-t24">
            <div className="select-tit">电子邮箱</div>
            <input
              type="text"
              className={!!this.state.errorEmail ?
                'input-style input-style-error' : 'input-style'}
              ref="email"
              defaultValue={policyUser.insurerEmail || ""}
              placeholder="电子邮箱"
              maxLength="50"
              onFocus={::this.onFocusEmail}
              onChange={::this.onChangeEmail}
              onBlur={::this.onBlurEmail}
            />
            {
              !!this.state.errorEmail &&
              <div className="remind-text">{this.state.errorEmail}</div>
            }
            {
              !!this.state.errorEmail && <span className="remind-icon-error"></span>
            }
          </div>
        </section>
        <div className="policy-error">
          {this.state.errorInfo}
        </div>
        <div className="incomplete-fill-btn m-t12" onTouchTap={this.onClickSaveInfo.bind(this)}>
          保存信息
        </div>
      </div>
    )
  }

  render() {
    const { title } = this.props.route
    let policyUser = this.props.policyUser
    let policyUserInfo = policyUser.getResultData ? policyUser.getResultData : {
      isbindCard: '0',
      insurerName: '',
      insurerIdNo: '',
      insurerMobile: '',
      insurerEmail: ''
    }
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        {
          policyUser.getPolicyUserSuccess ? this.renderContent(policyUserInfo) : <Loading />
        }
      </div>
    )
  }
}
export default policyUser

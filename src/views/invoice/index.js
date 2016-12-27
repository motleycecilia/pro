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

export default class invoice extends React.Component {
  state = {
    insurerId: '',
    name: '',
    phoneNo: '',
    address: '',
    errorName: '',
    errorPhone: '',
    errorAddress: '',
    errorInfo: '',
    ititle: '',
    errorTitle: '',
    zipCode: '',
    errorZipCode: ''
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
        pathname: '/fillmation'
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
      name.setAttribute('placeholder', '收件人')
      name.previousSibling.style.display = 'none'
    }
    this.setState({
      errorName: !!errorContents ? errorContents : ''
    })
  }
  onFocusTitle() {
    const { ititle } = this.refs
    this.setState({
      errorTitle: ''
    })
    if (!this.state.ititle) {
      ititle.setAttribute('placeholder', '')
      ititle.previousSibling.style.display = 'block'
    }
  }
  onChangeTitle(e) {
    this.setState({
      ititle: e.target.value
    })
  }
  onBlurTitle() {
    const { ititle } = this.refs
    let errorContents = !!this.state.ititle ? false : '请输入发票抬头'
    if (!this.state.ititle) {
      ititle.setAttribute('placeholder', '发票抬头')
      ititle.previousSibling.style.display = 'none'
    }
    this.setState({
      errorTitle: !!errorContents ? errorContents : ''
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
  onFocusAddress() {
    this.setState({
      errorAddress: ''
    })
    const { address } = this.refs
    if (!this.state.address) {
      address.setAttribute('placeholder', '')
      address.previousSibling.style.display = 'block'
    }
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }
  onBlurAddress() {
    const { address } = this.refs
    let errorContents = !!this.state.address ? false : '请输入地址'
    if (!this.state.address) {
      address.setAttribute('placeholder', '街道地址')
      address.previousSibling.style.display = 'none'
    }
    // if(this.state.email) {
      this.setState({
        errorAddress: !!errorContents ? errorContents : ''
      })
    // }
  }

  onFocusZipCode() {
    const { zipCode } = this.refs
    this.setState({
      errorZipCode: ''
    })
    if (!this.state.zipCode) {
      zipCode.setAttribute('placeholder', '')
      zipCode.previousSibling.style.display = 'block'
    }
  }
  onChangeZipCode(e) {
    this.setState({
      zipCode: e.target.value
    })
  }
  onBlurZipCode() {
    const { zipCode } = this.refs
    let errorContents = !!this.state.zipCode ? false : '请输入邮政编码'
    if (!this.state.zipCode) {
      zipCode.setAttribute('placeholder', '邮政编码')
      zipCode.previousSibling.style.display = 'none'
    }
    this.setState({
      errorZipCode: !!errorContents ? errorContents : ''
    })
  }
  onClickBack() {
    history.go(-1)
  }
  onClickSaveInfo() {
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
      console.log(true)
      this.props.updatePolicyUserInfo(
        {
          insurerId: this.state.insurerId,
          insurerName: this.state.name,
          insurerIdNo: this.state.cardNo,
          insurerBirthday: birthDay,
          insurerMobile: this.state.phoneNo,
          insurerEmail: this.state.email,
          insurerSex: sex === 'M' ? 'M' : 'F'
        }
      )
      return
    }
    this.setState({
      errorInfo: !!errorContents ? errorContents : ''
    })
  }
  renderContent(policyUser) {
    return(
      <div>
        <section className="invoice-content">
          <div>
            在线支付成功后在5个工作日内配送。后续如果发生退保情况，还需退还发票，要保存好发票哦
          </div>
          <div className="input-outer m-t24">
            <div className="select-tit">发票抬头</div>
            <input
              type="text"
              className={!!this.state.errorTitle ?
                'input-style input-style-error' : 'input-style'}
              placeholder="姓名"
              ref="ititle"
              maxLength="20"
              onFocus={::this.onFocusTitle}
              onChange={::this.onChangeTitle}
              onBlur={::this.onBlurTitle}
            />
            {
              !!this.state.errorTitle &&
              <div className="remind-text">{this.state.errorTitle}</div>
            }
            {
              !!this.state.errorTitle && <span className="remind-icon-error"></span>
            }
          </div>
          <div className="invoice-describe">
            *按照保监会要求，发票抬头必须是投保人姓名
          </div>
          <div className="input-outer m-t24">
            <div className="select-tit">收件人</div>
            <input
              type="text"
              className={!!this.state.errorName ?
                'input-style input-style-error' : 'input-style'}
              placeholder="收件人"
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
          <section className="m-t24">
            <div className="input-outer">
              <div className="select-tit">省、市、区</div>
              <span className="select-icon"></span>
              <select className="select-cont">
                <option>1年</option>
                <option>1年</option>
                <option>1年</option>
                <option>1年</option>
              </select>
            </div>
          </section>
          <div className="input-outer m-t24">
            <div className="select-tit">街道地址</div>
            <input
              type="text"
              className={!!this.state.errorAddress ?
                'input-style input-style-error' : 'input-style'}
              ref="address"
              placeholder="街道地址"
              maxLength="50"
              onFocus={::this.onFocusAddress}
              onChange={::this.onChangeAddress}
              onBlur={::this.onBlurAddress}
            />
            {
              !!this.state.errorAddress &&
              <div className="remind-text">{this.state.errorAddress}</div>
            }
            {
              !!this.state.errorAddress && <span className="remind-icon-error"></span>
            }
          </div>
          <div className="input-outer m-t24">
            <div className="select-tit">邮政编码</div>
            <input
              type="text"
              className={!!this.state.errorZipCode ?
                'input-style input-style-error' : 'input-style'}
              ref="zipCode"
              placeholder="邮政编码"
              maxLength="50"
              onFocus={::this.onFocusZipCode}
              onChange={::this.onChangeZipCode}
              onBlur={::this.onBlurZipCode}
            />
            {
              !!this.state.errorZipCode &&
              <div className="remind-text">{this.state.errorZipCode}</div>
            }
            {
              !!this.state.errorZipCode && <span className="remind-icon-error"></span>
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
    const policyUser = this.props.policyUser
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        {
          policyUser.getPolicyUserSuccess ? this.renderContent(policyUser.getResultData) : <Loading />
        }
      </div>
    )
  }
}
export default invoice

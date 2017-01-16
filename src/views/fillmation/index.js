import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import {getInsuredUserInfo, getPolicyUserInfo, preSubmit, resetPreSubmit} from 'actions'
import { App, YztApp } from 'utils/native_h5'
import { createChecker } from 'utils/checker'
import BtnLoading from 'components/btnLoading'


@connect(
  state => ({
    insured: state.insured,
    policyUser: state.policyUser,
    underwriting: state.underwriting
  }),
  {
    getInsuredUserInfo,
    getPolicyUserInfo,
    preSubmit,
    resetPreSubmit
  }
)
export default class fillmation extends React.Component {
  state = {
    iphoneChoseBtn: false,
    beList: [],
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
    errorZipCode: '',
    errorInfo: '',
    policyName: '',
    policyNo: '',
    policyMobileNo: '',
    btnLodding: false,
    isConfirm: false,
    isAgreeElement: false
  }

  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }
  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
    this.props.getPolicyUserInfo();
    this.props.getInsuredUserInfo('')
  }
  componentWillReceiveProps(nextProps) {
    const { insured, policyUser, underwriting} = nextProps
    if(insured.errorMsg === '90002' || underwriting.errorMsg === '90002') {
      this.context.router.push({
        pathname: '/login'
      })
      return
    }
    if(underwriting.getPreSubmitSuccess === true) {
      YztApp.setTitle('保单信息确认')
      this.setState({
        isConfirm: true
      })
      return
    }
    if(policyUser.getPolicyUserSuccess === true) {
      this.setState({
        policyName: policyUser.getResultData.insurerName,
        policyNo: policyUser.getResultData.id,
        policyMobileNo: policyUser.getResultData.insurerMobile
      })
    }
    if(insured.getInsuredUserSuccess === true) {
      let beListId = this.props.location.query.choseBeList
      if(beListId) {
        let bePoleList = insured.getIResultData.filter((val, index) => {
          return beListId.indexOf(val.id) > -1 && val
        })
        this.setState({
          beList: bePoleList
        })
      }
    }
  }
  componentWillUnmount() {
    this.props.resetPreSubmit()
  }
  onClickBack() {
    history.go(-1)
  }
  onClickChoseBtn() {
    this.setState({
      iphoneChoseBtn: !this.state.iphoneChoseBtn
    })
  }
  onClickUpdatePolicy() {
    this.context.router.push({
      pathname: '/policyUser'
    })
  }
  onClickEdit() {
    this.context.router.push({
      pathname: '/supervise'
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
  onClickCoseConfirm() {
    YztApp.setTitle('保单填写')
    this.setState({
      isConfirm: false
    })
  }
  onClickEditBepole(id) {
    this.context.router.push({
      pathname: '/bePeople',
      query: { operation: 1, ide: id }
    })
  }
  onClickDeleteBepole(index) {
    let bList = this.state.beList
    bList.splice(index, 1)
    this.setState({
      beList: bList
    })
  }
  onClickAgreeElement() {
    this.setState({
      isAgreeElement: !this.state.isAgreeElement
    })
  }
  onClickpreSubmit() {
    let checkList = [{
      checkfnName: "checkEmpty",
      checkValue: this.state.policyName,
      errMsg: '请完善投保人信息'
      },
      {
      checkfnName: "checkValLength",
      checkValue: this.state.beList,
      errMsg: '请添加被保险人'
      },
      {
        checkfnName: "checkTureFalse",
        checkValue: this.state.isAgreeElement,
        errMsg: '请同意授权说明'
      }
    ]
    if(this.state.iphoneChoseBtn) {
      let invoiceCheckList = [
        {
          checkfnName: "checkEmpty",
          checkValue: this.state.ititle,
          errMsg: "请填写发票抬头"
        },
        {
          checkfnName: "mobile",
          checkValue: this.state.phoneNo
        },
        {
          checkfnName: "checkEmpty",
          checkValue: this.state.address,
          errMsg: "请填写街道地址"
        },
        {
          checkfnName: "checkZipCode",
          checkValue: this.state.zipCode
        }
      ]
      checkList = checkList.concat(invoiceCheckList)
    }
    let errorContents = createChecker(checkList)
    if(errorContents === false) {
      let insurantList = beList.map((val, index) => {
        return val.id
      })
      let prePara = localStorage.getItem(prePara)
      const preParams = {
        preSubmit: prePara.serialNo,
        productId: prePara.productId,
  			productCode: prePara.productCode,
  			productInsuranceCode: prePara.productInsuranceCode,
        skuid: prePara.skuid,
        insurerInfo: {
          insurerNo: this.state.policyNo
        },
        insurantInfoList: insurantList,
        linkManInfo: {
          linkManName: this.state.policyName,
          linkManMobileNo: this.state.policyMobileNo
        },
        invoceInfo: {
          invoceName: this.state.policyName,
          invoceHeading: this.state.ititle,
          invoceZipCode: this.state.zipCode,
          invoceMobileNo: this.state.phoneNo,
          invoceAddress: this.state.address
        }
      }
      this.props.preSubmit(preParams)
    }else {
      this.setState({
        errorInfo: errorContents
      })
    }
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

  renderInvoice(policyUser) {
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
              placeholder="发票抬头"
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
            *按照保监会要求，收件人必须是投保人姓名
          </div>
          <div className="input-outer m-t24">
            <div className="select-tit">收件人</div>
            <input
              type="text"
              className={!!this.state.errorName ?
                'input-style input-style-error' : 'input-style'}
              placeholder="收件人"
              ref="name"
              maxLength="20"
              defaultValue={this.state.policyName}
              readOnly
            />
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
          {
            false && <section className="m-t24">
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
          }
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
      </div>
    )
  }
  renderBeList() {
    return (
      this.state.beList.map((val, index) => {
        return(
          <div className="col-line-threeetbd" key={index}>
            <div className="col-line-with">
              <span className="delete-icon-btn m-l3" onTouchTap={this.onClickDeleteBepole.bind(this,index)}>
              </span>
              {
                val.insurantName
              }
            </div>
            <span className="icon-max-right" onTouchTap={this.onClickEditBepole.bind(this, val.id)}></span>
          </div>
        )
      })
    )
  }
  renderConfirm(preResultData) {
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickCoseConfirm.bind(this)} title="保单信息确认"/>
        <div className="fillbox">
          <div className="product-intro white-bg">
            <div className="p-l-10">
              <dl>
                <dt>保险名称</dt>
                <dd>{preResultData.productName}</dd>
              </dl>
            </div>
            <div className="p-l-10">
              <dl>
                <dt>旅行目的地</dt>
                <dd>🇮🇹、🇵🇱、🇬🇷、🇦🇺</dd>
              </dl>
            </div>
            <div className="p-l-10">
              <dl>
                <dt>套餐类型</dt>
                <dd></dd>
              </dl>
            </div>
            <div className="confirm-top-date">
              <div className="confirm-date-tit">
                保障时间
              </div>
              <div className="confirm-date-dates">
                <p>{preResultData.policyInfo.insuranceStartTime}零时起</p>
                <p>{preResultData.policyInfo.insuranceEndTime}二十四时止</p>
              </div>
            </div>
          </div>
          <div className="confirm-center-tit">
            投保人
          </div>
          <div className="confirm-center-contents">
            <div className="center-content">
              <div className="col-line-fillmation">
                <span>left</span>
                <span className="col-line-cr">left</span>
                <span className="icon-max-up"></span>
              </div>
              <div className="p-b-20">
                <span className="fill-content-tit">
                  身份证号
                </span>
                <span className="fill-content-txt">
                  271829328728920937
                </span>
              </div>
              <div className="p-b-20">
                <span className="fill-content-tit">
                  手机号码
                </span>
                <span className="fill-content-txt">
                  13212312322
                </span>
              </div>
              <div className="p-b-20">
                <span className="fill-content-tit">
                  生日
                </span>
                <span className="fill-content-txt">
                  1990-01-21
                </span>
              </div>
              <div className="p-b-20">
                <span className="fill-content-tit">
                  与投保人关系
                </span>
                <span className="fill-content-txt">
                  本人
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderLoddingBtn() {
    return (
      <div>
        {
          <BtnLoading />
        }
      </div>
    )
  }
  renderSubmitBtn() {
    return(
      <div className="complete-fill-btn" onTouchTap={::this.onClickpreSubmit}>确定</div>
    )
  }
  renderContent(policyUser) {
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title="保单填写"/>
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
            <div className="row-box-list" onTouchTap={this.onClickUpdatePolicy.bind(this)}>
              <div className="row-box-list-title router-action1">
                <div className="name col-name">
                  为范围
                </div>
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
                  <span className="add-icon-txt" onTouchTap={::this.onClickEdit}>编辑</span>
                </div>
              </div>
              {
                this.renderBeList()
              }
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
          {
            this.state.iphoneChoseBtn ? this.renderInvoice(policyUser) : ''
          }
          <div className="fill-statement">
            <div className="m-r10" onTouchTap={::this.onClickAgreeElement}>
              <input type="checkbox" className="ipt-checkbox" id="cbx-2"/>
              <label className="lab-checkbox2" htmlFor="cbx-2"></label>
            </div>
            同意授权声明并通过用户投保
          </div>
          <div className="policy-error fill-error">
            {this.state.errorInfo}
          </div>
        </div>
        {
          this.state.btnLodding ?
          this.renderLoddingBtn() :
          this.renderSubmitBtn()
        }
      </div>
    )
  }
  render() {
    const { title } = this.props.route
    const { insured, policyUser, underwriting} = this.props
    return(
      <div>
        {
          // !this.state.isConfirm && insured.getInsuredUserSuccess === true && policyUser.getPolicyUserSuccess === true ?
          // this.renderContent(policyUser) : <Loading />
          !this.state.isConfirm && insured.getInsuredUserSuccess === true ?
          this.renderContent(policyUser) : <Loading />
        }
        {
          this.state.isConfirm && this.renderConfirm(underwriting.preResultData)
        }
      </div>
    )
  }
}
export default fillmation

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Input } from 'valuelink/tags'
import {connect} from 'react-redux'
import Header from 'components/Header'
import util from 'utils/utils'
import Loading from 'components/loading'
import BtnLoading from 'components/btnLoading'
import {getPolicyUserInfo ,updatePolicyUserInfo, getInsuredUserInfo, resetPolicyUserInfo, resetInsuredUserInfo, preSubmit, resetPreSubmit} from 'actions'
import policy from 'mock/policy'
import beInsure from 'mock/beInsure'
import { createChecker } from 'utils/checker'
import { App, YztApp } from 'utils/native_h5'

@connect(
  state => ({
    policyUser: state.policyUser,
    insured: state.insured,
    underwriting: state.underwriting
  }),
  {
    getPolicyUserInfo,
    updatePolicyUserInfo,
    getInsuredUserInfo,
    resetPolicyUserInfo,
    resetInsuredUserInfo,
    preSubmit,
    resetPreSubmit
  }
)

export default class fillMation extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    guaranteeDate: '365',
    takeEffectDate: '',
    endDate: '',
    insurerId: '',
    getPolicyCount: 0,
    name: '',
    cardNo: '',
    phoneNo: '',
    email: '',
    errorName: '',
    errorCardNo: '',
    errorPhone: '',
    errorEmail: '',
    errorInfo: '',
    annualPremium: '',
    underwritingState: true,
    btnLoding: false
  }

  componentWillMount() {
    this.setState({
      annualPremium: this.props.location.query.annualPremium
    })
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
    this.props.getPolicyUserInfo()
    this.props.getInsuredUserInfo('')
    console.log(this.state.btnLoding)
  }

  componentWillUnmount() {
    this.props.resetPolicyUserInfo()
    this.props.resetInsuredUserInfo()
    this.props.resetPreSubmit()
  }

  componentWillReceiveProps(nextProps) {
    // if(this.state.dType === '0') {
    //   this.setState({
    //     dType: '1'
    //   })
    // }
    let getEle = document.querySelector.bind(document)
    const {policyUser, underwriting} = nextProps
    let errrorContent = ''
    if(policyUser.getPolicyUserSuccess === true && this.state.getPolicyCount === 0) {
      if(policyUser.getResultData.responseCode === '000000') {
        this.setState({
          getPolicyCount: 1,
          name: policyUser.getResultData.responseData.insurerName,//
          cardNo: policyUser.getResultData.responseData.insurerIdNo,
          phoneNo: policyUser.getResultData.responseData.insurerMobile,
          email: policyUser.getResultData.responseData.insurerEmail,
          takeEffectDate: util.getEndDate(getEle('#sysDate').value, 1, 'D'),
          endDate: util.getEndDate(util.getEndDate(getEle('#sysDate').value, 1, 'D'), -1, 'D', true)
        })
        // let {date} = this.refs
        // if(!!date) {
        //   date.type = "date"
        // }
        // document.getElementById("takeEffectDate").value = this.state.takeEffectDate
      }else if(policyUser.getResultData.responseCode === '90002') {
        this.context.router.push({
          pathname: '/login'
        })
      }else {
        errrorContent = '系统异常'
      }
    }
    if(policyUser.updatePolicyUserSuccess && this.state.underwritingState === true) {
      this.setState({
        underwritingState: false
      })
      const getEles=document.querySelectorAll.bind(document)
      let insurantId = util.getChoseBeinsure(getEles('.ipt-checkbox'))
      console.log(this.props.location.query.insurancePriodUnit)
      this.props.preSubmit(//核保
        {
          insurantId: insurantId.join(),
          insurantName: this.state.name,
          insurantIdno: this.state.cardNo,
          insurantBirth: util.splitbirth(this.state.cardNo),
          insurantSex: util.fillBirAndSex(this.state.cardNo),
          mobile: this.state.phoneNo,
          email: this.state.email,
          productId: this.props.location.query.productId,
          insurancePeriod: this.props.location.query.insurancePriod,
          insurancePriodUnit: this.props.location.query.insurancePriodUnit,
          productCode: '05000011' || this.props.location.query.productInsuranceCode,
          insuranceBeginTime: this.state.takeEffectDate + " 15:44:00",
          insuranceStartTime: this.state.takeEffectDate + " 15:44:00",
          insuranceEndTime: this.state.endDate,
          annualPremium: this.state.annualPremium
        }
      )
    }
    if(underwriting.getPreSubmitSuccess === true) {
      if(underwriting.preResultData.responseCode === '000000' && underwriting.preResultData.responseData.orderStatus !== '13') {
        sessionStorage.setItem("cxOrderNo", underwriting.preResultData.responseData.orderNo)
        // window.location.href = `http://pa18-wapmall-dmzstg1.pingan.com.cn:5380/chaoshi/payPre/life/index.shtml?orderNo=${underwriting.preResultData.responseData.orderNo}&payOrderNo=${underwriting.preResultData.responseData.payOrderNo}&channel=1982&channelSecond=1982003&platId=90002&payClassify=02&payClassify=23&hook=/chanxian/order.shtml`//购买流程

        // window.location.href = `https://pa18-wapmall-dmzstg1.pingan.com.cn:53443/chaoshi/payPre/life/index.shtml?orderNo=${underwriting.preResultData.responseData.orderNo}&payOrderNo=${underwriting.preResultData.responseData.payOrderNo}&from=wap-chaoshi&channel=1982&channelSecond=1982003&platId=999202&userId=277121462956038738&payClassify=23&hook=/chanxian/order.shtml`//升级开主账户流程
        this.context.router.push({
          pathname: '/confirm',
          query: {
            orderNo: underwriting.preResultData.responseData.orderNo,
            payOrderNo: underwriting.preResultData.responseData.payOrderNo
          }
        })
      }else {
        this.setState({
          btnLoding: false
        })
        errrorContent = underwriting.preResultData.responseMessage
      }
    }
    if(policyUser.updatePolicyUserError === true || underwriting.getPreSubmitError === true) {
      errrorContent = '系统异常'
      this.setState({
        btnLoding: false
      })
    }
    if(policyUser.updatePolicyUserBegin === true) {
      this.setState({
        btnLoding: true
      })
      this.props.resetPreSubmit()
    }
    this.setState({
      errorInfo: errrorContent
    })
  }

  onClickBack() {
    history.go(-1)
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
    this.setState({
      cardNo: e.target.value
    })
  }
  onBlurCardNo() {
    const { cardNo } = this.refs
    let checkList = [
        {
          checkfnName: "idCard",
          checkValue: this.state.cardNo
        }
      ]
    let errorContents = createChecker(checkList)
    if (!this.state.cardNo) {
      cardNo.setAttribute('placeholder', '身份证号')
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
      email.setAttribute('placeholder', '邮箱地址')
      email.previousSibling.style.display = 'none'
    }
    if(this.state.email) {
      this.setState({
        errorEmail: !!errorContents ? errorContents : ''
      })
    }
  }

  onChangeGuarantee(e) {
    this.setState({
      guaranteeDate: e.target.value
    })
  }

  onChangeTakeEffectDate(e) {
    let eValue = e.target.value
    this.setState({
      endDate: util.getEndDate(eValue, -1, 'D', true),
      takeEffectDate: eValue
    })
  }

  onClickEidtPage() {
    this.context.router.push({
      pathname: '/supervise'
    })
  }

  onClickTakeEffectDate(e) {
    e.target.type = 'date'
  }

  onClickPay() {
    const getEles=document.querySelectorAll.bind(document),
    getEle=document.querySelector.bind(document)
    let policyUserAge = util.getAge(util.splitbirth(this.state.cardNo), getEle('#sysDate').value, false)
    let checkList = [
        {
          checkfnName: "uName",
          checkValue: this.state.name
        },
        {
          checkfnName: "idCard",
          checkValue: this.state.cardNo
        },
        {
          checkfnName: "mobile",
          checkValue: this.state.phoneNo
        },
        {
          checkfnName: "email",
          checkValue: this.state.email
        },
        {
          checkfnName: "checkAdultAge",
          checkValue: policyUserAge
        }
      ]
    let errorContents = createChecker(checkList)
    if(util.getChoseBeinsure(getEles('.ipt-checkbox')).length === 0) {
      this.setState({
        errorInfo: '请添加被保人'
      })
      return
    }
    let sysTime = getEle('#sysDate').value
    let [nowDate, takEefEndDate] =
    [util.getEndDate(sysTime, 1, 'D'), util.getEndDate(sysTime, 180, 'D')]
    if(!util.maxDate(this.state.takeEffectDate, nowDate) || !util.maxDate(takEefEndDate, this.state.takeEffectDate)) {
      this.setState({
        errorInfo: '生效日期必须为当前日期1日以后180日以前'
      })
      return
    }
    if(errorContents === false) {
      this.setState({
        underwritingState: true
      })
      this.props.updatePolicyUserInfo(
        {
          insurerId: this.state.insurerId,
          insurerName: this.state.name,
          insurerIdNo: this.state.cardNo,
          insurerBirthday: util.splitbirth(this.state.cardNo),
          insurerMobile:this.state.phoneNo,
          insurerEmail: this.state.email,
          insurerSex: util.fillBirAndSex(this.state.cardNo)
        }
      )
    }else{
      this.setState({
        errorInfo: errorContents
      })
    }
  }

  renderInsuredList(insuredList) {
    return(
      insuredList.map((val,index) => {
        return(
          <div className="p-lr25 checbox-waner" key={index}>
            <input type="checkbox"  name="insured" defaultChecked={index === 0 ? true : false}
              className="ipt-checkbox"  id={"cbx-"+val.id}
              />
            <label
              className="lab-checkbox2"
              htmlFor={"cbx-"+val.id}
              ></label>
            <span className="m-l12">
              {val.insurantName}
            </span>
          </div>
        )
      })
    )
  }

  renderLoadBtn() {
    return(
      <div className="m-tb12">
        <div className="incomplete-fill-btn" onTouchTap={this.onClickPay.bind(this)}>立即支付</div>
      </div>
    )
  }

  renderBtnLooding() {
    return(
      <div className="p-tb15">
        {
          <BtnLoading />
        }
      </div>
    )
  }

  renderContent(policyResponse,insuredResponse) {
    return(
      <div>
        <div className="mation-top-tit">
          被保人必须为本人、配偶或直系亲属。受益人：法定
        </div>
        <div className="tagging bd-top-y">
          保障计划
        </div>
        <div className="bg-fff p-t24">
          <section className="p-lr-16">
            <div className="input-outer">
              <div className="select-tit">保障期限</div>
              <span className="select-icon"></span>
              <select className="select-cont" onChange={this.onChangeGuarantee.bind(this)}>
                <option>1年</option>
              </select>
            </div>
            <div className="input-outer m-t24">
              <div className="select-tit" style={{display: 'block'}}>保障生效时间</div>
              <input
                ref="date"
                type="text"
                className="input-style"
                id="takeEffectDate"
                onTouchTap={this.onClickTakeEffectDate.bind(this)}
                value={this.state.takeEffectDate}
                onChange={this.onChangeTakeEffectDate.bind(this)}
              />
            </div>
            <div className="mation-top-enddate">
              <span className="col-ccc p-r8">保险结束时间</span>
              {this.state.endDate}
            </div>
          </section>
          <div className="tagging bd-top-y">
            投保人信息
          </div>
          <section className="p-lr-16">
            <div className="input-outer m-t24">
              <div className="select-tit">姓名</div>
              <input
                type="text"
                className={!!this.state.errorName ?
                  'input-style input-style-error' : 'input-style'}
                placeholder="姓名"
                defaultValue={policyResponse.insurerName || ""}
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
              <div className="select-tit">身份证号</div>
              <input
                type="text"
                className={!!this.state.errorCardNo ?
                  'input-style input-style-error' : 'input-style'}
                placeholder="身份证号"
                maxLength="18"
                defaultValue={ policyResponse.insurerIdNo || ""}
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
            <div className="input-outer m-t24">
              <div className="select-tit">手机号</div>
              <input
                type="text"
                className={!!this.state.errorPhone ?
                  'input-style input-style-error' : 'input-style'}
                ref="phone"
                defaultValue={ policyResponse.insurerMobile || ""}
                placeholder="手机号"
                maxLength="11"
                pattern="[0-9]*"
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
              <div className="select-tit">邮箱地址</div>
              <input
                type="text"
                className={!!this.state.errorEmail ?
                  'input-style input-style-error' : 'input-style'}
                placeholder="邮箱地址"
                maxLength="50"
                ref="email"
                defaultValue={ policyResponse.insurerEmail || ""}
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
          <div className="tagging bd-top-y m-t24">
            <span>被保人信息</span>
            <span className="col-4a90e2" onTouchTap={this.onClickEidtPage.bind(this)}>
              编辑
            </span>
          </div>
          {
            this.renderInsuredList(insuredResponse)
          }
        </div>
        <div className="policy-error">
          {this.state.errorInfo}
        </div>
        {
          this.state.btnLoding === true ?
          this.renderBtnLooding() :
          this.renderLoadBtn()

        }
      </div>
    )
  }

  renderT() {
    return(
      <div>
        <input
          ref="date"
          type="date"
          className="input-style"
          id="takeEffectDate"
          value={this.state.takeEffectDate}
          onChange={this.onChangeTakeEffectDate.bind(this)}
        />
      </div>
    )
  }

  render() {
    const { title } = this.props.route
    const {policyUser, insured} = this.props
    // policyUser.getPolicyUserBegin || insured.getInsuredUserBegin ?
    // <Loading /> :
    // policyUser.getResultData && insured.getIResultData ?  this.renderContent(policy.responseData,beInsure.responseData) :
    // "系统异常请稍后重试"

    // policyUser.getPolicyUserBegin || insured.getInsuredUserBegin ?
    // <Loading /> :
    // policyUser.getResultData && insured.getIResultData && !!policyUser.getResultData.responseData ?  this.renderContent(policyUser.getResultData.responseData,insured.getIResultData.responseData) :
    // "系统异常请稍后重试"
    return(
      <div>
        <div>
          <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        </div>
        {
          policyUser.getPolicyUserBegin || insured.getInsuredUserBegin ?
          <Loading /> :
          policyUser.getResultData && insured.getIResultData && !!policyUser.getResultData.responseData ?  this.renderContent(policyUser.getResultData.responseData, insured.getIResultData.responseData || []) :
          "系统异常请稍后重试"
          // this.renderT()
        }

      </div>
    )
  }
}
export default fillMation

import React, { PropTypes } from 'react'
import Link from 'valuelink'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import util from 'utils/utils'
import {getInsuredUserInfo, addInsuredUserInfo, updateInsuredUserInfo, deleteInsuredUserInfo, resetPolicyUserInfo} from 'actions'
import { createChecker } from 'utils/checker'
import beInsure from 'mock/beInsure'
import { App, YztApp } from 'utils/native_h5'

@connect(
  state => ({
    insured: state.insured
  }),
  {
    getInsuredUserInfo,
    addInsuredUserInfo,
    updateInsuredUserInfo,
    deleteInsuredUserInfo,
    resetPolicyUserInfo
  }
)
export default class bePeople extends React.Component {

  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  state = {
    insurerId: '',
    name: '',
    cardType: '1',
    cardNo: '',
    phoneNo: '',
    relation: '1',
    birthDay: '',
    sex: 'M',
    errorName: '',
    errorCardNo: '',
    errorPhone: '',
    errorBirthDay: '',
    errorInfo: '',
    addOrEdit: '0'
  }

  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
    if(this.props.location.query.operation === '1') {//1为编辑j
      this.props.getInsuredUserInfo(this.props.location.query.ide || '')
      this.setState({
        addOrEdit: '1',
        insurerId: this.props.location.query.ide
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const {insured} = nextProps
    let errorContent = ''
    if(insured.getIResultData && insured.getIResultData.responseCode === '900002') {
      this.context.router.push({
        pathname: '/login'
      })
      return
    }
    if(insured.getIResultData && insured.getIResultData.responseCode === '000000') {
      const getResultData = this.getChoseBePeople(insured.getIResultData.responseData)[0]
      console.log(getResultData)
      this.setState({
        name: getResultData.insurantName,
        cardType: getResultData.insurantIdType,
        cardNo: getResultData.insurantIdNo,
        phoneNo: getResultData.insurantMobile,
        relation: getResultData.insurantRelation,
        birthDay: getResultData.insurantBirthday,
        sex: getResultData.insurantSex
      })
    }
    if(insured.addInsuredUserBegin === true || insured.updateInsuredUserBegin === true || insured.deleteInsuredUserBegin === true) {
      console.log('lodding...')
    }
    if(insured.addInsuredUserSuccess === true) {
      if(insured.addIResultData.responseCode === '000000') {
        console.log('添加成功')
        this.context.router.push({
          pathname: '/supervise'
        })
      }else {
        this.setState({
          errorInfo: insured.addIResultData.responseMessage
        })
      }
      return
    }
    if(insured.updateInsuredUserSuccess === true) {
      if(insured.updateIResultData.responseCode === '000000') {
        console.log('编辑成功')
        this.context.router.push({
          pathname: '/supervise'
        })
      }else {
        this.setState({
          errorInfo: insured.updateIResultData.responseMessage
        })
      }
      return
    }
    if(insured.deleteInsuredUserSuccess === true) {
      if(insured.deleteIResultData.responseCode === '000000') {
        this.context.router.push({
          pathname: '/supervise'
        })
      }else {
        this.setState({
          errorInfo: insured.deleteIResultData.responseMessage
        })
      }
      return
    }
  }

  componentWillUnmount() {
    this.props.resetPolicyUserInfo()
  }

  setBirthDay(birthDay) {

  }

  getChoseBePeople(beInsureList) {
    return beInsureList.filter((val, index) => {
      return val.id == this.props.location.query.ide
    })
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

  onChangeBirthDay(e) {
    this.setState({
      birthDay: e.target.value
    })
  }

  onBlurCardNo() {
    const { cardNo } = this.refs
    let checkNmae = this.state.cardType === '1' ? 'idCard' : 'otherCardNo'
    let checkList = [
        {
          checkfnName: checkNmae,
          checkValue: this.state.cardNo
        }
      ]
    let errorContents = createChecker(checkList)
    if(!errorContents && this.state.cardType === '1') {
      const getEle = document.querySelector.bind(document)
      const birthDay = util.splitbirth(this.state.cardNo)
      getEle('.beInsureBirthday').value = birthDay
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

  onChangeCardType(e) {
    this.setState({
      cardType: e.target.value
    })
  }

  onChangeRelation(e) {
    this.setState({
      relation: e.target.value
    })
  }

  onChangeSex(e) {
    this.setState({
      sex: e.target.value
    })
  }

  onClickBack() {
    history.go(-1)
  }

  onClickBirthDay(e) {
    e.target.type = 'date'
  }

  onClickPreserve() {
    let checkNmae = this.state.cardType === '1' ? 'idCard' : 'otherCardNo'
    let checkList = [
      {
        checkfnName: "uName",
        checkValue: this.state.name
      },
      {
        checkfnName: checkNmae,
        checkValue: this.state.cardNo
      },
      {
        checkfnName: "mobile",
        checkValue: this.state.phoneNo
      }
    ]
    let params = {
      insurerId: this.state.insurerId || "",
      insurantName: this.state.name,
      insurantIdType: this.state.cardType,
      insurantIdNo: this.state.cardNo,
      insurantMobile: this.state.phoneNo,
      insurantRelation: this.state.relation,
      insurantBirthday: this.state.birthDay,
      insurantSex: this.state.sex
    }
    if(this.state.cardType === '1') {
      params.insurantId = this.state.insurerId
    }
    let errorContents = createChecker(checkList)
    if(errorContents === false) {
      const getEle = document.querySelector.bind(document)
      let beInsureAge = util.getAge(this.state.birthDay, getEle('#sysDate').value, false)
      sessionStorage.setItem('ageSection', '1-30')
      let ageSection = sessionStorage.getItem('ageSection').split('-')
      // if(beInsureAge > +ageSection[1] || beInsureAge < +ageSection[0]) {
      if(beInsureAge > 80 || new Date(getEle('#sysDate').value).getTime() < new Date(this.state.birthDay).getTime()) {
        this.setState({
          errorInfo: `您选择的出生日期不符合规范`
        })
        return
      }
      this.props.location.query.operation === '1' ?
      this.props.updateInsuredUserInfo(params) :
      this.props.addInsuredUserInfo(params)
    }else {
      this.setState({
        errorInfo: errorContents
      })
    }
  }

  onClickDeleteInsuret() {
    this.props.deleteInsuredUserInfo(this.state.insurerId)
  }

  renderContent(beInsure) {
    return(
      <div>
        <section className="bePeople-content">
          <div className="input-outer m-t24">
            <div className="select-tit">姓名</div>
            <input
              type="text"
              className={!!this.state.errorName ?
                'input-style input-style-error' : 'input-style'}
              placeholder="姓名"
              defaultValue={beInsure.insurantName || ""}
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
            <div className="select-tit">证件类型</div>
            <span className="select-icon"></span>
            <select className="select-cont" onChange={this.onChangeCardType.bind(this)} defaultValue={beInsure.insurantIdType || "1"}>
              <option value="1">身份证</option>
              <option value="2">护照</option>
              <option value="3">军人证</option>
              <option value="4">少儿证</option>
              <option value="5">港澳台证件</option>
            </select>
          </div>
          <div className="input-outer m-t24">
            <div className="select-tit">证件号码</div>
            <input
              type="text"
              className={!!this.state.errorCardNo ?
                'input-style input-style-error' : 'input-style'}
              placeholder="证件号码"
              maxLength="18"
              defaultValue={beInsure.insurantIdNo || ""}
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
              defaultValue={beInsure.insurantMobile || ""}
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
            <div className="select-tit">与投保人关系</div>
            <span className="select-icon"></span>
            <select className="select-cont"
              onChange={this.onChangeRelation.bind(this)}
              defaultValue={beInsure.insurantRelation || "1"}>
              <option value="1">本人</option>
              <option value="2">配偶</option>
              <option value="3">父母</option>
              <option value="4">子女</option>
            </select>
          </div>
          <div className="input-outer m-t24">
            <div className="select-tit" style={{display: 'block'}}>出生日期</div>
            <input
              type="text"
              className="input-style beInsureBirthday"
              id="birthDay"
              placeholder="出生日期"
              ref="birthDay"
              onTouchTap={this.onClickBirthDay.bind(this)}
              onChange={this.onChangeBirthDay.bind(this)}
              value={this.state.birthDay}
            />
          </div>
          <div className="input-outer m-t24">
            <div className="select-tit">性别</div>
            <span className="select-icon"></span>
            <select
              className="select-cont"
              ref="sex"
              onChange={this.onChangeSex.bind(this)}
              defaultValue={beInsure.insurantSex || "M"}
            >
              <option value="M">男</option>
              <option value="F">女</option>
            </select>
          </div>
        </section>
        <div className="policy-error">
          {this.state.errorInfo}
        </div>
        <div className="incomplete-fill-btn m-t12" onTouchTap={this.onClickPreserve.bind(this)}>
          保存信息
        </div>
        {
          this.state.addOrEdit === '0' ? '' :
            <div className="no-fill-btn m-tb24-auto" onTouchTap={this.onClickDeleteInsuret.bind(this)}>
              删除此被保人
            </div>
        }
      </div>
    )
  }

  render() {
    const { title } = this.props.route
    let insured = {}
    if(this.state.addOrEdit === '1') {
      insured = this.props.insured;
    }

    // this.state.addOrEdit === '0' ?
    // this.renderContent() :
    // (insured.getInsuredUserBegin ?
    // <Loading /> :
    // insured.getIResultData ?
    // this.renderContent(insured.getIResultData.responseData) :
    // "系统异常请稍后重试")
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        {
          this.state.addOrEdit === '0' ?
          this.renderContent({}) :
          (insured.getInsuredUserBegin ?
          <Loading /> :
          insured.getIResultData ?
          this.renderContent(this.getChoseBePeople(insured.getIResultData.responseData)[0]) :
          "系统异常请稍后重试")
        }
      </div>
    )
  }
}
export default bePeople

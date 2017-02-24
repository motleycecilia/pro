import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import {getInsuredUserInfo, getPolicyUserInfo, resetInsuredUserInfo,  preSubmit, resetPreSubmit} from 'actions'
import { App, YztApp } from 'utils/native_h5'
import { createChecker } from 'utils/checker'
import BtnLoading from 'components/btnLoading'
import confimInfo from 'mock/confim'
import util from 'utils/utils'
import Modal from 'components/modal'
import TYpes from 'utils/Types'

@connect(
  state => ({
    insured: state.insured,
    policyUser: state.policyUser,
    underwriting: state.underwriting
  }),
  {
    getInsuredUserInfo,
    getPolicyUserInfo,
    resetInsuredUserInfo,
    preSubmit,
    resetPreSubmit
  }
)
export default class fillmation extends React.Component {
  state = {
    iphoneChoseBtn: false,
    fillmationInfo: {},
    beList: [],
    englishNameList: [],
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
    showModal: false,
    content: '',
    btnLodding: false,
    isConfirm: false,
    isAgreeElement: true,
    showConfirmPolicy: false,
    ConfirmBepoleIndex: -1,
    ConfirmGuaranteeIndex: -1,
    orderNo: '',
    payOrderNo: ''
  }

  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }
  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
    this.setState({
      fillmationInfo: JSON.parse(sessionStorage.getItem("fillMationInfo"))
    })
    this.props.getPolicyUserInfo();
    this.props.getInsuredUserInfo('')
  }
  componentWillReceiveProps(nextProps) {
    const { insured, policyUser, underwriting} = nextProps
    if(insured.errorMsg === '90002' || underwriting.errorCode === '9002') {
      this.context.router.push({
        pathname: '/login'
      })
      return
    }
    if(underwriting.getPreSubmitBegin === true) {
      this.setState({
        btnLodding: true
      })
      return
    }
    if(underwriting.getPreSubmitSuccess === true) {
      YztApp.setTitle('保单信息确认')
      this.setState({
        btnLodding: false,
        ConfirmBepoleIndex: 0,
        isConfirm: true,
        orderNo: underwriting.preResultData.orderNo,
        payOrderNo: underwriting.preResultData.payOrderNo
      })
      return
    }
    if(underwriting.getPreSubmitError === true) {
      this.setState({
        btnLodding: false,
        showModal: true,
        content: underwriting.errorMsg
      })
      return
    }
    if(policyUser.getPolicyUserSuccess === true && policyUser.getResultData) {
      this.setState({
        policyName: policyUser.getResultData.insurerName,
        policyNo: policyUser.getResultData.id,
        phoneNo: policyUser.getResultData.insurerMobile,
        policyMobileNo: policyUser.getResultData.insurerMobile
      })
    }
    if(insured.getInsuredUserSuccess === true) {
      let beListId = this.props.location.query.choseBeList
      if(beListId) {
        let bePoleList = insured.getIResultData.filter((val, index) => {
          return beListId.split(",").indexOf("" +val.id) > -1 && val
        })
        let englishNameList = bePoleList.map((val, index) =>{
          return {englishName: ""}
        })
        this.setState({
          beList: bePoleList,
          englishNameList: englishNameList
        })
      }
    }
  }
  componentWillUnmount() {
    this.props.resetInsuredUserInfo()
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
      pathname: '/policyUser',
      query: {
        choseBeList: this.props.location.query.choseBeList
      }
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
    if (typeof (pa_sdcajax) === 'function') {
      pa_sdcajax('WT.ti', "保单页_确定", false,'WT.obj', 'button', false, 'DCS.dcsuri', window.location.pathname+'\/click.event', false, 'WT.pageurl','http://'+window.location.hostname+window.location.pathname, false, 'WT.pagetitle',  document.title, false, 'WT.dl', '25', false, 'DCSext.wt_click', 'page', false)
    }
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
    this.state.englishNameList.forEach((val, index) => {
      checkList.push({
        checkfnName: "checkEng",
        checkValue: val.englishName,
        errMsg: '被保人护照英文名或姓名全拼格式有误'
      })
    })
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
      let prePara = JSON.parse(sessionStorage.getItem("prePara"))
      // let checkBeDate = this.state.beList.every(function(val, index) {
      //   return util.maxDate(minDate, val.insurantBirth) && util.maxDate(val.insurantBirth, maxDate)
      // })
      let englishNameList = this.state.englishNameList
      let insurantList = this.state.beList.map((val, index) => {
        return [{
          insurantId: val.id,
          type: "1",//index === 0 ? "1" : "2"
          relation: "1",
          englishName: englishNameList[index].englishName
        }]
      })
      let insuranceInfoList = insurantList.map((val, index) => {
        return {insurantInfoList: val}
      })
      // const preParams = {
      //   serialNo: '1801ca94-1b09-4fca-a3f8-d6be5cde004f',
      //   productId: '10028680',
  		// 	productCode: '10007603',
  		// 	productInsuranceCode: 'P1130B47',
      //   skuid: '10033720',
      //   insurerInfo: {
      //     insurantId: this.state.policyNo
      //   },
      //   insuranceInfoList: insuranceInfoList,//[{insurantInfoList: insurantList}],
      //   linkManInfo: {
      //     linkManName: this.state.policyName,
      //     linkManMobileNo: this.state.policyMobileNo
      //   },
      //   invoceInfo: {
      //     invoceName: this.state.policyName,
      //     invoceHeading: this.state.ititle,
      //     invoceZipCode: this.state.zipCode,
      //     invoceMobileNo: this.state.phoneNo,
      //     invoceAddress: this.state.address
      //   }
      // }
      // console.log(preParams)
      // this.props.preSubmit(preParams)
      // return
      const preParams = {
        serialNo: prePara.serialNo,
        productId: prePara.productId,
        orderSpliteFlag: prePara.orderSpliteFlag,
  			productCode: prePara.productCode,
  			productInsuranceCode: prePara.productInsuranceCode,
        skuid: prePara.skuid,
        insurerInfo: {
          insurantId: this.state.policyNo
        },
        insuranceInfoList: insuranceInfoList,//[{insurantInfoList: insurantList}],
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
      console.log(preParams)
      this.props.preSubmit(preParams)
    }else {
      this.setState({
        errorInfo: errorContents
      })
    }
  }
  onBlurEngName(i, e) {
    let englishNameLists = this.state.englishNameList
    englishNameLists[i].englishName = e.target.value.trim()
    this.setState({
      englishNameList: englishNameLists
    })
  }
  onClickConfimPolicy() {
    this.setState({
      showConfirmPolicy: !this.state.showConfirmPolicy
    })
  }
  onClickPay() {
    this.setState({
      btnLodding: true
    })
    if (typeof (pa_sdcajax) === 'function') {
      pa_sdcajax('WT.ti', "保单页_立即支付", false,'WT.obj', 'button', false, 'DCS.dcsuri', window.location.pathname+'\/click.event', false, 'WT.pageurl','http://'+window.location.hostname+window.location.pathname, false, 'WT.pagetitle',  document.title, false, 'WT.dl', '25', false, 'DCSext.wt_click', 'page', false)
    }
    const sso = JSON.parse(sessionStorage.getItem('sso'))
    const preMiumPara = JSON.parse(sessionStorage.getItem('prePara'))
    const orderNo = this.state.orderNo//'20170208017363391'//
    const payOrderNo = this.state.payOrderNo//'2017020801664619'//
    window.location.href = `https://m.pingan.com/chaoshi/payPre/life/index.shtml?channel=1982&channelSecond=1982003&platId=999201007&payClassify=13&orderNo=${orderNo}&payOrderNo=${payOrderNo}&digest=&from=wap-chaoshi&productSide=&customid&hook=${location.href}&ssoTicket=${sso.ssoTicket}&timestamp=${sso.timestamp}&sign=${sso.sign}`//
    //hook: 出现异常页面pa18-wapmall-dmzstg1.pingan.com.cn:53443
    //订单页面 收银台固定
    //${location.protocol}//${location.hostname}:${location.port}${location.pathname}?productId=${preMiumPara.productId}&productCode=${preMiumPara.productCode}
  }
  goto() {
    this.setState({
      showModal: false
    })
  }
  onClickConfirmBepole(index) {
    this.setState({
      ConfirmBepoleIndex: index === this.state.ConfirmBepoleIndex ? -1 : index
    })
  }
  onClickConfirmGuarantee(index) {
    this.setState({
      ConfirmGuaranteeIndex: index === this.state.ConfirmGuaranteeIndex ? -1 : index
    })
  }
  onClickStatement(category) {
    this.context.router.push({
      pathname: '/guarantee',
      query: {
        productId: this.state.productId,
        category: category
      }
    })
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
          <div key={index}>
            <div className="col-line-threeetbd">
              <div className="col-line-with">
                <span className="delete-icon-btn m-l3" onTouchTap={this.onClickDeleteBepole.bind(this,index)}>
                </span>
                {
                  val.insurantName
                }
              </div>
              <span className="icon-max-right" onTouchTap={this.onClickEditBepole.bind(this, val.id)}></span>
            </div>
            <div className="row-box-list">
              <div className="col-fill-be-pinyin">
                <input type="text" placeholder="请输入护照英文名或姓名全拼" className="fill-be-pinyin" onBlur={this.onBlurEngName.bind(this, index)}/>
              </div>
            </div>
          </div>
        )
      })
    )
  }
  renderConfirmbePeoplet(insuranceInfoList) {
    return(
      insuranceInfoList.map((val, index) => {
        return(
          <div className="confirm-center-contents" key={index}>
            <div className="center-content">
              <div className="col-line-fillmation" onTouchTap={this.onClickConfirmBepole.bind(this, index)}>
                <span>{val.insurantName}</span>
                {
                  false && <span className={val.policyInfo.detailOrderMemo === "OK" ? "col-line-cr" : "col-line-cr color-red"}>
                    {
                      val.policyInfo.detailOrderMemo === "OK" ? "保费  " + val.policyInfo.actualPremium : "未通过核保"
                    }
                  </span>
                }
                <span className={this.state.ConfirmBepoleIndex === index ? "icon-max-up" : "icon-max-down"}></span>
              </div>
              <div className={this.state.ConfirmBepoleIndex === index ? "" : "hide"}>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    证件号码
                  </span>
                  <span className="fill-content-txt">
                    {val.insurantIdno}
                  </span>
                </div>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    手机号码
                  </span>
                  <span className="fill-content-txt">
                    {val.mobile}
                  </span>
                </div>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    生日
                  </span>
                  <span className="fill-content-txt">
                    {val.insurantBirth}
                  </span>
                </div>
                {
                  false && <div className="p-b-20">
                    <span className="fill-content-tit">
                      与投保人关系
                    </span>
                    <span className="fill-content-txt">
                      {TYpes.relation[val.relation]}
                    </span>
                  </div>
                }
                {
                  false && val.policyInfo.detailOrderMemo !== "OK" && <div className="p-b-20">
                    <span className="fill-content-tit">
                      未通过核保
                    </span>
                    <span className="fill-content-txt confim-be-error">
                      {val.policyInfo.detailOrderMemo}
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        )
      })
    )
  }
  renderConfirmbePeople(insuranceInfoList) {
    return(
      insuranceInfoList.map((val, index) => {
        return(
          <div className="confirm-center-contents" key={index}>
            <div className="center-content">
              <div className="col-line-fillmation" onTouchTap={this.onClickConfirmBepole.bind(this, index)}>
                <span>{val.insurantInfoList[0].insurantName}</span>
                <span className={val.policyInfo.detailOrderMemo === "OK" ? "col-line-cr" : "col-line-cr color-red"}>
                  {
                    val.policyInfo.detailOrderMemo === "OK" ? "保费  " + val.policyInfo.actualPremium : "未通过核保"
                  }
                </span>
                <span className={this.state.ConfirmBepoleIndex === index ? "icon-max-up" : "icon-max-down"}></span>
              </div>
              <div className={this.state.ConfirmBepoleIndex === index ? "" : "hide"}>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    证件号码
                  </span>
                  <span className="fill-content-txt">
                    {val.insurantInfoList[0].insurantIdno}
                  </span>
                </div>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    手机号码
                  </span>
                  <span className="fill-content-txt">
                    {val.insurantInfoList[0].mobile}
                  </span>
                </div>
                <div className="p-b-20">
                  <span className="fill-content-tit">
                    生日
                  </span>
                  <span className="fill-content-txt">
                    {val.insurantInfoList[0].insurantBirth}
                  </span>
                </div>
                {
                  false && <div className="p-b-20">
                    <span className="fill-content-tit">
                      与投保人关系
                    </span>
                    <span className="fill-content-txt">
                      {TYpes.relation[val.insurantInfoList[0].relation]}
                    </span>
                  </div>
                }
                {
                  val.policyInfo.detailOrderMemo !== "OK" && <div className="p-b-20">
                    <span className="fill-content-tit">
                      未通过核保
                    </span>
                    <span className="fill-content-txt confim-be-error">
                      {val.policyInfo.detailOrderMemo}
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        )
      })
    )
  }
  renderGuarantee(planList) {
    return(
      [0, 1, 2].map((val, index) => {
        return(
          <li key={index}>
            <a href="javascript: void(0);" className="arrow-down showInfo" onTouchTap={this.onClickConfirmGuarantee.bind(this, index)}>
              <div className="content-list-title">
                <span className="project-name">文件佛教</span>
                <span className="money">我懂你今晚都</span>
              </div>
            </a>
            <div className={index === this.state.ConfirmGuaranteeIndex ? "content-list-text" : "content-list-text hide"}>
              <p>
                发未分配文件访贫问苦
              </p>
            </div>
          </li>
        )
      })
    )
  }
  renderNowPayBtn() {
    return(
      <div className="complete-fill-btn" onTouchTap={::this.onClickPay}>
        立即支付
      </div>
    )
  }
  renderInsure(preResultData) {
    return(
      <div>
        <div className="confirm-center-tit">
          投保人
        </div>
        <div className="confirm-center-contents">
          <div className="center-content">
            <div className="col-line-fillmation" onTouchTap={::this.onClickConfimPolicy}>
              <span>{preResultData.orderSpliteFlag === "0" ? preResultData.invoceInfo.insurantName :  preResultData.policyholdersInfo.insurantName}</span>
              <span className={this.state.showConfirmPolicy ? "icon-max-up" : "icon-max-down"}></span>
            </div>
            <div className={this.state.showConfirmPolicy ? "" : "hide"}>
              <div className="p-b-20">
                <span className="fill-content-tit">
                  身份证号
                </span>
                <span className="fill-content-txt">
                  {preResultData.orderSpliteFlag === "0" ? preResultData.invoceInfo.insurantIdno : preResultData.policyholdersInfo.insurantIdno}
                </span>
              </div>
              <div className="p-b-20">
                <span className="fill-content-tit">
                  手机号码
                </span>
                <span className="fill-content-txt">
                  {preResultData.orderSpliteFlag === "0" ? preResultData.invoceInfo.mobile : preResultData.policyholdersInfo.mobile}
                </span>
              </div>
              <div className="p-b-20">
                <span className="fill-content-tit">
                  电子邮箱
                </span>
                <span className="fill-content-txt">
                  {preResultData.orderSpliteFlag === "0" ? preResultData.invoceInfo.email : preResultData.policyholdersInfo.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderConfirm(preResultData) {
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title="保单信息确认"/>
        <div className="fillbox">
          <div className="product-intro white-bg">
            <div className="p-l-10">
              <dl>
                <dt>保险名称</dt>
                <dd>
                  {
                    preResultData.productName
                  }
                </dd>
              </dl>
            </div>
            {
              false && <div className="p-l-10">
                <dl>
                  <dt>旅行目的地</dt>
                  <dd>🇮🇹、🇵🇱、🇬🇷、🇦🇺</dd>
                </dl>
              </div>
            }
            <div className="p-l-10">
              <dl>
                <dt>套餐类型</dt>
                <dd>
                  {
                    this.state.fillmationInfo && this.state.fillmationInfo.name
                  }
                </dd>
              </dl>
            </div>
            <div className="confirm-top-date">
              <div className="confirm-date-tit">
                保障时间
              </div>
              <div className="confirm-date-dates">
                <p>{preResultData.orderSpliteFlag === "0" ? preResultData.policyInfo.insuranceStartTime :  preResultData.insuranceInfoList[0].policyInfo.insuranceStartTime}起</p>
                <p>{preResultData.orderSpliteFlag === "0" ? preResultData.policyInfo.insuranceEndTime : preResultData.insuranceInfoList[0].policyInfo.insuranceEndTime}止</p>
              </div>
            </div>
          </div>

            {
              preResultData.orderSpliteFlag !== "0" && this.renderInsure(preResultData)
            }
          <div className="confirm-center-tit">
            被保人
          </div>
            {
              preResultData.orderSpliteFlag === "0" ? this.renderConfirmbePeoplet(preResultData.insurantInfoList) : this.renderConfirmbePeople(preResultData.insuranceInfoList)
            }
          <div className="content white-bg m-t10">
            {
              false && <div>
                <div className="content-title">保障范围</div>
                <div className="content-list content0">
                  <ul>
                    {
                      this.renderGuarantee()
                    }
                  </ul>
                </div>
              </div>
            }
            <div className="bottom-line"></div>
          </div>
          {
            false && <div className="confirm-pre-money">
              保单测算金额： <span className="txt-through">￥234234.00</span>
            </div>
          }
          <div className="confirm-fill-money">
            实际保额: ￥{preResultData.payPrem}
          </div>
          {
            this.state.btnLodding ?
            this.renderLoddingBtn() :
            this.renderNowPayBtn()
          }

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
      <div className="complete-fill-btn-sub" onTouchTap={::this.onClickpreSubmit}>确定</div>
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
                <dd>{
                    this.state.fillmationInfo && this.state.fillmationInfo.productName
                  }</dd>
              </dl>
            </div>
            <div className="p-l-10">
              <dl>
                <dt>套餐类型</dt>
                <dd>{
                    this.state.fillmationInfo && this.state.fillmationInfo.name
                  }</dd>
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
                  {
                    policyUser && policyUser.insurerName
                  }
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
            {
              false && <div className="m-r10" onTouchTap={::this.onClickAgreeElement}>
                <input type="checkbox" className="ipt-checkbox" id="cbx-2"/>
                <label className="lab-checkbox2" htmlFor="cbx-2"></label>
              </div>
            }
          </div>
          <div className="fillmation-footer">
            <p>
              点击{'"确定"'}即表示你阅读并同意
            </p>
            <p>
              <span className="col-1da4f9" onTouchTap={this.onClickStatement.bind(this, 5)}>《投保须知》</span>和
              <span className="col-1da4f9" onTouchTap={this.onClickStatement.bind(this, 2)}>《保险条款》</span>
            </p>
          </div>
          {
            !this.state.btnLodding && <div className="policy-error fill-error">
              {this.state.errorInfo}
            </div>
          }
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
          policyUser.getPolicyUserBegin === true ? <Loading /> :
          !this.state.isConfirm && policyUser.getPolicyUserSuccess === true ?  this.renderContent(policyUser.getResultData) : ''
        }
        {
          this.state.isConfirm && this.renderConfirm(underwriting.preResultData)
          // this.state.isConfirm && this.renderConfirm(confimInfo.responseData)
        }
        {
          this.state.showModal && <Modal content={this.state.content} goto={this.goto.bind(this)} />
        }
      </div>
    )
  }
}
export default fillmation

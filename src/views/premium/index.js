import React, { PropTypes } from 'react'
import Link from 'valuelink'
import Header from 'components/Header'
import {connect} from 'react-redux'
import { createChecker } from 'utils/checker'
import { getUrlParam } from 'utils/urlParams.js'
import Country from 'components/country'
import { App, YztApp } from 'utils/native_h5'
import { queryDetilInfo, premiumMeasure, premiumMeasureReset, getUpdateInfo } from 'actions'
import util from 'utils/utils'
import Loading from 'components/loading'
import Modal from 'components/modal'
import TYpes from 'utils/Types'
import BtnLoading from 'components/btnLoading'
import preInfo from 'mock/pre'
import detsInfo from 'mock/dets'

@connect(
  state => ({
    detailInfo: state.detailInfo,
    premiumInfo: state.premiumInfo,
    loginInfo: state.loginInfo
  }),
  {
    queryDetilInfo,
    premiumMeasure,
    premiumMeasureReset,
    getUpdateInfo
  }
)

export default class premium extends React.Component {
  state = {
    startDate: '',
    endDate: '',
    content: '',
    productNmae: '',
    isShowCountry: false,
    isShowAddCountry: false,//是否旅游类型
    countrys: [],
    name: '',
    bePeopleDate: [],
    guaranteePeriod: 0,
    insurancePriodUnit: '',
    showModal: false,
    premiumStatus: 0,
    serialNo: '',
    errorContent: '',
    premiumInfos: [],
    totalPayPrem: 0,
    tourismName: '单次',
    tourismKey: '0'
  }

  componentWillMount() {
    this.props.queryDetilInfo(10013242)
    // this.props.queryDetilInfo(10028680, 10007603)
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  componentWillReceiveProps(nextProps) {
    const { detailInfo, premiumInfo, loginInfo } = nextProps
    if(detailInfo.getDetailSuccess === true) {
      let insurantUnit = detailInfo.detail.insurancePriodUnit
      this.setState({
        productNmae: detailInfo.detail.productName,
        skuId: detailInfo.detail.typelist[0].skuId || '10033720',
        productInsuranceCode: detailInfo.detail.typelist[0].productInsuranceCode,
        name: detailInfo.detail.typelist[0].priceName,
        guaranteePeriod: insurantUnit === 'Y' ? 12 * detailInfo.detail.insurancePriod : detailInfo.detail.insurancePriod,//保险期限
        insurancePriodUnit: insurantUnit === 'Y' ? 'M' : insurantUnit,//保险期限单位
        isShowAddCountry: TYpes.tourism.indexOf("" + detailInfo.detail.secondLevelType) > -1 ? true : false// 产品分类是否旅游类型
      })
    }
    if(premiumInfo.measurePremiumBegin === true) {
      this.setState({
        premiumStatus: 2
      })
      return
    }
    if(premiumInfo.measurePremiumSuccess === true) {
      this.setState({
        premiumStatus: 1,
        serialNo: preInfo.result.serialNo,//premiumInfo.premiumResultData.serialNo
        errorContent: '',
        premiumInfos: preInfo.result.payPremList,//premiumInfo.premiumResultData.payPremList
        totalPayPrem: preInfo.result.totalPayPrem//premiumInfo.premiumResultData.totalPayPrem
      })
    }
    if(premiumInfo.measurePremiumError === true) {
      this.setState({
        showModal: true,
        content: premiumInfo.errorMsg
      })
      return
    }
    if(loginInfo.appLoginSuccess === true){
      this.context.router.push({
        pathname: '/fillmation',
        query: {
          productId: this.props.location.query.productId,
          productCode: this.props.location.query.productCode
        }
      })
      return
    }
    if(loginInfo.appLoginError === true) {
      if(loginInfo.errorCode === '90002') {//APP未登录
        YztApp.accessNativeModule('patoa://pingan.com/login', () => {
        })
      }
      return
    }
    if (loginInfo.getUpDataInfoSuccess) {
      const preMiumPara = {
        productId: this.props.location.query.productId,
        insurancePriod: detailInfo.detail.insurancePriod,
        insurancePriodUnit: detailInfo.detail.insurancePriodUnit,
        productCode: detailInfo.detail.productCode,
        skuId: this.state.skuId,
        productInsuranceCode: this.state.productInsuranceCode,
        serialNo: this.state.serialNo
      }
      sessionStorage.setItem('preMiumPara', JSON.stringify(preMiumPara))
      if(!App.isNative){
          sessionStorage.setItem('sso',JSON.stringify({ssoTicket:loginInfo.upDataInfo.SSOTicket,
              timestamp:loginInfo.upDataInfo.timestamp,
              sign:loginInfo.upDataInfo.signature}))
      }
      sessionStorage.setItem('clientNo',loginInfo.upDataInfo.clientNo);
      let urlMap = api.getUpdateUrl(),
          symbol = loginInfo.upDataInfo?loginInfo.upDataInfo.targetURLSymbol:'';
      if(symbol && urlMap[symbol]){//跳转升级
          let {origin,pathname,hash,href,search} = location;
          let pre  = encodeURIComponent(`${href}`),
              next = encodeURIComponent(`${origin}${pathname}${search}&updated=true${hash}`);
          location.href = urlMap[symbol]+`?preLink=${pre}&nextLink=${encodeURIComponent(next)}`
      }
      if(symbol && symbol==='04'){//查询是否满足18岁
        this.context.router.push({
          pathname: '/welding'
        })
      }
    }
  }
  goto() {
    this.setState({
      showModal: false
    })
  }
  onClickBack() {
    history.go(-1)
  }
  onClickRight() {
    console.log(1)
  }
  onClickChoseOption(val) {
    this.setState({
      name: val.priceName,
      premiumStatus: 0,
      skuId: val.skuId,
      productInsuranceCode: val.productInsuranceCode
    })
  }
  onClickChoseTourismName(name, key) {
    this.setState({
      tourismName: name,
      tourismKey: key
    })
    console.log(this.state.tourismKey)
  }
  onClickCountry(name) {
    let country = this.state.countrys
    country.indexOf(name)> -1 ? '' : country.push(name)
    this.setState({
      isShowCountry: false,
      countrys: country
    })
  }
  onClickDeleteCountry(index) {
    let country = this.state.countrys
    country.splice(index, 1)
    this.setState({
      countrys: country
    })
  }
  onClickIsAddCountry(flag) {
    this.setState({
      isShowCountry: flag,
      premiumStatus: 0
    })
  }
  onClickDeleteBeDate(index) {
    console.log(index)
    console.log(this.state.bePeopleDate)
    let bePeopleDates = this.state.bePeopleDate
    bePeopleDates.splice(index, 1)
    this.setState({
      bePeopleDate: bePeopleDates
    })
  }
  onClickMeasurePremium() {
    let checkList = [{
        checkfnName: "checkEmpty",
        checkValue: this.state.startDate,
        errMsg: '请选择开始时间'
      },
      {
        checkfnName: "checkEmpty",
        checkValue: this.state.endDate,
        errMsg: '请选择结束时间'
      }
    ]
    if(this.state.countrys.length === 0 && this.state.isShowAddCountry) {
      checkList.unshift({
        checkfnName: "checkValLength",
        checkValue: this.state.countrys,
        errMsg: '请选择旅游目的地'
      })
    }
    if(util.maxDate(this.state.startDate, this.state.endDate) === true) {
      this.setState({
        errorContent: "开始时间不能晚于结束时间"
      })
      return
    }
    let errorContents = createChecker(checkList)
    if(errorContents === false) {
      let checkBeDate = this.state.bePeopleDate.every(function(val, index) {
        return !!val.insurantBirth
      })
      if(this.state.bePeopleDate.length > 0 && checkBeDate === true) {
        const policyInfos = {
          insuranceBeginTime: this.state.startDate,
          insuranceStartTime: this.state.startDate,
          insuranceEndTime: this.state.endDate,
          insurancePeriod: this.state.isShowAddCountry === true ? util.DateDiff(this.state.startDate, this.state.endDate) : this.state.guaranteePeriod,
          insurancePriodUnit: this.state.isShowAddCountry === true ? 'D' : this.state.insurancePriodUnit
        }
        const insuranceInfoList = this.state.bePeopleDate.map((val, index)=> {
          return {
            policyInfo: policyInfos,
            insurantInfoList: [val],
          }
        })
        console.log(JSON.stringify(insuranceInfoList))
        const params = {
          serialNo: this.state.serialNo,
          skuId: this.state.skuId,
          productInsuranceCode: this.state.productInsuranceCode,
          productId: this.props.location.query.productId,
          productCode: this.props.location.query.productCode,
          insurantInfoList: insuranceInfoList
        }
        this.props.premiumMeasure(params)
      }else {
        this.setState({
          errorContent: "被保险人出生日期不能为空"
        })
      }
      return
    }
    this.setState({
      errorContent: errorContents
    })
  }
  onClickInsure() {
    const fillMationInfo = {
      productName: this.state.productNmae,
      name: this.state.name
    }
    sessionStorage.setItem("fillMationInfo",JSON.stringify(fillMationInfo))
    this.props.getUpdateInfo()
  }
  addBepoleDate() {
    let bePeopleDates = this.state.bePeopleDate
    bePeopleDates.push({
      insurantSex:'F',
      insurantBirth: '',
      type: '1',
      personType: '2',
      relation: '1',
      insurantCount: '1',
      "planInfoList": [{
        "benLevel": "00",
        "planCode": "P033501",
        "sumIns": 350000,
        "premType": 1,
        "premTerm": 12
      }],
    })
    this.setState({
      premiumStatus: 0,
      bePeopleDate: bePeopleDates
    })
  }
  onFocusPhone() {
    const { phone } = this.refs
    if (!this.state.phone) {
      phone.setAttribute('placeholder', '')
      phone.previousSibling.style.display = 'block'
    }
  }
  onChangeBepopleDate(index, e) {
    let bePeopleDates = this.state.bePeopleDate
    bePeopleDates[index].insurantBirth = e.target.value
    this.setState({
      bePeopleDate: bePeopleDates
    })
    console.log(this.state.bePeopleDate)
  }
  onChageStartDate(e) {
    this.setState({
      startDate: e.target.value,
      premiumStatus: 0
    })
    if(this.state.isShowAddCountry === false) {
      this.setState({
        endDate: util.getEndDatet(e.target.value, this.state.guaranteePeriod, this.state.insurancePriodUnit)
      })
    }
  }
  onChangeEndDate(e) {
    this.setState({
      endDate: e.target.value,
      premiumStatus: 0
    })
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
  renderChoseCountry() {
    return(
      this.state.countrys.map((val, index) => {
        return(
          <div className="col-line-with pre-col-city" key={index}>
            <span className="delete-icon-btn m-l3" onTouchTap={this.onClickDeleteCountry.bind(this, index)}>
            </span>
            {
              this.state.countrys[index]
            }
          </div>
        )
      })
    )
  }
  renderPackageType(typelist) {
    return(
      typelist.map((val, index) => {
        return(
          <div className="col-line-for m-t24" key={index}>
            <div>
              {
                val.priceName
              }
            </div>
            <div className={this.state.skuId == val.skuId ? "lab-checkbox-contain lab-contain-chose" : "lab-checkbox-contain"}>
              <span className="lab-checkbox-2" htmlFor="cbx-3" onTouchTap={this.onClickChoseOption.bind(this, val)}></span>
              <span className="checbox-chose"></span>
            </div>
          </div>
        )
      })
    )
  }
  renderTourism() {
    return(
      [{name: '单次', key: '0'}, {name: '多次', key: '1'}].map((val, index) => {
        return(
          <div className="col-line-for m-t24" key={index}>
            <div>
              {
                val.name
              }
              <p className="m-t8">
              </p>
            </div>
            <div className={this.state.tourismName === val.name ? "lab-checkbox-contain lab-contain-chose" : "lab-checkbox-contain"}>
              <span className="lab-checkbox-2" htmlFor="cbx-3" onTouchTap={this.onClickChoseTourismName.bind(this, val.name, val.key)}></span>
              <span className="checbox-chose"></span>
            </div>
          </div>
        )
      })
    )
  }
  renderTourismContent() {
    return(
      <div className="pre-center-package">
        <p>旅游类型</p>
        {
          this.renderTourism()
        }
      </div>
    )
  }
  renderBePopleDate() {
    return(
      this.state.bePeopleDate.map((val, index) => {
        let i = index
        return(
          <div className="col-line-threeetbd" key={index}>
            <div className="col-line-with">
              <span className="delete-icon-btn m-l3" onTouchTap={this.onClickDeleteBeDate.bind(this, i)}>
              </span>
              <input type="date" placeholder="被保人出生日期" value={this.state.bePeopleDate[index].insurantBirth || ""} className="premium-chose-date" onChange={this.onChangeBepopleDate.bind(this, i)}/>
            </div>
            <span>￥
              {this.state.premiumInfos[index] ? this.state.premiumInfos[index].payPrem : 0}
              /人</span>
          </div>
        )
      })
    )
  }
  renderEndDate() {
    return(
      <section className="pre-date-tr">
        <div className="input-outer">
          <div className="select-tit">结束时间</div>
          <input
            type="date"
            className="input-style"
            placeholder="结束时间"
            onChange={this.onChangeEndDate.bind(this)}
            value={this.state.endDate || ""}
          />
        </div>
      </section>
    )
  }
  renderEndDateText() {
    return(
      <section className="pre-date-tr">
        <div className="input-outer">
          <div className="select-tit">结束时间</div>
          <input
            type="text"
            className="input-style"
            placeholder="结束时间"
            readOnly
            value={this.state.endDate}
          />
        </div>
      </section>
    )
  }
  renderPremiumBtn() {
    return(
      <div className="complete-fill-btn position-rela"
        onTouchTap={this.onClickMeasurePremium.bind(this)}>测算保费</div>
    )
  }
  renderInsureBtn() {
    return(
      <div className="pre-btn">
        <span className="pre-btn-left">保费总额：{this.state.totalPayPrem}元</span>
        <span className="pre-btn-right" onTouchTap={this.onClickInsure.bind(this)}>
          <span className="pre-btn-rbtn">
            立即投保
          </span>
        </span>
      </div>
    )
  }
  renderPremium(detailInfo) {
    return(
      <div>
        <div className="premium-waner">
          {
            this.state.isShowAddCountry && <div className="pre-header-line">
              <span className="pre-header-txt">
                旅游目的地
              </span>
              <div className="btn-add-icon pre-header-btn" onTouchTap={this.onClickIsAddCountry.bind(this, true)}>
                  <span className="add-icon-imgs"></span>
                  <span className="add-icon-txt">添加</span>
              </div>
            </div>
          }
          <div className="pre-col-citys">
            {
              this.renderChoseCountry()
            }
            <div className="clear"></div>
          </div>
          <div className="pre-center-package">
            <p>套餐类型</p>
            {
              this.renderPackageType(detailInfo.priceList)
            }
          </div>
          {
            this.state.isShowAddCountry && this.renderTourismContent()
          }
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
                  onChange={this.onChageStartDate.bind(this)}
                  value={this.state.startDate || ''}
                />
              </div>
            </section>
            {
              this.state.isShowAddCountry ? this.renderEndDate() : this.renderEndDateText()
            }
            <p className="pre-decribes">
              *如果用于办理签证，建议选择旅行日期时间前后各延长2天，详询使馆
            </p>
            <div className="col-line-threee col-no-bd">
              <span>被保险人</span>
              <div className="btn-add-icon" onTouchTap={this.addBepoleDate.bind(this)}>
                  <span className="add-icon-imgs"></span>
                  <span className="add-icon-txt">添加</span>
              </div>
            </div>
            {
              this.renderBePopleDate()
            }
          </div>
          <div className="p-lr-13 errorMsg">
            {
              !!this.state.errorContent && this.state.errorContent
            }
          </div>
          <div className="pre-tail">
          </div>
          {
            this.state.premiumStatus === 0 ?
            this.renderPremiumBtn() : (
              this.state.premiumStatus === 1 ?
              this.renderInsureBtn() : <BtnLoading />
            )
          }
        </div>
      </div>
    )
  }
  render() {
    const { detailInfo } = this.props
    return(
      <div>
        {
          this.state.isShowCountry ?
          <Header
            isVisibility={true}
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
          // this.state.isShowCountry ?
          // <Country
          //   onClickCountry={this.onClickCountry.bind(this)}
          //   onClickBacks={this.onClickIsAddCountry.bind(this, false)}
          // /> : detailInfo.getDetailSuccess === true ? this.renderPremium(detailInfo.detail) : <Loading />
          this.state.isShowCountry ?
          <Country
            productId={this.props.location.query.productId}
            onClickCountry={this.onClickCountry.bind(this)}
            onClickBacks={this.onClickIsAddCountry.bind(this, false)}
          /> : detailInfo.getDetailSuccess === true ? this.renderPremium(detsInfo.result) : <Loading />
        }
        {
          this.state.showModal && <Modal content={this.state.content} goto={this.goto.bind(this)} />
        }
      </div>
    )
  }
}
export default premium

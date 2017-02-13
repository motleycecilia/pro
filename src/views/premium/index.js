import React, { PropTypes } from 'react'
import Link from 'valuelink'
import Header from 'components/Header'
import {connect} from 'react-redux'
import { createChecker } from 'utils/checker'
import { getUrlParam } from 'utils/urlParams.js'
import Country from 'components/country'
import { App, YztApp } from 'utils/native_h5'
import { queryDetilInfo, premiumMeasure, premiumMeasureReset, AppUserLogin, getUpdateInfo, resetUpdataInfo } from 'actions'
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
    getUpdateInfo,
    AppUserLogin,
    resetUpdataInfo
  }
)

export default class premium extends React.Component {
  state = {
    loodNum: 0,
    startDate: '',
    endDate: '',
    content: '',
    productNmae: '',
    isShowCountry: false,
    isShowAddCountry: false,//是否旅游类型
    countrys: [],
    name: '',
    bePeopleDate: [],
    productPriod: false,//保障期限是否为年
    insurancePriod: 0,//保障期限
    endPriod: 0,
    endPriodUnit: 'D',
    minPeriod: '',
    maxPeriod: '',
    periodMinUnit: '',
    periodMaxUnit: '',
    insurancePriodUnit: '',
    showModal: false,
    premiumStatus: 0,
    serialNo: '',
    errorContent: '',
    premiumInfos: [],
    totalPayPrem: 0,
    tourismKey: '0',
    currentTime: '',
    skuId: '',
    minInsureAge: 0,
    maxInsureAge: 2,
    maxInsureAgeUnit: 'Y',
    minInsureAgeUnit: 'D',
    minBirthDay: '',
    maxBirthDay: ''
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    // this.props.queryDetilInfo(10013242)
    // this.props.queryDetilInfo(10028680, 10007603)
    this.props.queryDetilInfo(this.props.location.query.productId, this.props.location.query.productCode)
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  componentWillReceiveProps(nextProps) {
    const { detailInfo, premiumInfo, loginInfo } = nextProps
    if(detailInfo.getDetailSuccess === true && this.state.loodNum === 0) {
      let insurantUnit = detailInfo.detail.insurancePriodUnit//detsInfo.result.insurancePriodUnit//
      const getEle = document.querySelector.bind(document)
      getEle('#sysDate').value = detailInfo.detail.currentTime.substring(0, 10)//detsInfo.result.currentTime.substring(0, 10) //
      this.setState({
        loodNum: 1,
        // productNmae: detsInfo.result.productName,
        // skuId: detsInfo.result.priceList[0].skuId || '10033720',
        // productInsuranceCode: detsInfo.result.priceList[0].productInsuranceCode,
        // name: detsInfo.result.priceList[0].priceName,
        // minPeriod: detsInfo.result.insuranceProductTerms[0].minValue,
        // maxPeriod: detsInfo.result.insuranceProductTerms[0].maxValue,
        // periodMinUnit: detsInfo.result.insuranceProductTerms[0].minValueUnit,
        // periodMaxUnit: detsInfo.result.insuranceProductTerms[0].maxValueUnit,
        // insurancePriod: insurantUnit === 'Y' ? "" + (12 * detsInfo.result.insurancePriod.split("-")[0]) : detsInfo.result.insurancePriod.split("-")[0],//保险期限
        // productPriod: insurantUnit === 'Y' ? true : false,
        // endPriod: insurantUnit === 'Y' ? "12" : detsInfo.result.insurancePriod.split("-")[1],
        // endPriodUnit: insurantUnit === 'Y' ? 'M' : insurantUnit,
        // currentTime: detsInfo.result.currentTime,
        // minInsureAge: detsInfo.result.minInsureAge,
        // maxInsureAge: detsInfo.result.maxInsureAge,
        // maxInsureAgeUnit: detsInfo.result.maxInsureAgeUnit,
        // minInsureAgeUnit: detsInfo.result.minInsureAgeUnit,
        // insurancePriodUnit: insurantUnit === 'Y' ? 'M' : insurantUnit,//保险期限单位
        // isShowAddCountry: TYpes.productS.indexOf("" + detsInfo.result.productId) > -1 ? true : false//根据产品ID判断旅游型
        productNmae: detailInfo.detail.productName,
        skuId: detailInfo.detail.priceList[0].skuId || '10033720',
        productInsuranceCode: detailInfo.detail.priceList[0].productInsuranceCode,
        name: detailInfo.detail.priceList[0].priceName,
        minPeriod: detailInfo.detail.insuranceProductTerms[0].minValue,
        maxPeriod: detailInfo.detail.insuranceProductTerms[0].maxValue,
        periodValueUnit: detailInfo.detail.insuranceProductTerms[0].maxValueUnit,
        insurancePriod: insurantUnit === 'Y' ? 12 * detailInfo.detail.insurancePriod.split("-")[0] : detailInfo.detail.insurancePriod[0],//保险期限
        productPriod: insurantUnit === 'Y' ? true : false,
        currentTime: detailInfo.detail.currentTime.substring(0, 10),
        minInsureAge: detailInfo.detail.minInsureAge,
        maxInsureAge: detailInfo.detail.maxInsureAge,
        periodMinUnit: detailInfo.detail.insuranceProductTerms[0].minValueUnit,
        periodMaxUnit: detailInfo.detail.insuranceProductTerms[0].maxValueUnit,
        minInsureAgeUnit: detailInfo.detail.minInsureAgeUnit,
        maxInsureAgeUnit: detailInfo.detail.maxInsureAgeUnit,
        insurancePriodUnit: insurantUnit === 'Y' ? 'M' : insurantUnit,//保险期限单位
        isShowAddCountry: TYpes.productS.indexOf("" + detailInfo.detail.productId) > -1 ? true : false// 产品分类是否旅游类型
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
        errorContent: '',
        // serialNo: preInfo.result.serialNo,
        // premiumInfos: preInfo.result.payPremList,
        // totalPayPrem: preInfo.result.totalPayPrem
        serialNo: premiumInfo.premiumResultData.serialNo,
        premiumInfos: premiumInfo.premiumResultData.payPremList,
        totalPayPrem: premiumInfo.premiumResultData.totalPayPrem
      })
    }
    if(premiumInfo.measurePremiumError === true) {
      this.setState({
        showModal: true,
        content: premiumInfo.errorMsg
      })
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
      if(loginInfo.errorCode === '900002') {//APP未登录
        YztApp.accessNativeModule('patoa://pingan.com/login', () => {
        })
      }
      return
    }
    if(loginInfo.getUpDataInfoFail) {
      if(loginInfo.errorCode === '900002') {//APP未登录
        YztApp.accessNativeModule('patoa://pingan.com/login', () => {
        })
      }
      return
    }
    if (loginInfo.getUpDataInfoSuccess === true) {
      const preMiumPara = {
        productId: this.props.location.query.productId,
        insurancePriod: this.state.insurancePriod,
        insurancePriodUnit: this.state.insurancePriodUnit,
        productCode: this.props.location.query.productCode,
        skuId: this.state.skuId,
        productInsuranceCode: this.state.productInsuranceCode,
        serialNo: this.state.serialNo
      }
      sessionStorage.setItem('preMiumPara', JSON.stringify(preMiumPara))
      sessionStorage.setItem('sso',JSON.stringify({ssoTicket:loginInfo.upDataInfo.SSOTicket,
        timestamp:loginInfo.upDataInfo.timestamp,
        sign:loginInfo.upDataInfo.signature}))
      sessionStorage.setItem('clientNo',loginInfo.appLoginResult.clientNo);
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
  componentWillUnmount() {
    this.props.premiumMeasureReset()
    this.props.resetUpdataInfo()
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
    location.href = "http://www.cmjd.net/xxdt/danger/"
  }
  onClickChoseOption(val) {
    this.setState({
      name: val.priceName,
      premiumStatus: 0,
      skuId: val.skuId,
      productInsuranceCode: val.productInsuranceCode
    })
  }
  onClickChoseTourismName(key) {
    let edDate = key === "0" ? "" : ""+util.replaceAll(util.getEndDatet(util.getEndDatet(this.state.startDate, 1, 'Y'),-1 , 'D'), "-", "/")
    console.log(edDate)
    this.setState({
      tourismKey: key,
      endDate: edDate
    })
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
    const [minStartDate, maxStartDate] = [util.getEndDatet(this.state.currentTime, this.state.minPeriod-1, this.state.periodMinUnit), util.getEndDatet(this.state.currentTime, this.state.maxPeriod-1, this.state.periodMaxUnit)]
    const maxEndDate = util.getEndDatet(this.state.started, this.state.endPriod-1, this.state.endPriodUnit)
    if(util.maxDate(minStartDate, this.state.startDate) || util.maxDate(this.state.startDate, maxStartDate)) {
      this.setState({
        errorContent: `开始时间必须在${this.state.minPeriod}${TYpes.date[this.state.periodMinUnit]}-${this.state.maxPeriod}${TYpes.date[this.state.periodMaxUnit]}之内`
      })
      return
    }
    if(this.state.productPriod === true || this.state.tourismKey === '1') {
      this.setState({
        insurancePriod: 12,
        insurancePriodUnit: 'M'
      })
    }else {
      if(util.maxDate(this.state.startDate, this.state.endDate) || util.maxDate(this.state.endDate, maxEndDate)) {
        this.setState({
          errorContent: `结束时间必须在开始时间-${this.state.endPriod}${TYpes.date[this.state.endPriodUnit]}之内`
        })
        return
      }
      this.setState({
        insurancePriod: util.DateDiff(this.state.startDate, this.state.endDate),
        insurancePriodUnit: 'D'
      })
    }
    let errorContents = createChecker(checkList)
    if(errorContents === false) {
      let [minDate, maxDate] = [util.getEndDatet(this.state.currentTime, -this.state.minInsureAge ,this.state.minInsureAgeUnit),  util.getEndDatet(this.state.currentTime, -this.state.maxInsureAge, this.state.maxInsureAgeUnit)]
      let checkBeDate = this.state.bePeopleDate.every(function(val, index) {
        return util.maxDate(minDate, val.insurantBirth) && util.maxDate(val.insurantBirth, maxDate)
      })
      this.setState({
        minBirthDay: minDate,
        maxBirthDay: maxDate
      })
      if(this.state.bePeopleDate.length > 0 && checkBeDate === true) {
        const policyInfos = {
          discount: 1,
          insuranceBeginTime: this.state.startDate,
          insuranceStartTime: this.state.startDate,
          insuranceEndTime: this.state.endDate,
          insurancePeriod: this.state.insurancePriod,//this.state.isShowAddCountry === true ? util.DateDiff(this.state.startDate, this.state.endDate) : this.state.insurancePriod,
          insurancePriodUnit: this.state.insurancePriodUnit
        }
        const insuranceInfoList = this.state.bePeopleDate.map((val, index)=> {
          return {
            skuId: this.state.skuId,
            policyInfo: policyInfos,
            insurantInfoList: [val],
          }
        })
        const params = {
          serialNo: this.state.serialNo,
          productInsuranceCode: this.state.productInsuranceCode,
          productId: this.props.location.query.productId,
          productCode: this.props.location.query.productCode,
          insurantInfoList: insuranceInfoList
        }
        this.props.premiumMeasure(params)
      }else {
        this.setState({
          errorContent: `被保险人的年龄必须在${this.state.minInsureAge}${TYpes.bePeoAgeInfo[this.state.minInsureAgeUnit]}-${this.state.maxInsureAge}${TYpes.bePeoAgeInfo[this.state.maxInsureAgeUnit]}之间`
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
    const prePara = {
      serialNo: this.state.serialNo,
      productId: this.props.location.query.productId || "10028680",
      productCode: this.props.location.query.productCode || "10007603",
      productInsuranceCode: this.state.productInsuranceCode,
      minBirthDay: this.state.minBirthDay,
      maxBirthDay: this.state.maxBirthDay,
      birthDayErrorInfo: `被保险人的年龄必须在${this.state.minInsureAge}${TYpes.bePeoAgeInfo[this.state.minInsureAgeUnit]}-${this.state.maxInsureAge}${TYpes.bePeoAgeInfo[this.state.maxInsureAgeUnit]}之间`,
      skuid: this.state.skuId
    }
    sessionStorage.setItem("prePara",JSON.stringify(prePara))
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
      insurantCount: '1'
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
  }
  onChageStartDate(e) {
    this.setState({
      startDate: e.target.value,
      premiumStatus: 0
    })
    if(this.state.productPriod === true || this.state.tourismKey === '1'){
      console.log(util.replaceAll(util.getEndDatet(util.getEndDatet(e.target.value, 1, 'Y'),-1 , 'D'),"-","/"))
      this.setState({
        endDate: util.replaceAll(util.getEndDatet(util.getEndDatet(e.target.value, 1, 'Y'),-1 , 'D'),"-","/")
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
            <div className={this.state.tourismKey === val.key ? "lab-checkbox-contain lab-contain-chose" : "lab-checkbox-contain"}>
              <span className="lab-checkbox-2" htmlFor="cbx-3" onTouchTap={this.onClickChoseTourismName.bind(this, val.key)}></span>
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
              {this.state.premiumInfos.length > 0 ? this.state.premiumInfos[index].payPrem : 0}
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
          <div type="date" className="input-style">
            {this.state.endDate}
          </div>
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
  renderPremium(detail) {
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
              this.renderPackageType(detail.priceList)
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
              this.state.productPriod === true || this.state.tourismKey === '1' ? this.renderEndDateText() : this.renderEndDate()
            }
            <p className="pre-decribes">
              *如果用于办理签证，建议选择旅行日期时间前后各延长2天，详询使馆
            </p>
            <div className="col-line-threee col-no-bd">
              <span>被保险人出生日期</span>
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
          this.state.isShowCountry ?
          <Country
            productId={this.props.location.query.productId}
            onClickCountry={this.onClickCountry.bind(this)}
            onClickBacks={this.onClickIsAddCountry.bind(this, false)}
          /> : detailInfo.getDetailSuccess === true ? this.renderPremium(detailInfo.detail) : <Loading />
          // this.state.isShowCountry ?
          // <Country
          //   productId={this.props.location.query.productId}
          //   onClickCountry={this.onClickCountry.bind(this)}
          //   onClickBacks={this.onClickIsAddCountry.bind(this, false)}
          // /> : detailInfo.getDetailSuccess === true ? this.renderPremium(detsInfo.result) : <Loading />
        }
        {
          this.state.showModal && <Modal content={this.state.content} goto={this.goto.bind(this)} />
        }
        {
          <span className="pre-btn-right" onTouchTap={this.onClickInsure.bind(this)}>
            <span className="pre-btn-rbtn">
              立即投保
            </span>
          </span>
        }
      </div>
    )
  }
}
export default premium

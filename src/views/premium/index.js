import React, { PropTypes } from 'react'
import Link from 'valuelink'
import Header from 'components/Header'
import {connect} from 'react-redux'
import { createChecker } from 'utils/checker'
import { getUrlParam } from 'utils/urlParams.js'
import Country from 'components/country'
import * as api from 'api/index'
import incinerator from 'hooks/incinerator'
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
    priceArr1: [],
    priceArr2: [],
    priceNames: [],
    loodNum: 0,
    startDate: '',
    endDate: '',
    endFormatDate: '',
    content: '',
    productNmae: '',
    isShowCountry: false,
    isShowAddCountry: false,//是否旅游类型
    countrys: [],
    name: '',
    bePeopleDate: [],
    productPriod: false,//保障期限是否为年
    insurancePriod: 0,//保障期限
    minEndDate: '',
    maxEndDate: '',
    endPriod: 2,
    endPriodUnit: 'D',
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
    productInsuranceCode: '',
    minInsureAge: 0,
    maxInsureAge: 2,
    maxInsureAgeUnit: 'Y',
    minInsureAgeUnit: 'D',
    minPeriod: '',
    maxPeriod: '',
    periodMinUnit: '',
    periodMaxUnit: '',
    minStartDate: '',
    maxStartDate: '',
    minBirthDay: '',
    maxBirthDay: '',
    orderSpliteFlag: '0',
    isDisAddBeBirDayBtn: false
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    // this.props.queryDetilInfo(10013242)
    this.props.queryDetilInfo(this.props.location.query.productId, this.props.location.query.productCode)
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  componentWillReceiveProps(nextProps) {
    const { detailInfo, premiumInfo, loginInfo } = nextProps
    if(detailInfo.getDetailSuccess === true && this.state.loodNum === 0) {
      let arr1 =[], arr2 = [], bChoseSkuObj = [{}], fName =[]
      const isShowAddCountry = TYpes.productS.indexOf("" + detailInfo.detail.productId) > -1 ? true : false
      let priceNames = detailInfo.detail.priceList.map((val, index)=> {
        return val.priceName
      })
      fName = detailInfo.detail.copyPriceList.filter((val, index) => {
        return val.skuId == this.props.location.query.skuId && val
      })
      if(isShowAddCountry == true) {
        arr1 = detailInfo.detail.copyPriceList.filter((val,index)=>{
          return val.priceName == priceNames[0] && val
        })
        arr2 = detailInfo.detail.copyPriceList.filter((val,index)=>{
          return val.priceName == priceNames[1] && val
        })
        bChoseSkuObj = fName[0].priceName == priceNames[0] ? arr1 : arr2
        bChoseSkuObj = bChoseSkuObj.filter((val, index)=>{
          return val.insureFactors.travelTypeList[0].travelType == "0" && val
        })[0]
      }else {
        fName = detailInfo.detail.priceList.filter((val, index) => {
          return val.skuId == this.props.location.query.skuId && val
        })
      }
      let insurancePriods = detailInfo.detail.insurancePriod//detsInfo.result.insurancePriod//
      let insurantUnit = detailInfo.detail.insurancePriodUnit//detsInfo.result.insurancePriodUnit//
      let isAYear = insurancePriods === '1' && insurantUnit === 'Y' ? true : false
      let currentTimes = detailInfo.detail.currentTime.substring(0, 10)//detsInfo.result.currentTime.substring(0, 10)//
      const getEle = document.querySelector.bind(document)
      getEle('#sysDate').value = currentTimes
      let startDates = util.getEndDatet(detailInfo.detail.currentTime.substring(0,10), +detailInfo.detail.minEffectDelay || '1',  "D")//util.getEndDatet(detsInfo.result.currentTime.substring(0,10), +detsInfo.result.minEffectDelay || '1', 'D')//
      let endDates = util.getEndDatet(startDates, 7, 'D')
      this.setState({
        loodNum: 1,
        // priceNames: priceNames,
        // isShowAddCountry: isShowAddCountry,//根据产品ID判断旅游型
        // priceArr1: arr1,
        // priceArr2: arr2,
        // productNmae: detsInfo.result.productName,
        // name: fName[0].priceName,
        // orderSpliteFlag: detsInfo.result.orderSpliteFlag || "0",
        // skuId: isShowAddCountry == true ? bChoseSkuObj.skuId : this.props.location.query.skuId,
        // productInsuranceCode: isShowAddCountry == true ? bChoseSkuObj.productInsuranceCode : this.props.location.query.productInsuranceCode,
        // minPeriod: +detsInfo.result.minEffectDelay|| 1,
        // maxPeriod: detsInfo.result.maxEffectDelay || 365,
        // periodMinUnit: 'D',
        // periodMaxUnit: 'D',
        // insurancePriod: insurantUnit === 'Y' ? "" + (12 * insurancePriods) : insurancePriods.split("-")[0],//保险期限
        // productPriod: isAYear  === true ? true : false,
        // endPriod: isAYear  === true ? "12" : parseInt(insurancePriods.split("-")[1].split("/")[0]),
        // endPriodUnit: isAYear  === true ? 'M' : 'D',
        // currentTime: currentTimes,
        // minInsureAge: detsInfo.result.minInsureAge,
        // maxInsureAge: detsInfo.result.maxInsureAge,
        // maxInsureAgeUnit: detsInfo.result.maxInsureAgeUnit,
        // minInsureAgeUnit: detsInfo.result.minInsureAgeUnit,
        // startDate: startDates,
        // endDate: isAYear  === true ? util.replaceAll(util.getEndDatet(util.getEndDatet(startDates, 1, 'Y'),-1 , 'D'), "-", "/") : endDates,
        // endFormatDate: isAYear  === true ? util.getEndDatet(util.getEndDatet(startDates, 1, 'Y'),-1 , 'D') : endDates,
        // minStartDate: util.getEndDatet(currentTimes, detsInfo.result.insuranceProductTerms[0].minValue, detsInfo.result.insuranceProductTerms[0].minValueUnit),
        // maxStartDate: util.getEndDatet(currentTimes, detsInfo.result.insuranceProductTerms[0].maxValue, detsInfo.result.insuranceProductTerms[0].maxValueUnit),
        // insurancePriodUnit: insurantUnit === 'Y' ? 'M' : insurantUnit//保险期限单位
        priceNames: priceNames,
        isShowAddCountry: isShowAddCountry,//根据产品ID判断旅游型
        priceArr1: arr1,
        priceArr2: arr2,
        productNmae: detailInfo.detail.productName,
        name: fName[0].priceName,
        orderSpliteFlag: detailInfo.detail.orderSpliteFlag || "0",
        skuId: isShowAddCountry == true ? bChoseSkuObj.skuId : this.props.location.query.skuId,
        productInsuranceCode: isShowAddCountry == true ? bChoseSkuObj.productInsuranceCode : this.props.location.query.productInsuranceCode,
        minPeriod: +detailInfo.detail.minEffectDelay|| 1,
        maxPeriod: detailInfo.detail.maxEffectDelay || 365,
        periodMinUnit: 'D',
        periodMaxUnit: 'D',
        insurancePriod: insurantUnit === 'Y' ? 12 * insurancePriods : insurancePriods.split("-")[0],//保险期限
        productPriod: isAYear  === true ? true : false,//insurancePriods === '1年'
        endPriod: isAYear  === true ? "12" : parseInt(insurancePriods.split("-")[1].split("/")[0]),
        endPriodUnit: isAYear  === true ? 'M' : 'D',
        currentTime: currentTimes,
        minInsureAge: detailInfo.detail.minInsureAge,
        maxInsureAge: detailInfo.detail.maxInsureAge,
        minInsureAgeUnit: detailInfo.detail.minInsureAgeUnit,
        maxInsureAgeUnit: detailInfo.detail.maxInsureAgeUnit,
        startDate: startDates,
        endDate: isAYear  === true ? util.replaceAll(util.getEndDatet(util.getEndDatet(startDates, 1, 'Y'),-1 , 'D'), "-", "/") : endDates,
        endFormatDate: isAYear  === true ? util.getEndDatet(util.getEndDatet(startDates, 1, 'Y'),-1 , 'D') : endDates,
        minStartDate: util.getEndDatet(currentTimes, detailInfo.detail.insuranceProductTerms[0].minValue, detailInfo.detail.insuranceProductTerms[0].minValueUnit),
        maxStartDate: util.getEndDatet(currentTimes, detailInfo.detail.insuranceProductTerms[0].maxValue, detailInfo.detail.insuranceProductTerms[0].maxValueUnit),
        insurancePriodUnit: insurantUnit === 'Y' ? 'M' : insurantUnit//保险期限单位
      })
    }
    if(premiumInfo.measurePremiumBegin === true) {
      this.setState({
        premiumStatus: 2
      })
      return
    }
    if(premiumInfo.measurePremiumSuccess === true) {
      if(premiumInfo.premiumResultData.serialNo) {
      // if(preInfo.result.serialNo) {
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
      }else {
        this.props.premiumMeasureReset()
        this.setState({
          premiumStatus: 0,
          showModal: true,
          content: "数据异常请重新测算"
        })
      }
      return
    }
    if(premiumInfo.measurePremiumError === true) {
      this.setState({
        premiumStatus: 0,
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
  setSku(name, key) {
    let chosePrice = this.state.priceNames[0] == name ? this.state.priceArr1 : this.state.priceArr2
    let ars = chosePrice.filter((val, index)=> {
      return val.insureFactors.travelTypeList[0].travelType == key && val
    })
    this.setState({
      skuId: ars[0].skuId,
      productInsuranceCode: ars[0].productInsuranceCode
    })
    console.log(ars[0].skuId)
    console.log(ars[0].productInsuranceCode)
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
    this.props.premiumMeasureReset()
    this.setState({
      name: val.priceName,
      premiumStatus: 0
    })
    if(this.state.isShowAddCountry == true) {
      this.setSku(val.priceName, this.state.tourismKey)
    }else {
      this.setState({
        skuId: val.skuId,
        productInsuranceCode: val.productInsuranceCode
      })
      console.log(val.skuId)
      console.log(val.priceName)
    }
  }
  onClickChoseTourismName(key) {
    // let edDate = key === "0" ? "" : ""+util.replaceAll(util.getEndDatet(util.getEndDatet(this.state.startDate, 1, 'Y'),-1 , 'D'), "-", "/")
    let edDate = key === "0" ? this.state.endDate : util.getEndDatet(util.getEndDatet(this.state.startDate, 1, 'Y'),-1 , 'D')
    this.setState({
      tourismKey: key,
      endDate: edDate,
      premiumStatus: 0,
      endFormatDate: edDate
    })
    this.setSku(this.state.name, key)
    this.props.premiumMeasureReset()
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
    if (typeof (pa_sdcajax) === 'function') {
      pa_sdcajax('WT.ti', "报价页_添加旅游目的地", false,'WT.obj', 'button', false, 'DCS.dcsuri', window.location.pathname+'\/click.event', false, 'WT.pageurl','http://'+window.location.hostname+window.location.pathname, false, 'WT.pagetitle',  document.title, false, 'WT.dl', '25', false, 'DCSext.wt_click', 'page', false)
    }
    this.setState({
      isShowCountry: flag,
      premiumStatus: 0
    })
    this.props.premiumMeasureReset()
  }
  onClickDeleteBeDate(index) {
    let bePeopleDates = this.state.bePeopleDate
    bePeopleDates.splice(index, 1)
    this.setState({
      premiumStatus: 0,
      isDisAddBeBirDayBtn: false,
      bePeopleDate: bePeopleDates
    })
    this.props.premiumMeasureReset()
  }
  onClickTakeEffectStartDate(e) {
    e.target.type = 'date'
  }
  onClickMeasurePremium() {
    if (typeof (pa_sdcajax) === 'function') {
      pa_sdcajax('WT.ti', "报价页_测算保费", false,'WT.obj', 'button', false, 'DCS.dcsuri', window.location.pathname+'\/click.event', false, 'WT.pageurl','http://'+window.location.hostname+window.location.pathname, false, 'WT.pagetitle',  document.title, false, 'WT.dl', '25', false, 'DCSext.wt_click', 'page', false)
    }
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
    const [minStartDateInfo, maxStartDateInfo] = [util.getEndDatet(this.state.currentTime, this.state.minPeriod, this.state.periodMinUnit), util.getEndDatet(this.state.currentTime, this.state.maxPeriod, this.state.periodMaxUnit)]
    const minEndDate = util.getEndDatet(this.state.startDate, 1, 'D')
    const maxEndDate = util.getEndDatet(this.state.startDate, this.state.endPriod-1, this.state.endPriodUnit)
    const maxEndDateInfo = util.getEndDatet(this.state.startDate, this.state.endPriod, this.state.endPriodUnit)
    if(util.maxDate(minStartDate, this.state.startDate) || util.maxDate(this.state.startDate, maxStartDate)) {
      this.setState({
        // errorContent: `开始时间必须在${this.state.minPeriod}${TYpes.date[this.state.periodMinUnit]}-${this.state.maxPeriod}${TYpes.date[this.state.periodMaxUnit]}之内`
        errorContent: `保障开始时间必须为${minStartDateInfo}到${maxStartDateInfo}之间`
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
          errorContent: `保障结束时间必须为${minEndDate}到${maxEndDateInfo}之间`
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
      let [minDate, maxDatea] = [util.getEndDatet(this.state.startDate, -this.state.minInsureAge ,this.state.minInsureAgeUnit),  util.getEndDatet(this.state.startDate, -this.state.maxInsureAge, this.state.maxInsureAgeUnit)]
      let maxDate = util.getEndDatet(util.getEndDatet(maxDatea, 1, 'D'), -1 , 'Y')
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
          // insuranceEndTime: util.getEndDatet(this.state.endFormatDate, 1, ''),
          insurancePeriod: this.state.productPriod === true || this.state.tourismKey === '1' ? 12 : util.DateDiff(this.state.startDate, this.state.endDate) + 1,
          insurancePriodUnit: this.state.productPriod === true || this.state.tourismKey === '1' ? 'M' : 'D'
        }
        const insuranceInfoList = this.state.bePeopleDate.map((val, index)=> {
          return {
            skuId: this.state.skuId,
            policyInfo: policyInfos,
            insurantInfoList: [val]
          }
        })
        const params = {
          serialNo: this.state.serialNo,
          productInsuranceCode: this.state.productInsuranceCode,
          productId: this.props.location.query.productId,
          productCode: this.props.location.query.productCode,
          insurantInfoList: insuranceInfoList,
          orderSpliteFlag: this.state.orderSpliteFlag
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
  goSubmit(){
    this.context.router.push({
      pathname: '/fillmation',
      query: {
        productId: this.props.location.query.productId,
        productCode: this.props.location.query.productCode
      }
    })
  }
  goUpdate(data){
      let urlMap = api.getUpdateUrl(),
          symbol = data?data.targetURLSymbol:'';
      if(symbol && urlMap[symbol]){//跳转升级
        this.setState({
          premiumStatus: 1
        })
          let productNmae = this.state.productNmae;
          let {origin,pathname,hash} = location;
          let pre  = encodeURIComponent(`${origin}${pathname}${hash}`),
              next = encodeURIComponent(`${origin}${pathname}${hash}&updated=true&productName=${productNmae}&productId=${this.state.Id}&productCode=${this.props.location.query.productCode}`);
          sessionStorage.setItem(UPDATEING, true);
          App.call(['isNeedJSBack'],null,null,{status:'false'});
          location.href = urlMap[symbol]+`?preLink=${pre}&nextLink=${next}`
      }
      sessionStorage.setItem('clientNo', data.clientNo);
      if(symbol && symbol==='04'){//查询是否满足18岁
          this.checkIfAdult(this.goSubmit.bind(this));
      }
  }
  checkIfAdult(cb){
      api.checkIfAdult()
          .then(res => {
              incinerator('checkIfAdult', res.responseCode, {
                  success: ()=>{
                      cb();
                  },
                  fail:()=>{
                      this.setState({
                        errorContent:res.responseMessage
                      })
                  },
                  unlogin:()=>{
                      const loginUrl = `patoa://pingan.com/login${App.IS_IOS?'?force=1':''}`
                      YztApp.accessNativeModule(loginUrl,()=>{
                      })
                  }
              })
          })
          .fail(() => {
              this.setState({
                errorContent:'接口请求失败'
              })
          });
  }
  onClickInsure(cc) {
    if (typeof (pa_sdcajax) === 'function') {
      pa_sdcajax('WT.ti', "报价页_立即投保", false,'WT.obj', 'button', false, 'DCS.dcsuri', window.location.pathname+'\/click.event', false, 'WT.pageurl','http://'+window.location.hostname+window.location.pathname, false, 'WT.pagetitle',  document.title, false, 'WT.dl', '25', false, 'DCSext.wt_click', 'page', false)
    }
    const fillMationInfo = {
      productName: this.state.productNmae,
      name: this.state.name,
      isShowAddCountry: this.state.isShowAddCountry
    }
    const prePara = {
      serialNo: this.state.serialNo,
      productId: this.props.location.query.productId || "10028680",
      productCode: this.props.location.query.productCode || "10007603",
      productInsuranceCode: this.state.productInsuranceCode,
      minBirthDay: this.state.minBirthDay,
      maxBirthDay: this.state.maxBirthDay,
      orderSpliteFlag: this.state.orderSpliteFlag,
      birthDayErrorInfo: `被保险人的年龄必须在${this.state.minInsureAge}${TYpes.bePeoAgeInfo[this.state.minInsureAgeUnit]}-${this.state.maxInsureAge}${TYpes.bePeoAgeInfo[this.state.maxInsureAgeUnit]}之间`,
      skuid: this.state.skuId
    }
    sessionStorage.setItem("prePara",JSON.stringify(prePara))
    sessionStorage.setItem("fillMationInfo",JSON.stringify(fillMationInfo))
    YztApp.getLoginStatus((status,data)=>{
      if(status==='success' && (!data.clientNo||(data.loginStatus == '0'))){//未登录先去登录
          // YztApp.accessNativeModule('patoa://pingan.com/login',()=>{
          //     //登录后需要调用升级
          // })
          const loginUrl = `patoa://pingan.com/login${App.IS_IOS?'?force=1':''}`
          YztApp.accessNativeModule(loginUrl,()=>{
          })
      }
      else{
        this.setState({
          premiumStatus: 2
        })
          //升级
          YztApp.getSSOTicket((status,data)=>{
              if(status!=='success'){
                  this.showError('native api call error')
                  return;
              }
              let sso = data?data:false;
              sessionStorage.setItem("sso", JSON.stringify(sso))
              if(status==='success' && sso && !sso.signature){
                  this.goUpdate({targetURLSymbol:'02'});
              }
              if(status==='success' && sso && sso.signature){
                this.getUpdateInfo(sso)
              }
          })
      }
    })
  }
  wapMallcheckOrderPayCondition(sso) {
    api.checkOrderPayCondition(sso) //同步登录态
        .then(res => {
            incinerator('checkOrderPayCondition', res.responseCode, {
                success: ()=>{
                    this.setState({
                      premiumStatus: 1
                    })
                    this.goUpdate(res.responseData);
                },
                fail:()=>{
                  this.setState({
                    premiumStatus: 0,
                    errorContent:res.responseMessage
                  })
                },
                unlogin:()=>{
                  // console.log('未登录')
                  // this.goSubmit()
                  this.setState({
                    premiumStatus: 1
                  })
                  const loginUrl = `patoa://pingan.com/login${App.IS_IOS?'?force=1':''}`
                  YztApp.accessNativeModule(loginUrl,()=>{
                  })
                }
            })
        })
        .fail(() => {
          this.setState({
            errorContent: "接口请求失败"
          })
        });
  }
  getUpdateInfo(sso){
        api.getAccessTicketGP(sso) //同步登录态
            .then(res => {
                incinerator('checkOrderPayCondition', res.resultStatus, {
                    gpSuccess: ()=>{
                      this.wapMallcheckOrderPayCondition(sso)
                    },
                    fail:()=>{
                      this.setState({
                        premiumStatus: 1
                      })
                      if(res.resultStatus == 5000){
                        const loginUrl = `patoa://pingan.com/login${App.IS_IOS?'?force=1':''}`
                        YztApp.accessNativeModule(loginUrl,()=>{
                        })
                      }else {
                        this.setState({
                          premiumStatus: 0,
                          errorContent:res.memo
                        })
                      }
                    },
                    gpUnlogin:()=>{
                        this.setState({
                          premiumStatus: 1
                        })
                        const loginUrl = `patoa://pingan.com/login${App.IS_IOS?'?force=1':''}`
                        YztApp.accessNativeModule(loginUrl,()=>{
                        })
                    }
                })
            })
            .fail(() => {
              this.setState({
                errorContent: "接口请求失败"
              })
            });

    }

  addBepoleDate() {
    let bePeopleDates = this.state.bePeopleDate
    let isDisAddBeBirDayBtn = this.state.isShowAddCountry === true ? false : true
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
      bePeopleDate: bePeopleDates,
      isDisAddBeBirDayBtn: isDisAddBeBirDayBtn
    })
    this.props.premiumMeasureReset()
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
      bePeopleDate: bePeopleDates,
      premiumStatus: 0
    })
  }
  onChageStartDate(e) {
      // <div>
      //   util.getEndDatet(detail.currentTime.substring(0,10), detail.insuranceProductTerms[0].minValue || '1', detail.insuranceProductTerms[0].minValueUnit || 'D')
      // </div>
    this.props.premiumMeasureReset()
    this.setState({
      minEndDate: util.getEndDatet(e.target.value, 1, 'D'),
      maxEndDate: util.getEndDatet(e.target.value, this.state.endPriod, this.state.endPriodUnit),
      startDate: e.target.value,
      premiumStatus: 0
    })
    if(this.state.productPriod === true || this.state.tourismKey === '1'){
      console.log(util.replaceAll(util.getEndDatet(util.getEndDatet(e.target.value, 1, 'Y'),-1 , 'D'),"-","/"))
      this.setState({
        // endDate: util.replaceAll(util.getEndDatet(util.getEndDatet(e.target.value, 1, 'Y'),-1 , 'D'),"-","/"),
        endDate: util.getEndDatet(util.getEndDatet(e.target.value, 1, 'Y'),-1 , 'D'),
        endFormatDate: util.getEndDatet(util.getEndDatet(e.target.value, 1, 'Y'),-1 , 'D')
      })
    }else {
      const {eDate} = this.refs
      if(eDate) {
        eDate.value = util.getEndDatet(e.target.value, 7, 'D')
      }
      this.setState({
        // endDate: util.replaceAll(util.getEndDatet(util.getEndDatet(e.target.value, 1, 'Y'),-1 , 'D'),"-","/"),
        endDate: util.getEndDatet(e.target.value, 7, 'D'),
        endFormatDate: util.getEndDatet(e.target.value, 7, 'D')
      })
    }
  }
  onChangeEndDate(e) {
    this.setState({
      endDate: e.target.value,
      endFormatDate: e.target.value,
      premiumStatus: 0
    })
    this.props.premiumMeasureReset()
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
          <div className="col-pre-line" key={index} onTouchTap={this.onClickChoseOption.bind(this, val)}>
            <div>
              {
                val.priceName
              }
            </div>
            <div className={this.state.name == val.priceName ? "lab-checkbox-contain lab-contain-chose" : "lab-checkbox-contain"}>
              <span className="lab-checkbox-2" htmlFor="cbx-3" ></span>
              <span className="checbox-chose"></span>
            </div>
          </div>
          // <div className="col-line-for m-t24" key={index} onTouchTap={this.onClickChoseOption.bind(this, val)}>
          //   <div>
          //     {
          //       val.priceName
          //     }
          //   </div>
          //   <div className={this.state.name == val.priceName ? "lab-checkbox-contain lab-contain-chose" : "lab-checkbox-contain"}>
          //     <span className="lab-checkbox-2" htmlFor="cbx-3" ></span>
          //     <span className="checbox-chose"></span>
          //   </div>
          // </div>
        )
      })
    )
  }
  renderTourism() {
    return(
      [{name: '单次', key: '0'}, {name: '多次', key: '1'}].map((val, index) => {
        return(
          <div className="col-pre-line" key={index} onTouchTap={this.onClickChoseTourismName.bind(this, val.key)}>
            <div>
              {
                val.name
              }
            </div>
            <div className={this.state.tourismKey === val.key ? "lab-checkbox-contain lab-contain-chose" : "lab-checkbox-contain"}>
              <span className="lab-checkbox-2" htmlFor="cbx-3"></span>
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
        <p className="pre-prename-p">旅游类型</p>
        <div className="col-one-line">
          {
            this.renderTourism()
          }
        </div>
      </div>
    )
  }
  renderBePopleDate() {
    return(
      this.state.bePeopleDate.map((val, index) => {
        let i = index
        return(
          <div className="col-line-threeetnbd" key={index}>
            <div className="col-line-with">
              <span className="delete-icon-btn m-l3" onTouchTap={this.onClickDeleteBeDate.bind(this, i)}>
              </span>
              <input type="text" value={this.state.bePeopleDate[index].insurantBirth || ""} className="premium-chose-date" onChange={this.onChangeBepopleDate.bind(this, i)}
                onTouchTap={::this.onClickTakeEffectStartDate}/>
            </div>
            <span>￥
              {this.state.premiumInfos.length > index ? this.state.premiumInfos[index].payPrem : 0}
              /人
            </span>
            <div className="bepe-date-title">出生日期</div>
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
            ref="eDate"
            type="text"
            className="input-style"
            onTouchTap={::this.onClickTakeEffectStartDate}
            onChange={this.onChangeEndDate.bind(this)}
            defaultValue={this.state.endDate || ""}
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
          <input type="text" className="input-style"
            ref="eDatet"
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
        <span className="pre-btn-left">保费总额：{''+this.state.totalPayPrem}元</span>
        <span className="pre-btn-right" onClick={this.onClickInsure.bind(this, this.goSubmit.bind(this))}>
          <span className="pre-btn-rbtn">
            立即投保
          </span>
        </span>
      </div>
    )
  }
  renderAddBeBirthday() {
    return(
      <div className="btn-add-icon" onTouchTap={this.addBepoleDate.bind(this)}>
          <span className="add-icon-imgs"></span>
          <span className="add-icon-txt">添加</span>
      </div>
    )
  }
  renderDisAddBirthday() {
    return(
      <div className="disbtn-add-icon" >
          <span className="disbtn-icon-imgs"></span>
          <span className="disbtn-icon-txt">编辑</span>
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
            <p className="pre-prename-p">套餐类型</p>
            <div className="col-one-line">
              {
                this.renderPackageType(detail.priceList)
              }
            </div>
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
                  type="text"
                  className="input-style"
                  onTouchTap={::this.onClickTakeEffectStartDate}
                  onChange={this.onChageStartDate.bind(this)}
                  value={this.state.startDate}
                />
              </div>
            </section>
            {
              this.state.productPriod === true || this.state.tourismKey === '1' ? this.renderEndDateText() : this.renderEndDate()
            }
            {
              this.state.isShowAddCountry  && <p className="pre-decribes">
                *如果用于办理签证，建议选择旅行日期时间前后各延长2天，详询使馆
              </p>
            }
            <div className="col-line-threee col-no-bd">
              <span>被保险人出生日期</span>
              {
                this.state.isDisAddBeBirDayBtn === true ?
                this.renderDisAddBirthday() :
                this.renderAddBeBirthday()
              }
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
          //   productId="10028680"
          //   onClickCountry={this.onClickCountry.bind(this)}
          //   onClickBacks={this.onClickIsAddCountry.bind(this, false)}
          // /> : detailInfo.getDetailSuccess === true ? this.renderPremium(detsInfo.result) : <Loading />
        }
        {
          this.state.showModal && <Modal content={this.state.content} goto={this.goto.bind(this)} />
        }
      </div>
    )
  }
}
export default premium

import React, { PropTypes } from 'react'
import Link from 'valuelink'
import {connect} from 'react-redux'
import Header from 'components/Header'
import { queryDetilInfo } from 'actions'
import { getUrlParam } from 'utils/urlParams'
import Loading from 'components/loading'
import detailInfos from 'mock/dets'

@connect(
  state => ({
    detailInfo: state.detailInfo
  }),
  {
    queryDetilInfo
  }
)

export default class detail extends React.Component {
  state = {
    title: "详情页",
    isShowCharac: true,
    currentIndex: 0,
    guaranteeIndex: -1,
    productId: '',
    productCode: '',
    captionDoc: '',
    skuId: '',
    productInsuranceCode: ''
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    // this.props.queryDetilInfo(10013242)
    // this.props.queryDetilInfo(10028680, 10007603)
    this.props.queryDetilInfo(getUrlParam('productId'), getUrlParam('productCode'))
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  componentWillReceiveProps(nextProps) {
    const { detailInfo } = nextProps
    if(detailInfo.getDetailSuccess === true) {
      YztApp.setTitle(detailInfo.detail.productName)
      this.setState({
        title: detailInfo.detail.productName,
        skuId: detailInfo.detail.priceList[0].skuId,//detailInfos.result.priceList[0].skuId,//
        productInsuranceCode: detailInfo.detail.priceList[0].productInsuranceCode,//detailInfos.result.priceList[0].productInsuranceCode,//
        productId: getUrlParam('productId') || detailInfo.detail.productId,
        productCode: getUrlParam('productCode') || detailInfo.detail.productCode,
        captionDoc: detailInfo.detail.captionDoc
      })
    }
  }
  onClickBack() {
    if (App.isNative) {//显示关闭
      if (App.IS_IOS) {
        App.oldVersion.call('paone://jsCloseAndRefresh')
      }
      if (App.IS_ANDROID) {
        App.call(['closeWebAndRefresh'], null, null, { needRefresh: 'true' })
      }
      return
    }
    // history.go(-1)
  }
  onClickisShowCharac() {
    this.setState({
      isShowCharac: !this.state.isShowCharac
    })
  }
  onClickPremium() {
    if (typeof (pa_sdcajax) === 'function') {
      pa_sdcajax('WT.ti', "详情页_保费测算", false,'WT.obj', 'button', false, 'DCS.dcsuri', window.location.pathname+'\/click.event', false, 'WT.pageurl','http://'+window.location.hostname+window.location.pathname, false, 'WT.pagetitle',  document.title, false, 'WT.dl', '25', false, 'DCSext.wt_click', 'page', false)
    }
    if(this.state.captionDoc) {
      this.context.router.push({
        pathname: '/healthInform',
        query: {
          productId: this.state.productId,
          productCode: this.state.productCode,
          skuId: this.state.skuId,
          productInsuranceCode: this.state.productInsuranceCode
        }
      })
      return
    }
    this.context.router.push({
      pathname: '/premium',
      query: {
        productId: this.state.productId,
        productCode: this.state.productCode,
        skuId: this.state.skuId,
        productInsuranceCode: this.state.productInsuranceCode
      }
    })
  }
  onClickCurrent(index, skuIds, productInsuranceCodes) {
    this.setState({
      currentIndex: index,
      guaranteeIndex: -1,
      skuId: skuIds,
      productInsuranceCode: productInsuranceCodes
    })
  }
  onClickGuarantee(index, skuIds) {
    this.setState({
      guaranteeIndex: index === this.state.guaranteeIndex ? -1 : index
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
  renderTypesList(typeList) {
    return(
      typeList.map((val, index) => {
        return(
          <li className={this.state.currentIndex === index ? "current" : ""} onTouchTap={this.onClickCurrent.bind(this, index, val.skuId, val.productInsuranceCode)} key={index}>
            <h2>{val.priceName}</h2>
            {
              false && <p>
                {val.minPrice}元-{val.maxPrice}元
              </p>
            }
          </li>
        )
      })
    )
  }
  renderGuarantee(planList) {
    return(
      planList.map((val, index) => {
        return(
          <li key={index} onTouchTap={this.onClickGuarantee.bind(this, index)}>
            <a href="javascript: void(0);" className={this.state.guaranteeIndex === index ? "arrow-up showInfo" : "arrow-down showInfo"}>
              <div className="content-list-title">
                <span className="project-name">{val.securityProName}</span>
                <span className="money">
                  {
                    val.amontUnit === 1 ? (val.securityProAssuredSum ? val.securityProAssuredSum/10000 + "万元" : val.securityProAssuredSumDesc) :
                    val.amontUnit === 3 ? val.securityProAssuredSum + "元/天" :
                    val.securityProAssuredSum
                  }
                </span>
              </div>
            </a>
            <div className={this.state.guaranteeIndex === index ? "content-list-text" : "content-list-text hide"}>
              <p>
                {val.securityProInstruction}
              </p>
            </div>
          </li>
        )
      })
    )
  }
  renderContent(detail) {
    return(
      <div>
        <section className="banner">
          <a href="javascript:void(0);">
            <img src={detail.productbannerUrl}/>
          </a>
          <div className="banner-text">
            <h2>{detail.productIntroduce}</h2>
            <p></p>
          </div>
        </section>
        <section className="pa-b72 ma-t13">
          <ul className={detail.priceList.length > 2 ? "tabmenu column3" : "tabmenu column2"}>
            {
              this.renderTypesList(detail.priceList)
            }
          </ul>
          <div className="content white-bg">
            <div>
              <div className="content-list-s">
                <ul>
                  <li>
                    <a href="javascript: void(0);" className={this.state.isShowCharac === true ? "arrow-up showInfo" : "arrow-down showInfo"} onTouchTap={this.onClickisShowCharac.bind(this)}>
                      <div className="content-list-title">
                        <span className="project-name">产品特点</span>
                        <span className="money"></span>
                      </div>
                    </a>
                    <div className={this.state.isShowCharac === true ? "content-list-text" : "content-list-text hide"}>
                      <p className="col-9b9b9b">
                        {
                          detail.productFeature
                        }
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bottom-line"></div>
          </div>
          <div className="content white-bg">
            <div className="content-title">保障范围</div>
            <div className="content-list content0">
              <ul>
                {
                  this.renderGuarantee(detail.priceList[this.state.currentIndex].planList)
                }
              </ul>
            </div>
            <div className="bottom-line"></div>
          </div>
          <div className="content-list white-bg ma-t13">
            <ul>
              <li>
                <a is href="javascript:void(0);" otitle="详情_常见问题" otype="button" class="arrow-right" onTouchTap={this.onClickStatement.bind(this, 3)}>
                  <div className="content-list-title">
                    <span className="project-name">常见问题</span>
                    <span className="money"></span>
                  </div>
                </a>
              </li>
              <li>
              <a is href="javascript:void(0);" otitle="详情_理赔流程" otype="button" class="arrow-right" onTouchTap={this.onClickStatement.bind(this, 4)}>
                <div className="content-list-title">
                  <span className="project-name">理赔流程</span>
                  <span className="money"></span>
                </div>
              </a>
              </li>
              <li>
                <a is href="javascript:void(0);" otitle="详情_投保须知" otype="button" class="arrow-right" onTouchTap={this.onClickStatement.bind(this, 5)}>
                  <div className="content-list-title">
                    <span className="project-name">投保须知</span>
                    <span className="money"></span>
                  </div>
                </a>
              </li>
              <li>
                <a is href="javascript:void(0);" otitle="详情_保险条款" otype="button" class="arrow-right" onClick={this.onClickStatement.bind(this, 2)}>
                  <div className="content-list-title">
                    <span className="project-name">保险条款</span>
                    <span className="money"></span>
                  </div>
                </a>
              </li>
            </ul>
            <div className="bottom-line"></div>
          </div>
        </section>
        <div className="complete-fill-btn" onClick={this.onClickPremium.bind(this)}>保费测算</div>
      </div>
    )
  }
  render() {
    const { detailInfo } = this.props
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={this.state.title}/>
        {
          detailInfo.getDetailSuccess === true ? this.renderContent(detailInfo.detail) : <Loading />
          // detailInfo.getDetailSuccess === true ? this.renderContent(detailInfos.result) : <Loading />
        }
      </div>
    )
  }
}
export default detail

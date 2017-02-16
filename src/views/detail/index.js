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
    skuId: ''
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
    if(this.state.captionDoc) {
      this.context.router.push({
        pathname: '/healthInform',
        query: {
          productId: this.state.productId,
          productCode: this.state.productCode,
          skuId: this.state.skuId
        }
      })
      return
    }
    this.context.router.push({
      pathname: '/premium',
      query: {
        productId: this.state.productId,
        productCode: this.state.productCode,
        skuId: this.state.skuId
      }
    })
  }
  onClickCurrent(index, skuIds) {
    this.setState({
      currentIndex: index,
      guaranteeIndex: -1,
      skuId: skuIds
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
          <li className={this.state.currentIndex === index ? "current" : ""} onTouchTap={this.onClickCurrent.bind(this, index, val.skuId)} key={index}>
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
                <span className="money">{val.securityProAssuredSum/10000}万元</span>
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
            <img src="https://m.pingan.com/app_images/wap/v30/c3/chaoshi/sys/baoxian/gaoyuanyou_banner.jpg"/>
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
                <a href="javascript:void(0);" className="arrow-right" onTouchTap={this.onClickStatement.bind(this, 3)}>
                  <div className="content-list-title">
                    <span className="project-name">常见问题</span>
                    <span className="money"></span>
                  </div>
                </a>
              </li>
              <li>
              <a href="javascript:void(0);" className="arrow-right" onTouchTap={this.onClickStatement.bind(this, 4)}>
                <div className="content-list-title">
                  <span className="project-name">理赔流程</span>
                  <span className="money"></span>
                </div>
              </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="arrow-right" onTouchTap={this.onClickStatement.bind(this, 1)}>
                  <div className="content-list-title">
                    <span className="project-name">投保声明</span>
                    <span className="money"></span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="arrow-right" onTouchTap={this.onClickStatement.bind(this, 2)}>
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
        <div className="complete-fill-btn" onTouchTap={this.onClickPremium.bind(this)}>保费测算</div>
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

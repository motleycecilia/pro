import React, { PropTypes } from 'react'
import Link from 'valuelink'
import {connect} from 'react-redux'
import Header from 'components/Header'
import { queryDetilInfo } from 'actions'
import { getUrlParam } from 'utils/urlParams'
import Loading from 'components/loading'

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
    captionDoc: ''
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    console.log(getUrlParam('productId'))
    console.log(getUrlParam('productCode'))
    this.props.queryDetilInfo(10013242)
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  componentWillReceiveProps(nextProps) {
    const { detailInfo } = nextProps
    if(detailInfo.getDetailSuccess === true) {
      this.setState({
        title: detailInfo.detail.productName,
        productId: getUrlParam('productId') || detailInfo.detail.productId,
        productCode: getUrlParam('productCode') || detailInfo.detail.productCode,
        captionDoc: detailInfo.detail.captionDoc
      })
    }
  }
  onClickBack() {
    history.go(-1)
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
          productCode: this.state.productCode
        }
      })
      return
    }
    this.context.router.push({
      pathname: '/premium',
      query: {
        productId: this.state.productId,
        productCode: this.state.productCode
      }
    })
  }
  onClickCurrent(index) {
    this.setState({
      currentIndex: index,
      guaranteeIndex: -1
    })
  }
  onClickGuarantee(index) {
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
          <li className={this.state.currentIndex === index ? "current" : ""} onTouchTap={this.onClickCurrent.bind(this, index)} key={index}>
            <h2>{val.priceName}</h2>
            <p>
              {val.minPrice}元-{val.maxPrice}元
            </p>
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
                <span className="money">{val.minPrice}{val.maxPrice === val.minPrice ? "" : "-"+val.maxPrice}</span>
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
          <ul className={detail.typelist.length > 2 ? "tabmenu column3" : "tabmenu column2"}>
            {
              this.renderTypesList(detail.typelist)
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
                        1、专为前往青海、西藏、云南、贵州等高原地区旅行设计；
                        2、特有高原反应意外伤害及医疗保障，全面保障出行人士安全。
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
                  this.renderGuarantee(detail.typelist[this.state.currentIndex].planList)
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
        }
      </div>
    )
  }
}
export default detail

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import { queryDetilInfo} from 'actions'
import Loading from 'components/loading'
import Header from 'components/Header'
import { App, YztApp } from 'utils/native_h5'
import detailInfos from 'mock/detail'

@connect(
  state => ({
    detailInfo: state.detailInfo
  }),
  {
    queryDetilInfo
  }
)

export default class guarantee extends React.Component {
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.queryDetilInfo(this.props.location.query.productId,this.props.location.query.productCode)//
    // this.props.queryDetilInfo(10028680, 10007603)
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    let category = this.props.location.query.category
    let titles = category === '1' ? '投保声明' :
    category === '2' ? '保险条款' :
    category === '3' ? '常见问题' : '理赔流程'
    YztApp.setTitle(titles)
  }
  onClickBack() {
    history.go(-1)
  }
  onClickGurantInfo(info) {
    this.context.router.push({
      pathname: '/guaranteeInfo',
      query: {
        guarantInfo: encodeURIComponent(info)
      }
    })
  }

  renderProblemList(commonIssue) {
    return(
        commonIssue.map((val, index) => {
          return(
            <div key={index}>
              <div className="guarantee-con-tit">
                Q:{val['Q']}
              </div>
              <div className="guarantee-con-info">
                A:{val['A']}
              </div>
            </div>
          )
        })
    )
  }

  renderProblem(commonIssue) {
    return(
      <div className="guarantee-content">
        {
          this.renderProblemList(commonIssue)
        }
      </div>
    )
  }
  renderInsure(clauseList) {
    return(
        clauseList.map((val, index) => {
          return(
            <div className="col-line" onTouchTap={this.onClickGurantInfo.bind(this,val.downloadUrl)} key={index}>
              <span>{val.name}</span>
              <span className="icon-right"></span>
            </div>
          )
        })
    )
  }

  renderStatement(insuranceNotice) {
    return(
      <div className="guarantee-content">
        {insuranceNotice}
      </div>
    )
  }

  renderClaims(insuranceScope) {
    return(
      <div className="guarantee-content">
        {insuranceScope}
      </div>
    )
  }

  renderContent(resData, category) {
    return(
        category === '1' ?
        this.renderStatement(resData.insuranceStatement) :
        category === '2' ?
        this.renderInsure(resData.insuranceClauseList) :
        category === '3' ?
        this.renderProblem(resData.commonIssue) :
        this.renderClaims(resData.urlLiPeiFuWu)
    )
  }
  render() {
    const { title } = this.props.route
    let category = this.props.location.query.category
    let titles = category === '1' ? '投保声明' :
    category === '2' ? '保险条款' :
    category === '3' ? '常见问题' : '理赔流程'
    const { detailInfo } = this.props
    return (
      <div className="bg-fff">
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)}
          title={titles}/>
        {
           !detailInfo.getDetailSuccess ? <Loading /> : this.renderContent(detailInfo.detail, this.props.location.query.category)
          // !detailInfo.getDetailSuccess ? <Loading /> : this.renderContent(detailInfos, this.props.location.query.category)
         }
      </div>
    )
  }
}
export default guarantee

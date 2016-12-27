import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import {getInsuredUserInfo, resetInsuredUserInfo} from 'actions'
import { App, YztApp } from 'utils/native_h5'


@connect(
  state => ({
    insured: state.insured
  }),
  {
    getInsuredUserInfo,
    resetInsuredUserInfo
  }
)


export default class supervise extends React.Component {
  state = {
    choseList: []
  }
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
    this.props.getInsuredUserInfo('')
  }
  componentWillReceiveProps(nextProps) {
    const {insured} = nextProps
    if(insured.getIResultData && insured.getIResultData.responseCode === '900002') {
      this.context.router.push({
        pathname: '/login'
      })
      return
    }
  }
  componentWillUnmount() {
    this.props.resetInsuredUserInfo()
  }
  onClickBack() {
    history.go(-1)
  }
  onClickRight() {
    console.log(this.state.choseList)
  }
  onClickEditInsurant(id) {
    this.context.router.push({
      pathname: '/bePeople',
      query: { operation: 1, ide: id }
    })
  }
  onClickChoseOption(index) {
    var cList = this.state.choseList
    cList[index] = !this.state.choseList[index]
    this.setState({
      choseList: cList
    })
  }
  onclickAddInsured() {
    this.context.router.push({
      pathname: '/bePeople',
      query: { operation: 0 }
    })
  }

  renderInsuredList(insuredResponse) {
    return(
      insuredResponse.map((val,index) => {
        return(
          <div className="col-line-threee h_80" key={index}>
            <div className="col-line-with">
              <div className={this.state.choseList[index] ? "lab-checkbox-contain lab-contain-chose" : "lab-checkbox-contain"}>
                <span className="lab-checkbox-2" onTouchTap={this.onClickChoseOption.bind(this, index)}></span>
                <span className="checbox-chose"></span>
              </div>
              <div className="m-l12" onTouchTap={this.onClickEditInsurant.bind(this, val.id)}>
                {val.insurantName}
                <p>
                  <span className="col-9b9b9b">身份证 </span>
                  2340 **** **** 2312
                </p>
              </div>
            </div>
            <span></span>
          </div>
        )
      })
    )
  }

  renderContent(insuredResponse) {
    return(
      <div>
        <div className="tagging">
          选择被保人
        </div>
        <div className="p-l-10 bg-fff">
          {
            this.renderInsuredList(insuredResponse)
          }
        </div>
        <div className="sup-btns" onTouchTap={this.onclickAddInsured.bind(this)}>
          <div className="sup-btn">
            添加被保险人
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { title } = this.props.route
    const { insured } = this.props
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} rightTxt="完成" onClickRight={this.onClickRight.bind(this)} onClickBack={this.onClickBack.bind(this)} title={title}/>
        {
          insured.getInsuredUserBegin ?
          <Loading /> :
          insured.getIResultData && !!insured.getIResultData.responseData ?
          this.renderContent(insured.getIResultData.responseData) :
          "系统异常请稍后重试"
        }
      </div>
    )
  }
}
export default supervise

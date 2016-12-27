import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import { App, YztApp } from 'utils/native_h5'


export default class country extends React.Component {
  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  onClickBack() {
    history.go(-1)
  }
  onClickRight() {
    console.log(1)
  }

  render() {
    const { title } = this.props.route
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} rightTxt="不承保地区" onClickRight={this.onClickRight.bind(this)} onClickBack={this.onClickBack.bind(this)} title={title}/>
        <section>
          <div className="search-waner">
            <input type="text" className="search-txt" placeholder="国家名称拼音、中文、英文"/>
          </div>
          <div className="country-m-tit col-b2b2b2">
            热门国家和地区
          </div>
          <div className="country-names">
            <div className="country-name">
              申根国家 Schengen states
            </div>
            <div className="country-name">
              申根国家 Schengen states
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default country

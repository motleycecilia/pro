import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Header from 'components/Header'
import { App, YztApp } from 'utils/native_h5'


export default class guaranteeInfo extends React.Component {

  static contextTypes = {
      router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    App.goBackAction = function () {
      this.onClickBack()
    }.bind(this)
  }
  onClickBack() {
    history.go(-1)
  }

  render() {
    const { title } = this.props.route
    const hrefUrl = decodeURIComponent(this.props.location.query.guarantInfo).replace("http","https")
    return (
      <div className="bg-fff">
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)}
          title={title}/>
        <iframe src={hrefUrl} width="100%" height="1000px">

        </iframe>
      </div>
    )
  }
}
export default guaranteeInfo

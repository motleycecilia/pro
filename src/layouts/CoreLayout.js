import React from 'react'
import { connect } from 'react-redux'
import { App, YztApp } from 'utils/native_h5'


export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    pending:false
  }

  componentWillMount() {
    YztApp.showOrHideNavMoreBtn(false)
    YztApp.isNeedBack()
  }

  render () {
    return (
    <div className="page-container" style={{ marginTop: !App.IS_YZT ? '0' : '-42px' }}>
      <div className="view-container">
        {this.props.children}
      </div>
    </div>
    );
  }
}

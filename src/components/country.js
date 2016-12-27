import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import Header from 'components/Header'
import Loading from 'components/loading'
import { App, YztApp } from 'utils/native_h5'


export default class country extends React.Component {
  static propTypes = {
    onClickCountry: PropTypes.func.isRequired
  }
  
  onClickCountry(name) {
    this.props.onClickCountry(name)
  }

  render() {
    return(
      <div>
        <section>
          <div className="search-waner">
            <input type="text" className="search-txt" placeholder="国家名称拼音、中文、英文"/>
          </div>
          <div className="country-m-tit col-b2b2b2">
            热门国家和地区
          </div>
          <div className="country-names">
            <div className="country-name" onTouchTap={this.onClickCountry.bind(this,"申根国家 Schengen states")}>
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

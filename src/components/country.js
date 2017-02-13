import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import countrysData from 'mock/countrys'


export default class country extends React.Component {
  state = {
    isSearch: false
  }
  static propTypes = {
    productId: PropTypes.string.isRequired,
    onClickCountry: PropTypes.func.isRequired
  }
  onClickCountry(name) {
    this.props.onClickCountry(name)
  }
  renderCountry() {
    const productId = this.props.productId + ""
    return(
      countrysData[productId].map((val, index) => {
        return(
          <div className="country-name" key={index} onTouchTap={this.onClickCountry.bind(this,val.name)}>
            {
              val.name
            }
          </div>
        )
      })
    )
  }

  render() {
    return(
      <div>
        <section>
          {
            this.state.isSearch && <div className="search-waner">
              <input type="text" className="search-txt" placeholder="国家名称拼音、中文、英文"/>
            </div>
          }
          <div className="country-m-tit col-b2b2b2">
            热门国家和地区
          </div>
          <div className="country-names">
            {
              this.renderCountry()
            }
          </div>
        </section>
      </div>
    )
  }
}
export default country

import React, { PropTypes } from 'react'
import Header from 'components/Header'
import { createChecker } from 'utils/checker'
import BtnLoading from 'components/btnLoading'
import Loading from 'components/loading'
import { App, YztApp } from 'utils/native_h5'

export default class testView extends React.Component {

  state = {
    datas: [''],
    datasNumb: 1
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

  onClickDatesAdd() {
    let date = this.state.datas
    this.setState({
      datas: date.concat([""])
    })
    console.log(this.state.datas)
  }

  onClickDatesReduce() {
    let date = this.state.datas
    date.pop();
    this.setState({
      datas: date
    })
  }

  onChangeDate(index, e) {
    let date = this.state.datas
    date[index] = e.target.value
  }

  renderDates() {
    return(
      this.state.datas.map((val, index) => {
        return (
          <div key={ index }>
            <input type="date" onChange={this.onChangeDate.bind(this, index)}/>
          </div>
        )
      })
    )
  }


  render() {
    const { title } = this.props.route
    return(
      <div>
        <Header isVisibility={!App.IS_YZT} onClickBack={this.onClickBack.bind(this)} title={title}/>
        <section >
          main
        </section>
        <section>
          {
            this.renderDates()
          }
        </section>
        <div onTouchTap={this.onClickDatesAdd.bind(this)}>
          +
        </div>
        <div onTouchTap={this.onClickDatesReduce.bind(this)}>
          -
        </div>
      </div>
    )
  }
}
export default testView

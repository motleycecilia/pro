import React, { PropTypes } from 'react'

class Header extends React.Component {
  static propTypes = {
    isVisibility: PropTypes.bool.isRequired,
    onClickBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    const { isVisibility, onClickBack, title, rightTxt, onClickRight } = this.props
    return (
        isVisibility
        ?
          <header className="brand-title">
            {title}
            <div className="brand-title-back goBack" onTouchTap={onClickBack}></div>
            {
              rightTxt && <div className="brand-title-done" onTouchTap={onClickRight}>
                {rightTxt}
              </div>
            }
          </header>
        : <div></div>
    )
  }
}

export default Header

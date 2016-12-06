import React, { PropTypes } from 'react'

class Header extends React.Component {
  static propTypes = {
    isVisibility: PropTypes.bool.isRequired,
    onClickBack: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    const { isVisibility, onClickBack, title } = this.props
    return (
        isVisibility
        ?
          <header className="brand-title">
            <span className="brand-title-back" onTouchTap={onClickBack}></span>
            {title}
          </header>
        : <div></div>
    )
  }
}

export default Header

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
            {title}
            <div className="brand-title-back goBack" onTouchTap={onClickBack}>返回</div>
          </header>
        : <div></div>
    )
  }
}

export default Header

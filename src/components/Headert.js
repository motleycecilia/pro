import React, { PropTypes } from 'react'

class Headert extends React.Component {
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
          <header className="brand-titlet">
            {title}
            <div className="brand-title-backc" onTouchTap={onClickBack}></div>
          </header>
        : <div></div>
    )
  }
}

export default Headert

import React, { PropTypes } from 'react'

class Modal extends React.Component {
  static propTypes = {
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    goto: PropTypes.func.isRequired,
    gotoText: PropTypes.string,
    zIndex: PropTypes.number,
    cancelHtml: PropTypes.bool,
    cancel: PropTypes.func
  }

  render() {
    const { content, goto, gotoText, cancel } = this.props
    return (
      <div className="mask modalWrap" style={{ zIndex: this.props.zIndex }}>
        <div className="dialog-fixed-bottom">
          <div className="align-center">
            {content || '出错了，请稍后再试！'}
          </div>
          <div className="btn-horizontally ma-t25">
            <div className="btn-remind-blue" onTouchTap={goto}>
              {gotoText || '我知道了'}
            </div>
          </div>
          {
            this.props.cancelHtml && <div className="btn-remind-cancel" onTouchTap={cancel}>取消</div>
          }
        </div>
      </div>
  )
  }
}

export default Modal

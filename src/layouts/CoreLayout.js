import React from 'react'
import { connect } from 'react-redux'
import { isLogin, userLogin} from 'actions'
import { App, YztApp } from 'utils/native_h5'

const EXCLUDE = [''];

@connect(state => ({
  loginInfo: state.loginInfo,
  login: state.login
}), {
  isLogin,
  userLogin
})

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
    // this.props.isLogin()
  }
  componentDidMount(){
    let path = this.props.location.pathname;
    this.common(path);
  }
  componentWillReceiveProps(nextProps) {
    let path = nextProps.location.pathname
    if(!EXCLUDE.some((item)=>item==path)){
      if(this.props.location.pathname != path){
        this.setState({pending:true});
      }
      else{
        !nextProps.login.pending && this.setState({pending:false});
      }
    }
    if(nextProps.login.pending){
      return;
    }
    if(!EXCLUDE.some((item)=>item==path)){
      this.common(path);
    }
  }

  common(path) {
    let {isLogin,sso,pending,error} = this.props.login;
    //如果接口没有失败且没有登录态
    if(!error && !pending && !EXCLUDE.some((item)=>item==path)){
      this.props.userLogin();
    }
  }

  componentDidMount(){
    let path = this.props.location.pathname;

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

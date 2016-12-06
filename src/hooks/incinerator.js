export default function (name, code, handlers) {
  const defaultSetting = {
    success: '000000',
    unlogin: '900002'
  }
  const apiMap = [ {//news
    name: 'getDetail',
    statusCode: defaultSetting
  }, {
    name: 'isLogin',
    statusCode: defaultSetting
  }, {
    name:'checkOrderPayCondition',
    statusCode:defaultSetting
  }, {
    name:'getAccessTicket',
    statusCode:defaultSetting
  }, {
    name: 'getAccountInfo',//用户信息回显
    statusCode: defaultSetting
  },{
    name:'orangeAccount',
    statusCode:{
      submit:'000001',
      authenticate:'000002',
      orange:'000003'
    }
  }]

  apiMap.forEach(api => {
    if (api.name === name) {
      const index = Object.values(api.statusCode).indexOf(code)
      if (index !== -1) {
        handlers[Object.keys(api.statusCode)[index]]()
      } else {
        handlers.fail()
      }
    }
  })
}

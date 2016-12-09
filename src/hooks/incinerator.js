export default function (name, code, handlers) {
  const defaultSetting = {
    success: '000000',
    unlogin: '900002'
  }
  const apiMap = [ {//news
      name: 'getDetail',
      statusCode: defaultSetting
    }
  ]
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

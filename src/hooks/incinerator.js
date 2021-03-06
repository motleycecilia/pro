export default function (name, code, handlers) {
  const defaultSetting = {
    success: '000000',// 1000
    unlogin: '900002',
    gpSuccess: 1000,
    gpUnlogin: 9003
  }
  const apiMap = [ {//news
      name: 'getDetail',
      statusCode: defaultSetting
    },
    {
      name: 'getPolicyUserInfo',
      statusCode: defaultSetting
    },
    {
      name:'checkOrderPayCondition',
      statusCode:defaultSetting
    },
    {
      name:'checkIfAdult',
      statusCode:defaultSetting
    },
    {
      name: 'insuredInfo',
      statusCode: defaultSetting
    },
    {
      name: 'premiumMeasure',
      statusCode: defaultSetting
    },
    {
      name: 'preSubmit',
      statusCode: defaultSetting
    },
    {
      name:'orangeAccount',
      statusCode:{
        submit:'000001',
        authenticate:'000002',
        orange:'000003'
      }
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

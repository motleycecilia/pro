import React from 'react'
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout'

import mainView from 'react-router!views/mainView'
import detail from 'react-router!views/detail'
import bePeople from 'react-router!views/People/bePeople'
import supervise from 'react-router!views/People/supervise'
import policyUser from 'react-router!views/People/policyUser'
import login from 'react-router!views/login'
import testView from 'react-router!views/testView'
import guarantee from 'react-router!views/detail/guarantee'
import guaranteeInfo from 'react-router!views/detail/guaranteeInfo'
import healthInform from 'react-router!views/detail/healthInform'
import fillmation from 'react-router!views/fillmation'
import premium from 'react-router!views/premium'
import invoice from 'react-router!views/invoice'
import country from 'react-router!views/premium/country'
import confirm from 'react-router!views/fillmation/confirm'

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={mainView}/>
    <Route      component={detail} path='/detail' title="详情"/>
    <Route      component={bePeople} path='/bePeople' title="被投保人信息编辑"/>
    <Route      component={supervise} path='/supervise' title="被投保人管理"/>
    <Route      component={guarantee} path='/guarantee' title="保障内容"/>
    <Route      component={guaranteeInfo} path='/guaranteeInfo' title="保障内容"/>
    <Route      component={healthInform} path='/healthInform' title="健康告知"/>
    <Route      component={fillmation} path='/fillmation' title="保单填写"/>
    <Route      component={policyUser} path='/policyUser' title="编辑投保人"/>
    <Route      component={premium} path='/premium' title="保费测算"/>
    <Route      component={invoice} path='/invoice' title="发票信息"/>
    <Route      component={confirm} path='/confirm' title="保单信息确认"/>
    <Route      component={country} path='/country' title="国家"/>
    <Route      component={mainView} path='/main' title="main"/>
    <Route      component={testView} path='/testView' title="testView"/>
    <Route      component={login} path='/login' title="回话超时"/>
  </Route>
);

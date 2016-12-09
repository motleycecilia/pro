import React from 'react'
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout'

import mainView from 'react-router!views/mainView'
import detail from 'react-router!views/detail'
import bePeople from 'react-router!views/People/bePeople'
import supervise from 'react-router!views/People/supervise'
import login from 'react-router!views/login'
import testView from 'react-router!views/testView'
import guarantee from 'react-router!views/detail/guarantee'
import guaranteeInfo from 'react-router!views/detail/guaranteeInfo'

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={mainView}/>
    <Route      component={detail} path='/detail' title="详情"/>
    <Route      component={bePeople} path='/bePeople' title="被投保人信息编辑"/>
    <Route      component={supervise} path='/supervise' title="被投保人管理"/>
    <Route      component={guarantee} path='/guarantee' title="保障内容"/>
    <Route      component={guaranteeInfo} path='/guaranteeInfo' title="保障内容"/>
    <Route      component={mainView} path='/main' title="main"/>
    <Route      component={testView} path='/testView' title="testView"/>
    <Route      component={login} path='/login' title="回话超时"/>
  </Route>
);

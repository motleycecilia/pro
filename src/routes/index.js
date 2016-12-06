import React from 'react'
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout'

import indexView from 'react-router!views/indexView'
import detailView from 'react-router!views/detail'
import mainView from 'react-router!views/mainView'
import confirmView from 'react-router!views/policy/confirm'
import bePeople from 'react-router!views/People/bePeople'
import fillMation from 'react-router!views/fillmation'
import supervise from 'react-router!views/People/supervise'
import guarantee from 'react-router!views/detail/guarantee'
import guaranteeInfo from 'react-router!views/detail/guaranteeInfo'
import order from 'react-router!views/detail/order'
import login from 'react-router!views/login'
import Welding from 'react-router!views/welding'
import test from 'react-router!views/fillmation/test'

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={detailView}/>
    <Route      component={indexView} path='/index' title="详情"/>
    <Route      component={detailView} path='/detail' title="详情页"/>
    <Route      component={confirmView} path='/confirm' title="保单信息确认"/>
    <Route      component={bePeople} path='/bePeople' title="被投保人信息编辑"/>
    <Route      component={fillMation} path='/fillMation' title="保单信息填写"/>
    <Route      component={supervise} path='/supervise' title="被投保人管理"/>
    <Route      component={guarantee} path='/guarantee' title="保障内容"/>
    <Route      component={guaranteeInfo} path='/guaranteeInfo' title="保障内容"/>
    <Route      component={order} path='/order' title="订单详情"/>
    <Route      component={mainView} path='/main' title="main"/>
    <Route      component={test} path='/test' title="test"/>
    <Route      component={login} path='/login' title="回话超时"/>
    <Route      component={Welding} path='/welding' title='处理中' backPath="/detail"/>
  </Route>
);

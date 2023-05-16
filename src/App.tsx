import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Competition from './page/Competition'
import CompetitionCreate from './page/CompetitionCreate'
import TestCreate from './page/TestCreate'
import Login from './page/Login'

import TestManage from './page/TestManage'
import BlogManage from './page/BlogManage'
import BlogCreate from './page/BlogCreate'
import Test from './page/Test'
import UserManager from './page/UserManager'
import CompetitionManage from './page/CompetitionManage'
import Register from './page/Register'

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Competition' element={<Competition />} />
      <Route path='/CompetitionCreate' element={<CompetitionCreate />} />
      <Route path='/CompetitionManage' element={<CompetitionManage />} />
      <Route path='/TestCreate' element={<TestCreate />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/TestManage' element={<TestManage />} />
      <Route path='/Test' element={<Test />} />
      <Route path='/UserManager' element={<UserManager />} />
      <Route path='/blogManage' element={<BlogManage />} />
      <Route path='/BlogCreate' element={<BlogCreate />} />
    </Routes>
  )
}
export default App

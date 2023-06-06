import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Competition from './page/Competition'
import TestCreate from './page/TestCreate'
import Login from './page/Login'

import TestManage from './page/TestManage'
import BlogManage from './page/BlogManage'
import BlogCreate from './page/BlogCreate'
import BlogDetail from './page/BlogDetail'
import ListBlog from './page/ListBlog'
import Test from './page/Test'
import UserManager from './page/User'
import CompetitionManage from './page/CompetitionManage'
import CompetitionCreate from './page/CompetitionCreate'
import CompetitionTest from './page/CompetitionTest'
import Register from './page/Register'
import Listcompetition from './page/Listcompetition'
import TestSchedule from './page/TestSchedule'
import ExamResult from './page/ExamResult'
function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Competition' element={<Competition />} />
      <Route path='/CompetitionCreate' element={<CompetitionCreate />} />
      <Route path='/CompetitionManage' element={<CompetitionManage />} />
      <Route path='/CompetitionTest' element={<CompetitionTest />} />
      <Route path='/TestCreate' element={<TestCreate />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/TestManage' element={<TestManage />} />
      <Route path='/Test' element={<Test />} />
      <Route path='/User' element={<UserManager />} />
      <Route path='/blogManage' element={<BlogManage />} />
      <Route path='/BlogCreate' element={<BlogCreate />} />
      <Route path='/BlogDetail' element={<BlogDetail />} />
      <Route path='/ListBlog' element={<ListBlog />} />
      <Route path='/Listcompetition' element={<Listcompetition />} />
      <Route path='/TestSchedule' element={<TestSchedule />} />
      <Route path='/ExamResult/:id' element={<ExamResult />} />
    </Routes>
  )
}
export default App

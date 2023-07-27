import React from 'react'
import Home from '~/page/Client/Home'
import HomeBlogDetail from '~/page/Client/BlogDetail'
import ListExamCompetition from '~/page/Client/ListExamCompetition'
import Competition from '~/page/Competition'
import TestCreate from '~/page/TestCreate'
import Login from '~/page/Login'
import TestManage from '~/page/TestManage'
import BlogManage from '~/page/BlogManage'
import BlogCreate from '~/page/BlogCreate'
import BlogDetail from '~/page/BlogDetail'
import Test from '~/page/Test'
import UserManager from '~/page/User'
import CompetitionManage from '~/page/CompetitionManage'
import CompetitionCreate from '~/page/CompetitionCreate'
import CompetitionTest from '~/page/CompetitionTest'
import Register from '~/page/Register'
import Listcompetition from '~/page/Client/Listcompetition'
import ExamStart from '~/page/Client/ExamStart'
import TestSchedule from '~/page/Client/TestSchedule'
import ExamResult from '~/page/ExamResult'
import PrizeManage from '~/page/PrizeManage'
import PrizeTypeManage from '~/page/PrizeTypeManage'
import PrizeData from '~/page/Prize/PrizeData'
import SettingManage from '~/page/SettingManage'
import DepartmentManage from '~/page/Department'
import ExamsManage from '~/page/ExamsManage'
import FinishedExam from '~/page/Client/FinishedExam'
import HistoryCompetition from '~/page/Client/HistoryCompetition'
import PrizeCompetition from '~/page/Client/PrizeCompetition'
import Error from '~/page/404'
import ResultManage from '~/page/ResultManage'
interface IPramsRoute {
  path: string
  element: JSX.Element
}
//tài khoản admin
export const AdminRoute: IPramsRoute[] = [
  { path: '/CompetitionCreate', element: <CompetitionCreate /> },
  { path: '/SettingManage', element: <SettingManage /> },
  { path: '/PrizeManage', element: <PrizeManage /> },
  { path: '/ExamsManage', element: <ExamsManage /> },
  { path: '/PrizeTypeManage', element: <PrizeTypeManage /> },
  { path: '/DepartmentManage', element: <DepartmentManage /> },
  { path: '/User', element: <UserManager /> },
  { path: '/blogManage', element: <BlogManage /> },
  { path: '/BlogCreate', element: <BlogCreate /> },
  { path: '/BlogDetail', element: <BlogDetail /> },

  { path: '/Prize/Competition/:comId', element: <PrizeData /> },

  { path: '/ResultManage', element: <ResultManage /> }
]
//tài khoản admin và giảng viên
export const TeacherAdminRoute = [
  { path: '/CompetitionManage', element: <CompetitionManage /> },
  { path: '/TestCreate', element: <TestCreate /> },
  { path: '/TestManage', element: <TestManage /> },
  //   { path: '/Test', element: <Test /> },

  {
    path: '/TestCreate/Test/:examId/Competition/:comId',
    element: <TestCreate />
  },
  { path: '/Tests/Competition/:comId', element: <TestManage /> }
]
//tài khoản admin,giảng viên, user
export const ProtectedRoute: IPramsRoute[] = [
  { path: '/HistoryCompetition', element: <HistoryCompetition /> },
  { path: '/PrizeCompetition', element: <PrizeCompetition /> },
  { path: '/Listcompetition', element: <Listcompetition /> },
  { path: '/ListExamCompetition', element: <ListExamCompetition /> },
  { path: '/ExamStart', element: <ExamStart /> },
  { path: '/TestSchedule', element: <TestSchedule /> },
  { path: '/FinishedExam', element: <FinishedExam /> },
  { path: '/ExamResult/:id', element: <ExamResult /> }
]
//chưa đăng nhập
export const PublicRoute: IPramsRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/HomeBlogDetail/:id', element: <HomeBlogDetail /> },
  { path: '/Register', element: <Register /> },
  { path: '/Login', element: <Login /> },
  { path: '/*', element: <Error /> }
]

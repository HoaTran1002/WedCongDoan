import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeBlogDetail from '~/page/Client/BlogDetail'
import Error from './page/404'
import Home from './page/Client/Home'
import Listcompetition from './page/Client/Listcompetition'
import Login from './page/Login'
import Register from './page/Register'
import PrivateRoute from './routes/PrivateRoute'
import {
  AdminRoute,
  ProtectedRoute,
  TeacherAdminRoute
  // PublicRoute,
  // TeacherRoute,
  // UserRoute
} from './routes/Routes'
interface IRoute {
  path: string
  element: JSX.Element
}

function App(): JSX.Element {
  return (
    <Routes>
      {/* bắt buộc là admin */}
      <Route element={<PrivateRoute roles={[1]} />}>
        {AdminRoute.map((item: IRoute, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Route>
      {/* tài khoản admin và giảng viên */}
      <Route element={<PrivateRoute roles={[1, 2]} />}>
        {TeacherAdminRoute.map((item: IRoute, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Route>
      {/* tài khoản admin,giảng viên, user */}
      <Route element={<PrivateRoute roles={[1, 2, 3]} />}>
        {ProtectedRoute.map((item: IRoute, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Route>
      {/* không cần đăng nhập */}
      <Route path='/Listcompetition' element={<Listcompetition />} />
      <Route path={'/HomeBlogDetail/:id'} element={<HomeBlogDetail />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Login' element={<Login />} />
      <Route path='*' element={<Error />} />
      <Route path='/' element={<Home />} />
    </Routes>
  )
}
export default App

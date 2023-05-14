import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Test from './page/Test'

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Test' element={<Test />} />
    </Routes>
  )
}
export default App

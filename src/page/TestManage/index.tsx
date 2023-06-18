import React from 'react'
import LayoutAdmin from '~/components/layout/LayoutAdmin'
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp'
import { Box, Button } from '@mui/material'
import { blue, yellow } from '@mui/material/colors'
import { Link, useParams } from 'react-router-dom'
import ModalAdd from './ModalAdd'
import DataInput from './DataInput'

const Index = (): JSX.Element => {
  const { comId } = useParams()

  return (
    <>
      <LayoutAdmin>
        <ModalAdd Title='THÊM MỚI BÀI THI'>
          <DataInput />
        </ModalAdd>
      </LayoutAdmin>
    </>
  )
}

export default Index

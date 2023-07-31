import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, MenuItem, Snackbar } from '@mui/material'
import useFetch from '~/hook/useFetch'
import { getAllPrizeTypes } from '~/api/prizeTypesApi'
import { getAllPrize } from '~/api/prizesApi'
import { useParams } from 'react-router-dom'
import { editcompPrize, insert } from '~/api/CompetitionsPrizesAPI'
import MuiAlert from '@mui/material/Alert'
import MessageAlert from '~/components/MessageAlert'
import { useState } from 'react'
import { LoadingContext } from './PrizeData'

interface PrizeType {
  priTid: number
  priTname: string
}
interface Prize {
  priId: number
  priName: string
}

export default function TextFields(prop: {
  edit: boolean
  cpid: string
  priId: string
  comId: string
  priTid: string
  quantity: string
  prizeDetail: string
  // close?: () => void
  handleChange?: () => void
}): JSX.Element {
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [priType, setPriType] = React.useState<string>(prop.priTid || '')
  const [number, setNumber] = React.useState<string>(prop.quantity || '')
  const [detailPrize, setDetailPrize] = React.useState<string>(
    prop.prizeDetail || ''
  )
  const [pri, setPri] = React.useState<string>(prop.priId || '')
  const [prizeTypeState, callPrizeTypes] = useFetch()
  const [prizesState, callPrizes] = useFetch()
  const [prizesCompState, prizesCompCall] = useFetch()
  const [prizeCompEdit, prizeCompEditCall] = useFetch()
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<string>('')

  const { comId } = useParams()
  React.useEffect(() => {
    callPrizeTypes(getAllPrizeTypes)
  }, [])
  React.useEffect(() => {
    callPrizes(getAllPrize)
  }, [])

  const PrizeTypes = prizeTypeState.payload || []
  const Prizes = prizesState.payload || []

  const onchangePriType = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPriType(event.target.value)
  }
  const onchangeNumber = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setNumber(event.target.value)
  }
  const onchangeDetailPrize = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setDetailPrize(event.target.value)
  }
  const onchangePrize = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setPri(event.target.value)
  }
  const handleCloseSuccess = (): void => {
    setShowSuccess(false)
  }
  const handleCloseError = (): void => {
    setShowError(false)
  }
  const requestData: {
    priId: number
    comId: number
    priTid: number
    prizeDetail: string
    quantity: number
  } = {
    priId: Number(pri),
    comId: comId ? Number(comId) : 0,
    priTid: Number(priType),
    prizeDetail: detailPrize,
    quantity: Number(number)
  }

  const requestEditData: {
    cpid: number
    priId: number
    comId: number
    priTid: number
    prizeDetail: string
    quantity: number
  } = {
    cpid: Number(prop.cpid),
    comId: comId ? Number(comId) : 0,
    priId: Number(pri),
    priTid: Number(priType),
    prizeDetail: detailPrize,
    quantity: Number(number)
  }
  if (comId) {
    requestData.comId = Number(comId)
    requestEditData.comId = Number(comId)
  }
  const paramLoading = React.useContext(LoadingContext)
  const submitAddData = async (): Promise<void> => {
    await prizesCompCall(async (): Promise<void> => {
      await insert(requestData)
    })
    // prop.handleChange()
    // setSeverity('info')
    // setMessage('thêm thành công!')
    paramLoading.setLoading()
    if (paramLoading.setMessageAdd) {
      paramLoading.setMessageAdd()
    }
  }
  const submitEditData = async (): Promise<void> => {
    await prizeCompEditCall(async (): Promise<void> => {
      await editcompPrize(requestEditData)
    })

    setSeverity('info')
    setMessage('chỉnh sửa thành công!')
    paramLoading.setLoading()
    if (paramLoading.setMessageEdit) {
      paramLoading.setMessageEdit()
    }
  }

  if (prizeCompEdit.error) {
    setSeverity('error')
    setMessage('chỉnh sửa thất bại')
  }
  if (message != null) {
    setTimeout(async (): Promise<void> => {
      setMessage('')
    }, 3000)
  }
  return (
    <>
      {message && <MessageAlert message={message} severity={severity} />}
      <>
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={handleCloseSuccess}
        >
          <MuiAlert
            onClose={handleCloseSuccess}
            severity='success'
            elevation={6}
            variant='filled'
          >
            Acction successful!
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={showError}
          autoHideDuration={3000}
          onClose={handleCloseSuccess}
        >
          <MuiAlert
            onClose={handleCloseError}
            severity='error'
            elevation={6}
            variant='filled'
          >
            Acction Failed!
          </MuiAlert>
        </Snackbar>
      </>
      {prop.edit ? (
        <>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1, width: '45%' },
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gridTemplateColumns: { sm: '1fr 1fr' },
              gap: 2
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              value={number}
              id='filled-basic'
              label='Số lượng'
              onChange={onchangeNumber}
              variant='outlined'
            />
            <TextField
              value={detailPrize}
              id='filled-basic'
              label='Chi tiết giải thưởng'
              onChange={onchangeDetailPrize}
              variant='outlined'
              inputProps={{
                pattern: '[0-9]*', // Chỉ cho phép nhập số
                inputMode: 'numeric' // Hiển thị bàn phím số trên thiết bị di động
              }}
            />
            <TextField
              value={pri}
              onChange={onchangePrize}
              id='selectDep'
              label='Chọn giải thưởng'
              select
            >
              {Prizes == null ? (
                <MenuItem value='10'>Ten</MenuItem>
              ) : (
                Prizes.map((item: Prize, index: number): JSX.Element => {
                  return (
                    <MenuItem
                      sx={{ color: 'black' }}
                      key={index}
                      value={item.priId}
                    >
                      {item.priName}
                    </MenuItem>
                  )
                })
              )}
            </TextField>
            <TextField
              value={priType}
              onChange={onchangePriType}
              id='selectDep'
              label='Loại Giải'
              select
            >
              {PrizeTypes == null ? (
                <MenuItem value='0'>Chưa có loại giải</MenuItem>
              ) : (
                PrizeTypes.map(
                  (item: PrizeType, index: number): JSX.Element => {
                    return (
                      <MenuItem
                        sx={{ color: 'black' }}
                        key={index}
                        value={item.priTid}
                      >
                        {item.priTname}
                      </MenuItem>
                    )
                  }
                )
              )}
            </TextField>
          </Box>
          <Button
            onClick={submitEditData}
            sx={{
              position: 'relative',
              left: '45%',
              right: '20%',
              marginTop: 2
            }}
            variant='contained'
          >
            LƯU CHỈNH SỬA
          </Button>
        </>
      ) : (
        <>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1, width: '45%' },

              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gridTemplateColumns: { sm: '1fr 1fr' },
              gap: 2
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              id='filled-basic'
              label='Số lượng'
              onChange={onchangeNumber}
              variant='outlined'
            />
            <TextField
              id='filled-basic'
              label='Chi tiết giải thưởng'
              onChange={onchangeDetailPrize}
              variant='outlined'
              inputProps={{
                pattern: '[0-9]*', // Chỉ cho phép nhập số
                inputMode: 'numeric' // Hiển thị bàn phím số trên thiết bị di động
              }}
            />
            <TextField
              onChange={onchangePrize}
              id='selectDep'
              label='Chọn giải thưởng'
              select
            >
              {Prizes == null ? (
                <MenuItem value='10'>Ten</MenuItem>
              ) : (
                Prizes.map((item: Prize, index: number): JSX.Element => {
                  return (
                    <MenuItem
                      sx={{ color: 'black' }}
                      key={index}
                      value={item.priId}
                    >
                      {item.priName}
                    </MenuItem>
                  )
                })
              )}
            </TextField>
            <TextField
              onChange={onchangePriType}
              id='selectDep'
              label='Loại Giải'
              select
            >
              {PrizeTypes == null ? (
                <MenuItem value='0'>Chưa có loại giải</MenuItem>
              ) : (
                PrizeTypes.map(
                  (item: PrizeType, index: number): JSX.Element => {
                    return (
                      <MenuItem
                        sx={{ color: 'black' }}
                        key={index}
                        value={item.priTid}
                      >
                        {item.priTname}
                      </MenuItem>
                    )
                  }
                )
              )}
            </TextField>
          </Box>
          <Button
            onClick={submitAddData}
            sx={{
              position: 'relative',
              left: '45%',
              right: '20%',
              marginTop: 2
            }}
            variant='contained'
          >
            TẠO MỚI
          </Button>
        </>
      )}
    </>
  )
}

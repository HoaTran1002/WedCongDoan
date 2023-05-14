import {
  Box,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup
} from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import { blue } from '@mui/material/colors'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import React, { useEffect, useState } from 'react'
import Layout from '~/components/layout/Layout'
import axios from 'axios'

interface Question {
  id: number
  name: string
  asw: string
  correctAsw: string
  type: string
}

const Index = (): JSX.Element => {
  const [Questions, setQuestion] = useState<Question[]>([])
  const [loading, setLoading] = React.useState(false)
  const [loadingPage, setLoadingPage] = React.useState(false)

  let arrStr: string[]
  function handleSubmit(): void {
    setLoading(true)
  }
  useEffect(() => {
    axios.get<Question[]>('https://626d498a5267c14d56798da4.mockapi.io/api/v1/questions').then((response) => {
      console.log(Questions)
      setQuestion(response.data)
    })
  }, [])
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          {Questions.map(function (q, index) {
            arrStr = q.asw.split('<--->')
            if (q.type == 'Radio') {
              return (
                <Card sx={{ maxWidth: '100%', mt: 4, p: 3, background: blue[50] }} key={index}>
                  <FormControl>
                    <FormLabel id='demo-radio-buttons-group-label' sx={{ color: 'black', fontWeight: 500 }}>
                      {index + 1}. {q.name} ?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                      id={`${index}`}
                    >
                      <FormControlLabel value='answer1' control={<Radio />} label={'A. ' + arrStr[0]} />
                      <FormControlLabel value='answer2' control={<Radio />} label={'B. ' + arrStr[1]} />
                      <FormControlLabel value='answer3' control={<Radio />} label={'C. ' + arrStr[2]} />
                      <FormControlLabel value='answer4' control={<Radio />} label={'D. ' + arrStr[3]} />
                    </RadioGroup>
                  </FormControl>
                </Card>
              )
            }
            return (
              <Card sx={{ maxWidth: '100%', mt: 4, p: 3, background: blue[50] }} key={index}>
                <FormControl>
                  <FormLabel id='demo-radio-buttons-group-label' sx={{ color: 'black', fontWeight: 500 }}>
                    {index + 1}. {q.name} ?
                  </FormLabel>
                  <FormGroup aria-labelledby='demo-radio-buttons-group-label'>
                    <FormControlLabel value='answer1' control={<Checkbox />} label={'A. ' + arrStr[0]} />
                    <FormControlLabel value='answer2' control={<Checkbox />} label={'B. ' + arrStr[1]} />
                    <FormControlLabel value='answer3' control={<Checkbox />} label={'C. ' + arrStr[2]} />
                    <FormControlLabel value='answer4' control={<Checkbox />} label={'D. ' + arrStr[3]} />
                  </FormGroup>
                </FormControl>
              </Card>
            )
          })}
          <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
            <Grid item xs={3}>
              <LoadingButton
                type='submit'
                sx={{ mt: 4, mb: 4 }}
                color='primary'
                onClick={handleSubmit}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition='end'
                variant='contained'
              >
                <span>Send</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Layout>
    </>
  )
}
export default Index

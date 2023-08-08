import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import useFetch from '~/hook/useFetch'
import { Insert,getDepId,Edit } from '~/api/departmentApi'
import { EditCalendarOutlined } from '@mui/icons-material'
import { LoadingContext } from '.'
export default function DepTextFields(prop: {
  edit: boolean
  id: number
  depName: string
}): JSX.Element {
  const [depName, setDepname] = React.useState<string>(prop.depName|| '')
  const [getDep, callDepById] = useFetch()
  const [EditDep, callEditDep] = useFetch()
  const [depInsert, callDeptInsert] = useFetch()
  const loadingParams = React.useContext(LoadingContext)
  const onchangeDepName = function (event: React.ChangeEvent<HTMLInputElement>): void {
    setDepname(event.target.value)
  }
  const requestData: {
    depId: number
    depName: string
  } = {
    depId: prop.id,
    depName: depName
  }
  const requestDataCreate: {
    depName: string
  } = {
    depName: depName
  }
  const onSubmitForm = (): void => {
    callDeptInsert(async () => {
      try {
        await Insert(requestDataCreate)
      } catch (error) {
        console.log(error)
      }
    })
    loadingParams.setLoading()
  }
  const onSubmitFormEdit = (): void => {
    callEditDep(async () => {
      try {
        await Edit(requestData)
      } catch (error) {
        console.log('Thất bại')
      }
    })
    loadingParams.setLoading()
  }
  React.useEffect(() => {
    const request: { id: number } = { id: prop.id };
    callDepById(async () => {
      try {
        const response = await getDepId(request);
        await setDepname(response.depName);
      } catch (error) {
        console.log(error);
      }
    });
  }, []);
  return (
    <>
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
              defaultValue={depName}
              onChange={onchangeDepName}
              id='outlined-basic'
              label='Tên chuyên ngành'
              variant='outlined'
            />
          </Box>
          <Button
            onClick={onSubmitFormEdit}
            sx={{ position: 'relative', left: '45%', right: '20%', marginTop: 2 }}
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
            <TextField onChange={onchangeDepName} id='outlined-basic' label='Tên chuyên ngành' variant='outlined' />
          </Box>
          <Button
            onClick={onSubmitForm}
            sx={{ position: 'relative', left: '45%', right: '20%', marginTop: 2 }}
            variant='contained'
          >
            TẠO CHUYÊN NGÀNH MỚI
          </Button>
        </>
      )}
    </>
  )
}

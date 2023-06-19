import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, MenuItem } from '@mui/material'

import axios from 'axios'
import useFetch from '~/hook/Fetch'
import { Insert,getById,Edit } from '~/api/departmentApi'

export default function DepTextFields(prop: {
  edit: boolean
  id: number
  depName: string
}): JSX.Element {
  const [depName, setDepname] = React.useState<string>(prop.depName|| '')
  const [response, err, loader] = useFetch(getById(Number(prop.id)))
  
//   const [EdittUser, callEdittUser] = useFetch()

  const onchangeDepName = function (event: React.ChangeEvent<HTMLInputElement>): void {
    setDepname(event.target.value)
  }
  const requestData: {
    depName: string
  } = {
    depName: depName
  }

  const onSubmitForm = (): void => {
    const newDep= {
        "depName": depName,
      };
  
      const requestData = Insert(newDep );
      console.log(requestData);
      axios.post(requestData.enp, requestData.body, { headers: requestData.headers })
        .then(response => {
          console.log('Insert successful');
          // Xử lý response
        })
        .catch(error => {
          console.error('Insert failed', error);
          // Xử lý lỗi
        });
  }
  const onSubmitFormEdit = (): void => {
    const updateDep = {
        "depId": prop.id,
        "depName": depName,
      };
      const requestData = Edit(updateDep);
      axios.put(requestData.enp, requestData.body, { headers: requestData.headers })
        .then(response => {
          console.log('Insert successful');
          // Xử lý response
        })
        .catch(error => {
          console.error('Insert failed', error);
          // Xử lý lỗi
        });
  }
  React.useEffect(() => {
    if (response && response.data) {
        setDepname(response.data.depName)
        console.log(depName)
    }
  }, [response]);
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

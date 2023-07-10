import React, { useState } from 'react';
import {
    Box,
    SxProps,
    Button
} from '@mui/material'
import {TableWithFixedColumn,ColumnsProps} from './TableFixed';
import useFetch from '~/hook/useFetch';
import { getAllUser } from '~/api/userApi';


interface User {
    userId: string
    userName: string
    dateOfBirth: string
    email: string
    password: string
    userAddress: string
    roleId: number
    depId: number
  }
const Loader = (): JSX.Element => {
    const [userState, call] = useFetch()

    const columns:ColumnsProps[] = [
        {
            field: 'id',
            headerName: 'Id',
        },
        {
            field: 'username',
            headerName: 'User name',
        },
        {
            field: 'dateofbirth',
            headerName: 'Ngày sinh',
        },
        {
            field: 'email',
            headerName: 'Email',
        },
        {
            field: 'password',
            headerName: 'Mật khẩu',
        },
        {
            field: 'roleId',
            headerName: 'roleId',
        },
        {
            field: 'depId',
            headerName: 'depId',
        },
        {
            field: 'actions',
            type:'actions',
            getActions: (params:any) => [
                <button key='delete' onClick={():void=>show(params.id)}>Xóa</button>,
                <button key='edit' onClick={():void=>show(params.id)}>Sửa</button>,
                <button key='edit' onClick={():void=>show(params.id)}>Sửa</button>,
            ],
        },

    ]

    const users = userState?.payload
    const rows =
        users?.map((user: User) => ({
            id: user.userId,
            username: user.userName,
            dateofbirth: user.dateOfBirth,
            email: user.email,
            password: user.password,
            roleId: user.roleId,
            depId: user.depId
        })) || []

    const show =(params:any):void=>{
        console.log(params)
    }
    React.useEffect(() => {
        call(getAllUser)
    }, [])

    return (
        <>
            <Box
                sx={{
                    width:"100vw",
                    height:"100vh",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                }}
            >
                <TableWithFixedColumn
                    columns={columns}
                    rows={rows}
                    maxWidth={800}
                    numberItems={1}
                />

            </Box>
        </>
    );
};

export default Loader;
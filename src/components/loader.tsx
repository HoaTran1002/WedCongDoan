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
            width: 300
        },
        {
            field: 'username',
            headerName: 'User name',
            width: 300
        },
        {
            field: 'dateofbirth',
            headerName: 'Ngày sinh',
            width: 300
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300
        },
        {
            field: 'password',
            headerName: 'Mật khẩu',
            width: 300
        },
        {
            field: 'roleId',
            headerName: 'roleId',
            width: 300
        },
        {
            field: 'depId',
            headerName: 'depId',
            width: 300
        },
        {
            field: 'actions',
            width: 300,
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
                />

            </Box>
        </>
    );
};

export default Loader;
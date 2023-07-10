import React, { useState } from 'react';
import {
    Box,
    SxProps,
    Button
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

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
    
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    width: "100%",
                    height: "500px",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CircularProgress />
            </Box>
        </>
    );
};

export default Loader;
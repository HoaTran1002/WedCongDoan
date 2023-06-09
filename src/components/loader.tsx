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


const LoaderBlogMain = (): JSX.Element => {

    return (
        <Box
            sx={{
                width: "100%",
                height: "350px",
                borderRadius:"5px",
                boxShadow: "rgba(0, 0, 0, 0.1) -3px 4px 14px 0px",
            }}
        >
            <Box
                sx={{
                    height: "170px",
                    width: '100%',
                    animation: "grayAnimation 2s linear infinite"
                }}
            >
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding:"10px"
                }}
            >
                <p
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: '10px',
                        width: "100%"
                    }}
                >
                    <span
                        style={{
                            display: "block",
                            borderRadius: "20px",
                            animation: "grayAnimation 2s linear infinite 0.2s",
                            height: "10px",
                            width: "100%",
                            marginBottom: 0
                        }}
                    >
                    </span>
                    <span
                        style={{
                            display: "block",
                            borderRadius: "20px",
                            animation: "grayAnimation 2s linear infinite 0.2s",
                            height: "10px",
                            width: "100%",
                            marginBottom: 0
                        }}
                    ></span>
                </p>
                <p
                    style={{
                        display: "block",
                        borderRadius: "20px",
                        animation: "grayAnimation 2s linear infinite 0.5s",
                        height: "10px",
                        width: "40%",
                        marginBottom: 0
                    }}
                >

                </p>
                <p
                    style={{
                        display: "block",
                        borderRadius: "20px",
                        animation: "grayAnimation 2s linear infinite 0.5s",
                        height: "10px",
                        width: "40%",
                        marginBottom: 0
                    }}
                >

                </p>
            </Box>
        </Box>
    );
};

const LoaderBlogSub = (): JSX.Element => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
            }}
        >
            <Box
                sx={{
                    height: "90px",
                    width: "120px",
                    animation: "grayAnimation 2s linear infinite ",
                }}
            >
            </Box>
            <p
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: '10px',
                    width: "100%"
                }}
            >
                <span
                    style={{
                        display: "block",
                        borderRadius: "20px",
                        animation: "grayAnimation 2s linear infinite 0.2s",
                        height: "10px",
                        width: "100%",
                        marginBottom: 0
                    }}
                >
                </span>
                <span
                    style={{
                        display: "block",
                        borderRadius: "20px",
                        animation: "grayAnimation 2s linear infinite 0.2s",
                        height: "10px",
                        width: "100%",
                        marginBottom: 0
                    }}
                >
                </span>
                <span
                    style={{
                        display: "block",
                        borderRadius: "20px",
                        animation: "grayAnimation 2s linear infinite 0.4s",
                        height: "10px",
                        width: "100%",
                        marginBottom: 0
                    }}
                ></span>
            </p>
        </Box>
    )
}
export { LoaderBlogMain, Loader,LoaderBlogSub };
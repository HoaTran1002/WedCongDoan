import React from 'react'
import { Box, Container } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
interface Props {
    children: string | JSX.Element,
    close: () => void,
    open: boolean,
    title: string
}

const ModalWraper = (prop: Props): JSX.Element => {
    console.log(prop.open);
    
    return (
        <>
            {
                prop.open ? (
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            position: "fixed",
                            zIndex: "60"
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "#000",
                                opacity: "0.3",
                                zIndex: "60"
                            }}
                            onClick={prop.close}
                        >
                        </Box>
        
                        <Box
                            sx={{
                                position: "absolute",
                                backgroundColor: "white",
                                zIndex: "100",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%,-50%)",
                                padding: "10px",
                                width: { xs: '90%', md: "60%" },
                                borderRadius: "5px"
        
                            }}
                        >
                            <Box
                                component='span'
                                sx={{
                                    display: "inline-block",
                                    position: "absolute",
                                    right: "0",
                                    top: "0",
                                    padding: "10px",
                                    cursor: "pointer"
                                }}
                                onClick={prop.close}
                            >
                                <CloseIcon sx={{ fontSize: "30px", color: "#ff1a1a" }} />
                            </Box>
                            <h3
                                className='color-primary'
                                style={{
                                    textAlign: "center",
        
                                }}
                            >
                                {prop.title}
                            </h3>
                            <Box
                                sx={{
                                    height: "400px",
                                    overflowY: "scroll",
                                    padding: "0px 5px",
                                    '&::-webkit-scrollbar': {
                                        display: "none"
                                    }
                                }}
                            >
                                {
                                    prop.children
                                }
                            </Box>
                        </Box>
        
        
                    </Box>
                ) : (null)
            }
        </>
    )
}


export default ModalWraper
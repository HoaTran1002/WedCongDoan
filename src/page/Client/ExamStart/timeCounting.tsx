import React from 'react'
import { Grid,
     Box, Typography, SxProps, Container, Button } from '@mui/material'


const TimerCount = (): JSX.Element => {

    const [timeLeft, setTimeLeft] = React.useState<number>(() => {
        const startTime = localStorage.getItem("startTime");
        if (startTime) {
          const timePassed = (Date.now() - Number(startTime)) / 1000;
          const timeRemaining = Math.max(60 * 60 - timePassed, 0);
          return timeRemaining;
        }
        return 60 * 60;
    });

    const formatTime = (time:number):string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
    };
    React.useEffect(() => {
        if (!localStorage.getItem("startTime")) {
          localStorage.setItem("startTime", Date.now().toString());
        }
        
        const intervalId = setInterval(() => {
            setTimeLeft((timeLeft) => {
                if (timeLeft === 0) {
                  localStorage.removeItem("startTime");
                  return 0;
                }
                return Math.max(timeLeft - 1, 0);
              });
        }, 1000);
        
        return () => clearInterval(intervalId);
    }, []);
    return (
        <Box>
            <Box
                component='span'
                sx={{
                    display: { xs: "none", md: "inline" },
                    color: "#666",
                    fontWeight: "600",
                    fontSize: "17px"
                }}
            >
                Thời gian còn lại: &nbsp;
            </Box>
            <div style={{ color: "#1160ba", fontWeight: "600", fontSize: "30px" }}>{formatTime(timeLeft)}</div>
        </Box>
    )
}

export default TimerCount
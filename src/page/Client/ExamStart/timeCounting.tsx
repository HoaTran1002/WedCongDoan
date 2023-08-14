import React from 'react'
import { formatTime } from '~/utils/dateUtils'
import { Grid,
     Box, Typography, SxProps, Container, Button } from '@mui/material'


interface TimeCountingProps {
    examTimes:number
}

const TimerCount: React.FC<TimeCountingProps> = ({
    examTimes
}) => {
    const [time,setTime] = React.useState(examTimes)
    const [timeLeft, setTimeLeft] = React.useState<number>(() => {
        const startTime = localStorage.getItem("startTime");
        if (startTime) {
          const timePassed = (Date.now() - Number(startTime)) / 1000;
          const timeRemaining = Math.max(time * 60 - timePassed, 0);
          return timeRemaining;
        }
        return time * 60;
    });

    
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
    }, [examTimes]);
    React.useEffect(()=>{
        setTime(examTimes)
    },[examTimes])
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
import React from 'react'
import { Grid, Box, Typography, SxProps, Container, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { getAllPickerQuestion } from '~/api/PickerQuestions';
import { getAllQues } from '~/api/question';
import useFetch from '~/hook/useFetch';
import { IPickerQuestion, IQuestions } from '~/interface/Interface';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
interface PropsWatchExam {
    cuid: number;
    close: () => void;
}
interface QuestionsUserPicker {
    cuid: number,
    examId: number,
    pqid: number,
    quesId: number,
    quesTId: number,
    ansOfQues: string,
    answer: string,
    quesDetail: string,
    trueAnswer: string
}
const WatchExam = (props: PropsWatchExam): JSX.Element => {
    const [allPickerQuestion, callAllPickerQuestions] = useFetch();
    const [allQuestion, callAllQuestion] = useFetch();
    const listPickerQuestions = allPickerQuestion?.payload?.filter((r: IPickerQuestion) => r.cuid === props.cuid)
    const mergeQuestionsPicker = allQuestion?.payload?.reduce((newList: QuestionsUserPicker[], curr: IQuestions) => {
        const quesId = curr.quesId
        const matching = listPickerQuestions?.find((item: IPickerQuestion) => item.quesId === quesId);
        if (matching) {
            newList.push({ ...curr, ...matching });
        }
        return newList;
    }, [])
    console.log(mergeQuestionsPicker)
    React.useEffect(() => {
        callAllPickerQuestions(getAllPickerQuestion);
    }, [])
    React.useEffect(() => {
        callAllQuestion(getAllQues);
    }, [])
    return (
        <>
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
                    onClick={props.close}
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
                        onClick={props.close}
                    >
                        <CloseIcon sx={{ fontSize: "30px", color: "#ff1a1a" }} />
                    </Box>
                    <h3
                        className='color-primary'
                        style={{
                            textAlign: "center",
                        }}
                    >
                        BÀI THI
                    </h3>
                    <Box
                        sx={{
                            height: "80vh",
                            overflowY: "scroll",
                            '&::-webkit-scrollbar': {
                                display: "none"
                            },

                        }}
                    >
                        {
                            mergeQuestionsPicker?.map((r: QuestionsUserPicker, index: number) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: "100%",
                                        mb: 2,
                                        backgroundColor: "#1565c0   ",
                                        padding: "3px",
                                        borderRadius: "3px",
                                        position:"relative"
                                    }}
                                >
                                    {
                                        r.answer.trim() === r.trueAnswer.trim()?
                                        (
                                            <Box
                                                sx={{
                                                    backgroundColor:"white",
                                                    position:"absolute",
                                                    right:"10px",
                                                    top:"10px",
                                                    height:"17px",
                                                    width:"20px",
                                                    borderRadius:"50%",
                                                    display:"flex",
                                                    alignItems:"center",
                                                    justifyContent:"center"
                                                }}
                                            >
                                                <CheckCircleIcon 
                                                    sx={{
                                                        color:"#00bd00",
                                                        fontSize:"30px"
                                                    }}
                                                />
                                            </Box>
                                        ):
                                        (
                                            <Box
                                                sx={{
                                                    backgroundColor:"white",
                                                    position:"absolute",
                                                    right:"10px",
                                                    top:"10px",
                                                    height:"17px",
                                                    width:"20px",
                                                    borderRadius:"50%",
                                                    display:"flex",
                                                    alignItems:"center",
                                                    justifyContent:"center"
                                                }}
                                            >
                                                <CancelIcon 
                                                    sx={{
                                                        color:"red",
                                                        fontSize:"30px"
                                                    }}
                                                />
                                            </Box>
                                        )
                                    }
                                    <Box
                                        component='span'
                                        sx={{
                                            color: "white",
                                            display: "inline-block",
                                            fontSize: "17px",
                                            padding: "5px",
                                            fontWeight: "500",
                                            maxWidth:{xs:'90%',md:"96%"}
                                        }}
                                    >
                                        Câu {index + 1} :&nbsp;{r.quesDetail}
                                    </Box>
                                    <Box
                                        sx={{
                                            backgroundColor: "white",
                                            borderRadius: "3px",
                                            padding: "10px 4px"
                                        }}
                                    >
                                        {
                                            r.quesTId === 1 ? (
                                                <>
                                                    <Box
                                                        sx={{
                                                            mb: 2,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: "5px"
                                                        }}
                                                    >
                                                        {
                                                            r.ansOfQues.split('<====>').map((item: string, index: number) => (
                                                                r.answer.trim() === item.trim()&& r.trueAnswer.trim() === r.answer.trim() ? (
                                                                    <Box
                                                                        key={index}
                                                                        sx={{
                                                                            display: "flex",
                                                                            gap: "10px",
                                                                            padding: "5px 3px",
                                                                            alignItems: "center",
                                                                            backgroundColor: "#daf1ff",
                                                                            borderRadius: "2px",
                                                                            color: "#0075b9",
                                                                            fontWeight: "500"
                                                                        }}
                                                                    >
                                                                        <RadioButtonCheckedIcon /> <span>{item.trim()}</span>
                                                                    </Box>
                                                                ) : (
                                                                    r.answer.trim() === item.trim() && r.trueAnswer !== r.answer ? (
                                                                        <Box
                                                                            key={index}
                                                                            sx={{
                                                                                display: "flex",
                                                                                gap: "10px",
                                                                                padding: "5px 3px",
                                                                                alignItems: "center",
                                                                                backgroundColor: "#ffe0e0",
                                                                                borderRadius: "2px",
                                                                                color: "#ff2424",
                                                                                fontWeight: "500"
                                                                            }}
                                                                        >
                                                                            <RadioButtonCheckedIcon /> <span>{item.trim()}</span>
                                                                        </Box>
                                                                    ):(
                                                                        <Box
                                                                            key={index}
                                                                            sx={{
                                                                                display: "flex",
                                                                                gap: "10px",
                                                                                padding: "5px 3px",
                                                                                alignItems: "center"
                                                                            }}
                                                                        >
                                                                            <RadioButtonUncheckedIcon /> <span>{item.trim()}</span>
                                                                        </Box>
                                                                    )
                                                                )
                                                            ))
                                                        }
                                                    </Box>
                                                    {
                                                        r.trueAnswer.trim()!== r.answer.trim() &&
                                                        (
                                                            <Box
                                                                sx={{
                                                                    padding: "10px 3px"
                                                                }}
                                                            >
                                                                <span className='color-primary' style={{ fontWeight: "500" }}>Câu trả lời đúng</span>
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        gap: "10px",
                                                                        padding: "5px 3px",
                                                                        alignItems: "center",
                                                                        backgroundColor: "#dbffd7",
                                                                        borderRadius: "2px",
                                                                        color: "#00ae11",
                                                                        fontWeight: "500"
                                                                    }}
                                                                >
                                                                    <RadioButtonCheckedIcon />
                                                                    <span >{r.trueAnswer}</span>
                                                                </Box>
                                                            </Box>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                r.ansOfQues.split('<====>').map((r: string, index: number) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            display: "flex",
                                                            gap: "10px",
                                                            padding: "5px 3px"
                                                        }}
                                                    >
                                                        <RadioButtonCheckedIcon /> &nbsp; {r.trim()}
                                                    </Box>
                                                ))
                                            )
                                        }
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>


            </Box>
        </>
    )
}

export default WatchExam
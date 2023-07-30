import React from 'react'
import {
    Typography,
    Grid,
    Button,
    Stack,
    Tooltip,
    Snackbar,
    Box,
    SxProps
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import { TableWithFixedColumn } from '~/components/TableFixed';
import { getAllResult } from '~/api/resultApi';
import { getAllCompUser } from '~/api/CompetitionUser';
import { getAllUser } from '~/api/userApi';
import useFetch from '~/hook/useFetch';
import { ICompetitionUser, IResult, IUser, IPickerQuestion, IQuestions } from '~/interface/Interface';
import { Loader } from '~/components/loader';
import { getAllPickerQuestion } from '~/api/PickerQuestions';
import { getAllQues } from '~/api/question';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import { formatDay, formatTime, formatTimeHour, getTimeDifference } from '~/utils/dateUtils';
interface PropsResultManage {
    comId: number
    close: () => void;
    type: string
}
interface IUserResult {
    comId: number
    cuid: number
    endTimes: string
    falseAns: number
    resId: number
    startTimes: string
    trueAns: number
    userId: string
}
interface IQuestionsUserPicker {
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
const ModalResultManage = (prop: PropsResultManage): JSX.Element => {
    const [allResults, callAllResults] = useFetch();
    const [allCompUsers, callAllCompUsers] = useFetch();
    const [allUsers, callAllUsers] = useFetch()
    const [allPickerQuestion, callAllPickerQuestions] = useFetch();
    const [allQuestion, callAllQuestion] = useFetch();
    const [userIdChecked, setUserIdChecked] = React.useState<string>('')
    const [userSearch, setUserSearch] = React.useState<string>('')
    const [allPickerQuesForUser, setAllPickerQuesForUser] = React.useState<IQuestionsUserPicker[]>([])
    const [listUserWhenSearch, setListUserWhenSearch] = React.useState<IUserResult[]>([])
    const [whenSearch, setWhenSearch] = React.useState<boolean>(false)

    const getNameUserById = (userId: string): string => {
        const user = allUsers?.payload?.find((r: IUser) => r.userId === userId)
        return user?.userName || ''
    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserSearch(event.target.value)
    };
    const listUserInComp: ICompetitionUser[] = allCompUsers?.payload?.filter((r: ICompetitionUser) => r.comId === prop.comId)
    const listUserHasJoinComp = allResults?.payload?.reduce((newList: IUserResult[], curr: IResult) => {
        const itemCompUser = listUserInComp?.find((r: ICompetitionUser) => r.cuid === curr.cuid)
        if (itemCompUser !== undefined)
            newList.push({
                ...curr,
                ...itemCompUser
            })
        return newList
    }, [])
    const handleSearchUser = (userSearch: string): void => {
        const newList = listUserHasJoinComp?.filter((r: IUserResult) =>
            r.userId.trim().toLowerCase().includes(userSearch.trim().toLowerCase()) ||
            getNameUserById(r.userId).trim().toLowerCase().includes(userSearch.trim().toLowerCase())
        )
        setUserIdChecked('')
        setListUserWhenSearch(newList)
        setUserSearch('')
        setWhenSearch(true)
    }
    const handleKeyPressEnter = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter') {
            handleSearchUser(userSearch);
        }
    };
    console.log(userSearch);

    const handleViewExamUser = (cuid: number, userId: string): void => {
        const listPickerQuestions = allPickerQuestion?.payload?.filter((r: IPickerQuestion) => r.cuid === cuid)
        const mergeQuestionsPicker = allQuestion?.payload?.reduce((newList: IQuestionsUserPicker[], curr: IQuestions) => {
            const quesId = curr.quesId
            const matching = listPickerQuestions?.find((item: IPickerQuestion) => item.quesId === quesId);
            if (matching) {
                newList.push({ ...curr, ...matching });
            }
            return newList;
        }, [])
        setUserIdChecked(userId)
        setAllPickerQuesForUser(mergeQuestionsPicker)

    }



    React.useEffect(() => {
        callAllCompUsers(getAllCompUser)
    }, [])
    React.useEffect(() => {
        callAllResults(getAllResult)
    }, [])
    React.useEffect(() => {
        callAllUsers(getAllUser)
    }, [])
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
                    zIndex: "10"
                }}
            >
                <Box
                    onClick={prop.close}
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
                        width: { xs: '90%', md: "70%" },
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
                            marginBottom: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "5px"
                        }}
                    >
                        {
                            prop.type === 'listUsers' ? (
                                <span>DANH SÁCH DỰ THI</span>
                            ) : (
                                <span>KẾT QUẢ DỰ THI CỦA THÍ SINH</span>
                            )

                        }

                    </h3>
                    <Box
                        sx={{
                            height: "70vh",
                            overflowY: "scroll",
                            padding: "0px 5px",
                            '&::-webkit-scrollbar': {
                                display: "none"
                            }
                        }}
                    >
                        {
                            listUserHasJoinComp?.length === 0 ? (
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "500",
                                        fontSize: "25px",
                                        color: "#969696"
                                    }}
                                >
                                    Chưa có thí sinh nào tham gia cuộc thi này
                                </Box>
                            ) : (
                                allResults?.loading && allCompUsers?.loading && allUsers?.loading ? (
                                    <Loader />
                                ) : (
                                    prop.type === 'listUsers' ? (
                                        <Box
                                            onKeyDown={handleKeyPressEnter}
                                        >
                                            <Box
                                                sx={{
                                                    borderRadius: "4px",
                                                    border: "1px solid #1565c0",
                                                    padding: "5px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    top: "70px",
                                                    position: "absolute",
                                                    left: "8px",
                                                    right: "8px",
                                                    backgroundColor: "white"
                                                }}
                                            >
                                                <Box
                                                    placeholder='Tìm UID hoặc tên thí sinh'
                                                    component='input'
                                                    type="text"
                                                    sx={{
                                                        fontSize: "16px",
                                                        outline: "none",
                                                        width: "100%",
                                                        border: "none"
                                                    }}
                                                    value={userSearch}
                                                    onChange={handleSearchChange}
                                                />
                                                <Box component='span' onClick={(): void => setWhenSearch(false)}><RefreshIcon /></Box>
                                                <Button
                                                    variant='contained'
                                                    onClick={(): void => handleSearchUser(userSearch)}

                                                >
                                                    <SearchIcon />
                                                </Button>
                                            </Box>
                                            <Box
                                                sx={{
                                                    mt: 8
                                                }}
                                            >
                                                {
                                                    whenSearch ? (
                                                        listUserWhenSearch?.map((r: IUserResult, index: number) => (
                                                            <Box key={index} sx={componentUserJoinInfo}>
                                                                <Box>
                                                                    <span>
                                                                        UID:&nbsp;
                                                                    </span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {r.userId}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Tên thí sinh:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {getNameUserById(r.userId)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Thời gian bắt đầu:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {formatDay(r.startTimes)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Thời gian kết thúc:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {formatDay(r.endTimes)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Giờ bắt đầu:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {formatTimeHour(r.startTimes)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Giờ kết thúc:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {formatTimeHour(r.endTimes)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Thời gian hoàn thành:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {`${getTimeDifference(r.startTimes, r.endTimes).hours.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes, r.endTimes).minutes.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes, r.endTimes).seconds.toString().padStart(2, '0')}s`}
                                                                    </span>
                                                                </Box>
                                                            </Box>
                                                        ))

                                                    ) : (
                                                        listUserHasJoinComp?.map((r: IUserResult, index: number) => (
                                                            <Box key={index} sx={componentUserJoinInfo}>
                                                                <Box>
                                                                    <span>
                                                                        UID:&nbsp;
                                                                    </span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {r.userId}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Tên thí sinh:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {getNameUserById(r.userId)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Thời gian bắt đầu:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {formatDay(r.startTimes)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Thời gian kết thúc:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {formatDay(r.endTimes)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Giờ bắt đầu:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {formatTimeHour(r.startTimes)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Giờ kết thúc:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {formatTimeHour(r.endTimes)}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Thời gian hoàn thành:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {`${getTimeDifference(r.startTimes, r.endTimes).hours.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes, r.endTimes).minutes.toString().padStart(2, '0')}:${getTimeDifference(r.startTimes, r.endTimes).seconds.toString().padStart(2, '0')}s`}
                                                                    </span>
                                                                </Box>
                                                            </Box>
                                                        ))
                                                    )
                                                }

                                            </Box>
                                        </Box>
                                    ) : (
                                        <Grid container spacing={1} sx={{ height: "100%" }}>
                                            <Grid item md={4} >
                                                <Box
                                                    onKeyDown={handleKeyPressEnter}
                                                    sx={{
                                                        height: "100%",
                                                        width: "100%",
                                                        overflowY: "scroll",
                                                        '&::-webkit-scrollbar': {
                                                            display: "none"
                                                        },
                                                        position: "relative"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            borderRadius: "4px",
                                                            border: "1px solid #1565c0",
                                                            padding: "5px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "10px",
                                                            mb: 2,
                                                            position: "absolute",
                                                            left: 0,
                                                            right: 0
                                                        }}
                                                    >
                                                        <Box
                                                            placeholder='Tìm UID hoặc tên thí sinh'
                                                            component='input'
                                                            type="text"
                                                            sx={{
                                                                fontSize: "16px",
                                                                outline: "none",
                                                                width: "100%",
                                                                border: "none"
                                                            }}
                                                            value={userSearch}
                                                            onChange={handleSearchChange}
                                                        />
                                                        <Box component='span' onClick={(): void => setWhenSearch(false)}><RefreshIcon /></Box>
                                                        <Button variant='contained' onClick={(): void => handleSearchUser(userSearch)}><SearchIcon /></Button>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            mt: 8,
                                                            width: "100%"
                                                        }}
                                                    >
                                                        {
                                                            whenSearch ? (
                                                                listUserWhenSearch?.map((r: IUserResult, index: number) => (
                                                                    <Box
                                                                        key={index}
                                                                        sx={componentUserJoinInfo}
                                                                        onClick={(): void => handleViewExamUser(r.cuid, r.userId)}
                                                                    >
                                                                        <Box>
                                                                            <span>
                                                                                UID:&nbsp;
                                                                            </span>
                                                                            <span
                                                                                className='color-primary'
                                                                                style={{ fontWeight: "500", fontSize: "18px" }}
                                                                            >
                                                                                {r.userId}
                                                                            </span>
                                                                        </Box>
                                                                        <Box>
                                                                            <span>Tên thí sinh:&nbsp;</span>
                                                                            <span
                                                                                className='color-primary'
                                                                                style={{ fontWeight: "500", fontSize: "18px" }}
                                                                            >
                                                                                {getNameUserById(r.userId)}
                                                                            </span>
                                                                        </Box>
                                                                        <Box>
                                                                            <span>Số câu đúng:&nbsp;</span>
                                                                            <span
                                                                                style={{ fontWeight: "500", fontSize: "18px", color: "#119300" }}
                                                                            >
                                                                                {r.trueAns}
                                                                            </span>
                                                                        </Box>
                                                                        <Box>
                                                                            <span>Số câu sai:&nbsp;</span>
                                                                            <span
                                                                                style={{ fontWeight: "500", fontSize: "18px", color: "#ed0000" }}
                                                                            >
                                                                                {r.falseAns}
                                                                            </span>
                                                                        </Box>
                                                                    </Box>
                                                                ))
                                                            ) : (
                                                                listUserHasJoinComp?.map((r: IUserResult, index: number) => (
                                                                    <Box
                                                                        key={index}
                                                                        sx={componentUserJoinInfo}
                                                                        onClick={(): void => handleViewExamUser(r.cuid, r.userId)}
                                                                    >
                                                                        <Box>
                                                                            <span>
                                                                                UID:&nbsp;
                                                                            </span>
                                                                            <span
                                                                                className='color-primary'
                                                                                style={{ fontWeight: "500", fontSize: "18px" }}
                                                                            >
                                                                                {r.userId}
                                                                            </span>
                                                                        </Box>
                                                                        <Box>
                                                                            <span>Tên thí sinh:&nbsp;</span>
                                                                            <span
                                                                                className='color-primary'
                                                                                style={{ fontWeight: "500", fontSize: "18px" }}
                                                                            >
                                                                                {getNameUserById(r.userId)}
                                                                            </span>
                                                                        </Box>
                                                                        <Box>
                                                                            <span>Số câu đúng:&nbsp;</span>
                                                                            <span
                                                                                style={{ fontWeight: "500", fontSize: "18px", color: "#119300" }}
                                                                            >
                                                                                {r.trueAns}
                                                                            </span>
                                                                        </Box>
                                                                        <Box>
                                                                            <span>Số câu sai:&nbsp;</span>
                                                                            <span
                                                                                style={{ fontWeight: "500", fontSize: "18px", color: "#ed0000" }}
                                                                            >
                                                                                {r.falseAns}
                                                                            </span>
                                                                        </Box>
                                                                    </Box>
                                                                ))
                                                            )
                                                        }

                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item md={8}>
                                                {
                                                    userIdChecked === '' ? (
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                height: "100%",
                                                                width: "100%"
                                                            }}
                                                        >
                                                            <span
                                                                className='color-primary'
                                                                style={{
                                                                    fontWeight: "500",
                                                                    fontSize: "18px"
                                                                }}
                                                            >
                                                                Vui lòng chọn thí sinh để xem kết quả
                                                            </span>
                                                        </Box>
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "30px",
                                                                flexDirection: "column",
                                                                position: "relative",
                                                                height: "100%"
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: "30px",
                                                                    position: "absolute",
                                                                    left: 0,
                                                                    right: 0,
                                                                    top: 0
                                                                }}
                                                            >
                                                                <Box>
                                                                    <span>
                                                                        UID:&nbsp;
                                                                    </span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {userIdChecked}
                                                                    </span>
                                                                </Box>
                                                                <Box>
                                                                    <span>Tên thí sinh:&nbsp;</span>
                                                                    <span
                                                                        className='color-primary'
                                                                        style={{ fontWeight: "500", fontSize: "18px" }}
                                                                    >
                                                                        {getNameUserById(userIdChecked)}
                                                                    </span>
                                                                </Box>
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    display: "block",
                                                                    flexDirection: "column",
                                                                    gap: "10px",
                                                                    width: "100%",
                                                                    overflowY: "scroll",
                                                                    height: "450px",
                                                                    '&::-webkit-scrollbar': {
                                                                        display: "none"
                                                                    },
                                                                    mt: 5
                                                                }}
                                                            >
                                                                {
                                                                    allPickerQuesForUser?.map((r: IQuestionsUserPicker, index: number) => (
                                                                        <Box
                                                                            key={index}
                                                                            sx={{
                                                                                width: "100%",
                                                                                mb: 2,
                                                                                backgroundColor: "#1565c0   ",
                                                                                padding: "3px",
                                                                                borderRadius: "3px",
                                                                                position: "relative"
                                                                            }}
                                                                        >
                                                                            {
                                                                                r.answer.trim() === r.trueAnswer.trim() ?
                                                                                    (
                                                                                        <Box
                                                                                            sx={{
                                                                                                backgroundColor: "white",
                                                                                                position: "absolute",
                                                                                                right: "10px",
                                                                                                top: "10px",
                                                                                                height: "17px",
                                                                                                width: "20px",
                                                                                                borderRadius: "50%",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center"
                                                                                            }}
                                                                                        >
                                                                                            <CheckCircleIcon
                                                                                                sx={{
                                                                                                    color: "#00bd00",
                                                                                                    fontSize: "30px"
                                                                                                }}
                                                                                            />
                                                                                        </Box>
                                                                                    ) :
                                                                                    (
                                                                                        <Box
                                                                                            sx={{
                                                                                                backgroundColor: "white",
                                                                                                position: "absolute",
                                                                                                right: "10px",
                                                                                                top: "10px",
                                                                                                height: "17px",
                                                                                                width: "20px",
                                                                                                borderRadius: "50%",
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center"
                                                                                            }}
                                                                                        >
                                                                                            <CancelIcon
                                                                                                sx={{
                                                                                                    color: "red",
                                                                                                    fontSize: "30px"
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
                                                                                    maxWidth: { xs: '90%', md: "96%" }
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
                                                                                                        r.answer.trim() === item.trim() && r.trueAnswer.trim() === r.answer.trim() ? (
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
                                                                                                            ) : (
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
                                                                                                r.trueAnswer.trim() !== r.answer.trim() &&
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
                                                    )
                                                }
                                            </Grid>
                                        </Grid>
                                    )
                                )
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ModalResultManage

const componentUserJoinInfo: SxProps = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#e0efff",
    borderRadius: "3px",
    padding: "10px",
    mb: 3,
    cursor: "pointer"
}
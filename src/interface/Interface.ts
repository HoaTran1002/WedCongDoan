export interface ICompetition {
    comId: number,
    comName: string,
    examTimes: number,
    startDate: string,
    endDate: string,
    userQuan: string,
    depId: number
}
export interface IResult {
    resId: number
    cuid: number
    trueAns: number
    falseAns: number
    startTimes: string
    endTimes: string
}


export interface ICompetitionUser {
    cuid: number,
    comId: number,
    userId: string
}

export interface ICompetitionExam {
    ceid: number,
    examId: number,
    comId: number
}

export interface IDepartment {
    depId: number,
    depName: string
}


export interface IUser {
    cuid: number
    comId: number
    userId: string
}

export interface IPickerQuestion {
    pqid: number,
    quesId: number,
    cuid: number,
    answer: string
}

export interface IQuestions {
    quesId: number,
    quesDetail: string,
    ansOfQues: string,
    trueAnswer: string,
    examId: number,
    quesTId: number
}
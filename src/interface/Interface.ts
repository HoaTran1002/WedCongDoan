
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

export interface IDate {
    date: number,
    month: number,
    year: number
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

export interface IBlog {
    blogId: number,
    blogName: string,
    BlogDetail:string,
    imgSrc: string,
    imgName: string
}


export interface ICompetitionBlogsUser{
    id?: number,
    comId: number,
    blogId: number,
    userId?: string,
    postDate:string
}
  
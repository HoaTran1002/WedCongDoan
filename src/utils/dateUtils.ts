import { IDate } from "~/interface/Interface"

export const formatDay = (dayOrigin: string): string => {
    const dateObj = new Date(dayOrigin)
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${day
        .toString()
        .padStart(2, '0')} /${month.toString().padStart(2, '0')} / ${year}`
}
export const compareDateWithTimeString = (dateObj: IDate, timeString: string): boolean => {
    const date = new Date(timeString);
    const yearMatch = dateObj.year === date.getFullYear();
    const monthMatch = dateObj.month === date.getMonth() + 1;
    const dateMatch = dateObj.date === date.getDate();
    return yearMatch && monthMatch && dateMatch;
};
export const isBeforeDate = (dateInput: string): boolean => {
    const currentTime = new Date();
    const dateObject = new Date(dateInput);
    if (dateObject.getTime() < currentTime.getTime()) {
        return true;
    }
    return false;
};

export const getTimeDifference=(startTimes:string,endTimes:string): number | null=> {
    const startTime = new Date(startTimes);
    const endTime = new Date(endTimes);
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return null;
    }
    const timeDifference = endTime.getTime() - startTime.getTime();
    return timeDifference / 1000;
}

export const formatTime = (time:number):string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
};

export function formatTimeHour(dayOrigin: string): string {
    const date = new Date(dayOrigin);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
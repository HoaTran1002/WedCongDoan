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
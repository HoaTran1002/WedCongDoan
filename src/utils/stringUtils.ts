export const getOneCharacter= (userName?:string):string | undefined=>{
    const lastPartOfName = userName?.split(" ").slice(-1)[0];
    return lastPartOfName?.charAt(0);
}

export const isEmailValid = (email: string | undefined): boolean => {
    if (email === undefined) {
        return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)  ;
};

export const validatePassword = (password: string): boolean =>{
    if(password.length >= 5 && password.length <= 9  &&
        /[A-Z]/.test(password) &&
        /[\W_]/.test(password) &&
        /\d/.test(password)) return true;
    return false;
}

function removeAccents(input: string): string {
    return input
        ?.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, " ");
}

export const listWhenSearchDeepCheck = (keySearch: string,listCheck:any[],equalsToCheck:string): any[] => {
    const normalizedFullName = removeAccents(keySearch);
    const nameParts = normalizedFullName.split(" ").filter(part => part !== "");
    const listAfterSearch:any[] = listCheck.reduce((result:any[],curr:any)=>{
        const normalizedInput = removeAccents(curr[equalsToCheck]);
        if(nameParts.every(part => normalizedInput?.includes(part)))
        result.push(curr)
        return result
    },[])

    return listAfterSearch;
}
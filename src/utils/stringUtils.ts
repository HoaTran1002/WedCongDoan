export const getOneCharacter= (userName?:string):string | undefined=>{
    const lastPartOfName = userName?.split(" ").slice(-1)[0];
    return lastPartOfName?.charAt(0);
}

export const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
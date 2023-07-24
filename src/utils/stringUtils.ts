export const getOneCharacter= (userName?:string):string | undefined=>{
    const lastPartOfName = userName?.split(" ").slice(-1)[0];
    return lastPartOfName?.charAt(0);
}
export const separateArrayBySemicolon = (OArray) => {
    const stringArray = OArray.map((item) => {
        return `${item.codigo ?? item}`
    })

    return stringArray.join(";");
}
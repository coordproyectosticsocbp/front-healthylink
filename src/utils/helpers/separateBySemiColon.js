export const separateArrayBySemicolon = (OArray) => {

    if (!OArray.length) {
        return null;
    }

    const stringArray = OArray.map((item) => {
        return `${item.codigo ?? item}`
    })

    return stringArray.join(";");
}
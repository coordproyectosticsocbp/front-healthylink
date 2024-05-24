export const separateArrayBySemicolon = (OArray, key) => {
    //console.log(OArray)
    try {
        if (OArray.length > 0) {
            let resultado = OArray.join(";")
            return resultado
        } else {
            console.log(`El array ${key} Esta vacio`)
            return null;
        }
    } catch (e) {
        console.error(e)
    }

    /*
        const stringArray = OArray.map((item) => {
            return `${item.codigo ?? item}`
        })

        return stringArray.join(";");*/
}
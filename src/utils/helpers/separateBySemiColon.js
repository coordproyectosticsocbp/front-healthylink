export const separateArrayBySemicolon = (OArray, key) => {
    try {
        if (OArray.length > 0) {

            const arrayOptions = ['madre', 'padre', 'hermanos']
            const parentDiseases = []
            if (arrayOptions.includes(key)) {

                OArray.forEach(item => parentDiseases.push(item.ci10))
                return parentDiseases.join(";")
            }

            return OArray.join(";")
        } else {
            console.log(`El array ${key} Esta vacio`)
            return null;
        }
    } catch (e) {
        console.error(e)
    }
}
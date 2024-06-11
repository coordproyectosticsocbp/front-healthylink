export const separateArrayBySemicolon = (OArray, key) => {
    try {
        if (OArray.length > 0) {

            const arrayOptions = ['madre', 'padre', 'hermanos']
            const arrayOptionsArterial = ['DescripcionComercial']
            const parentDiseases = []
            const arterialDrugs = []
            if (arrayOptions.includes(key)) {

                OArray.forEach(item => parentDiseases.push(item.ci10))
                return parentDiseases.join(";")

            } else if (arrayOptionsArterial.includes(key)) {

                OArray.forEach(item => arterialDrugs.push(item.DescripcionComercial))
                return arterialDrugs.join(";")

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
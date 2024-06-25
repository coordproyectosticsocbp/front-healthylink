import dayjs from "dayjs";

export default function structurePayloadForComplementaryInfo(surveyID, userID) {

    const evolutionInfo = window.localStorage.getItem(`evolutionInfo`)
    const findingsInfo = window.localStorage.getItem(`findingsInfo`)
    const pathologicalInfo = window.localStorage.getItem(`pathologicalInfo`)
    const othersInfo = window.localStorage.getItem(`othersInfo`)
    const pharmacologicalHistory = window.localStorage.getItem(`pharmacologicalHistory`)
    const othersLaboratoriesInfo = window.localStorage.getItem(`othersLaboratoriesInfo`)
    const laboratoryHistory = window.localStorage.getItem(`laboratoryHistory`)
    const biochemicalHistory = window.localStorage.getItem(`biochemicalHistory`)
    const hormonalHistory = window.localStorage.getItem(`hormonalHistory`)
    const imagesHistory = window.localStorage.getItem(`imagesHistory`)

    let payload = {
        encuesta_id: surveyID,
        user_id: userID,
        datos: []
    }
    let data = []


    if (findingsInfo) {
        data.push(
            structurePayloadSingle(JSON.parse(findingsInfo).patientFindingsHistory, 1)
        )
    }
    if (pharmacologicalHistory) {
        JSON.parse(pharmacologicalHistory).map((item) => {
            data.push(
                structurePayloadMultiple(item, 2)
            )
        })
    }
    if (laboratoryHistory) {
        JSON.parse(laboratoryHistory).map((item) => {
            data.push(
                structurePayloadMultiple(item, 3)
            )
        })
    }
    if (biochemicalHistory) {
        JSON.parse(biochemicalHistory).map((item) => {
            data.push(
                structurePayloadMultiple(item, 4)
            )
        })
    }
    if (hormonalHistory) {
        JSON.parse(hormonalHistory).map((item) => {
            data.push(
                structurePayloadMultiple(item, 5)
            )
        })
    }
    if (imagesHistory) {
        JSON.parse(imagesHistory).map((item) => {
            data.push(
                structurePayloadMultiple(item, 6)
            )
        })
    }
    if (evolutionInfo) {
        data.push(
            structurePayloadSingle(JSON.parse(evolutionInfo).patientEvolution, 7)
        )
    }
    if (othersInfo) {
        data.push(
            structurePayloadSingle(JSON.parse(othersInfo).patientOtherInfo, 8)
        )
    }
    if (pathologicalInfo) {
        JSON.parse(pathologicalInfo).map(item => {
            data.push(
                structurePayloadMultiple(item, 9)
            )
        })
    }
    if (othersLaboratoriesInfo) {
        JSON.parse(othersLaboratoriesInfo).map((item) => {
            data.push(
                structurePayloadMultiple(item, 10)
            )
        })
    }

    payload.datos = flattenArray(data)
    return payload

}

function structurePayloadSingle(data, questionNumber) {
    const today = dayjs()
    return {
        fecha: today.format('YYYY-MM-DD'),
        respuesta: data.toUpperCase(),
        pregunta_id: questionNumber
    }
}

function structurePayloadMultiple(data, questionNumber) {
    const today = dayjs()

    if (questionNumber === 2) {
        return {
            fecha: today.format('YYYY-MM-DD'),
            //respuesta: data.drugName.toUpperCase() + ';' + data.drugConcentration + ';' + data.drugPresentation + ';' + data.drugDosage,
            respuesta: data.drugName.toUpperCase() + ';' + data.drugDosage + ';' + data.everyHowOften,
            pregunta_id: questionNumber,
        }
    } else if (questionNumber === 3) {

        const {labDate, values} = data

        return values.map(item => ({
            fecha: labDate,
            respuesta: item.labType.toUpperCase(),
            pregunta_id: questionNumber,
            valor: item.valueLab
        }))
    } else if (questionNumber === 4) {

        const {labDate, values} = data

        return values.map(item => ({
            fecha: labDate,
            respuesta: item.labType.toUpperCase(),
            pregunta_id: questionNumber,
            unidad: 'MG',
            valor: item.valueLab
        }))
    } else if (questionNumber === 5) {
        const {labDate, values} = data

        return values.map(item => ({
            fecha: labDate,
            respuesta: item.labType.toUpperCase(),
            pregunta_id: questionNumber,
            valor: item.valueLab
        }))
    } else if (questionNumber === 6) {

        return {
            fecha: data.imageDate,
            respuesta: data.imageResult.toUpperCase(),
            pregunta_id: questionNumber,
            tipo_imagen: data.imageType.toUpperCase()
        }
    } else if (questionNumber === 9) {
        return {
            fecha: null,
            respuesta: data.ci10.toUpperCase(),
            pregunta_id: questionNumber,
            valor: null
        }

    } else if (questionNumber === 10) {
        return {
            fecha: data.laboratoryDate,
            respuesta: data.laboratoryName,
            pregunta_id: questionNumber,
            valor: data.laboratoryValue
        }

    }
}

//Funcion que recorre el array y deja al mismo nivel
function flattenArray(arr) {
    const result = [];

    function flatten(item) {
        if (Array.isArray(item)) {
            item.forEach(flatten);
        } else if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                flatten(item);
            } else {
                result.push(item);
            }
        }
    }

    arr.forEach(flatten);
    return result;
}
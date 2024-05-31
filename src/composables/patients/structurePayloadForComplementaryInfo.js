import dayjs from "dayjs";

export default function structurePayloadForComplementaryInfo(surveyID, userID) {

    const evolutionInfo = window.localStorage.getItem(`evolutionInfo-${surveyID}`)
    const pathologicalInfo = window.localStorage.getItem(`pathologicalInfo-${surveyID}`)
    const othersInfo = window.localStorage.getItem(`othersInfo-${surveyID}`)
    const pharmacologicalHistory = window.localStorage.getItem(`pharmacologicalHistory-${surveyID}`)
    const laboratoryHistory = window.localStorage.getItem(`laboratoryHistory-${surveyID}`)
    const biochemicalHistory = window.localStorage.getItem(`biochemicalHistory-${surveyID}`)
    const hormonalHistory = window.localStorage.getItem(`hormonalHistory-${surveyID}`)
    const imagesHistory = window.localStorage.getItem(`imagesHistory-${surveyID}`)

    let payload = {
        encuesta_id: surveyID,
        user_id: userID,
        datos: []
    }

    if (evolutionInfo) {
        payload.datos.push(
            structurePayloadSingle(JSON.parse(evolutionInfo).patientEvolution, 7)
        )
    }
    if (pathologicalInfo) {
        payload.datos.push(
            structurePayloadSingle(JSON.parse(pathologicalInfo).patientPathologicalHistory, 1)
        )
    }
    if (othersInfo) {
        payload.datos.push(
            structurePayloadSingle(JSON.parse(othersInfo).patientOtherInfo, 8)
        )
    }
    if (pharmacologicalHistory) {
        JSON.parse(pharmacologicalHistory).map((item) => {
            payload.datos.push(
                structurePayloadMultiple(item, 2)
            )
        })
    }
    if (laboratoryHistory) {
        JSON.parse(laboratoryHistory).map((item) => {
            payload.datos.push(
                structurePayloadMultiple(item, 3)
            )
        })
    }
    if (biochemicalHistory) {
        JSON.parse(biochemicalHistory).map((item) => {
            payload.datos.push(
                structurePayloadMultiple(item, 4)
            )
        })
    }
    if (hormonalHistory) {
        JSON.parse(hormonalHistory).map((item) => {
            payload.datos.push(
                structurePayloadMultiple(item, 5)
            )
        })
    }
    if (imagesHistory) {
        JSON.parse(imagesHistory).map((item) => {
            payload.datos.push(
                structurePayloadMultiple(item, 6)
            )
        })
    }
    console.log(payload)

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
        return {
            fecha: data.labDate,
            respuesta: data.labType.toUpperCase(),
            pregunta_id: questionNumber,
            valor: data.valueLab
        }
    } else if (questionNumber === 4) {
        return {
            fecha: data.labDate,
            respuesta: data.labType.toUpperCase(),
            pregunta_id: questionNumber,
            unidad: 'MG',
            valor: data.valueLab
        }
    } else if (questionNumber === 5) {
        return {
            fecha: data.labDate,
            respuesta: data.labType.toUpperCase(),
            pregunta_id: questionNumber,
            valor: data.valueLab
        }
    } else if (questionNumber === 6) {
        return {
            fecha: data.imageDate,
            respuesta: data.imageResult.toUpperCase(),
            pregunta_id: questionNumber,
            tipo_imagen: data.imageType.toUpperCase()
        }
    }
}
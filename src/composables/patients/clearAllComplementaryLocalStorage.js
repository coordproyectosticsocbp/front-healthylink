export default function clearAllLocalStorage() {
    window.localStorage.removeItem(`evolutionInfo`)
    window.localStorage.removeItem(`findingsInfo`)
    window.localStorage.removeItem(`pathologicalInfo`)
    window.localStorage.removeItem(`othersInfo`)
    window.localStorage.removeItem(`pharmacologicalHistory`)
    window.localStorage.removeItem(`othersLaboratoriesInfo`)
    window.localStorage.removeItem(`laboratoryHistory`)
    window.localStorage.removeItem(`biochemicalHistory`)
    window.localStorage.removeItem(`hormonalHistory`)
    window.localStorage.removeItem(`imagesHistory`)
}
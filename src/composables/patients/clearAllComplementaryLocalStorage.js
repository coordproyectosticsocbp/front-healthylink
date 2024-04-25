export default function clearAllLocalStorage(itemId) {
    window.localStorage.removeItem(`evolutionInfo-${itemId}`)
    window.localStorage.removeItem(`pathologicalInfo-${itemId}`)
    window.localStorage.removeItem(`othersInfo-${itemId}`)
    window.localStorage.removeItem(`pharmacologicalHistory-${itemId}`)
    window.localStorage.removeItem(`laboratoryHistory-${itemId}`)
    window.localStorage.removeItem(`biochemicalHistory-${itemId}`)
    window.localStorage.removeItem(`hormonalHistory-${itemId}`)
    window.localStorage.removeItem(`imagesHistory-${itemId}`)
}
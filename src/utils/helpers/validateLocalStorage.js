export const validateLocalStorage = (key) => {
    // Obtener el valor del localStorage
    const value = window.localStorage.getItem(`${key}`)
    // Verificar si el valor existe y no está vacío
    if (value === null) {
        console.log(`La clave "${key}" no existe en localStorage.`);
        return false;
    } else if (value === '') {
        console.log(`La clave "${key}" existe, pero está vacía.`);
        return false;
    } else {
        //console.log(`La clave "${key}" existe y tiene un valor.`);
        return true;
    }
}
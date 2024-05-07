export const calculateAgeTwo = (birthDate) => {
    const currentDate = new Date()
    //console.log(new Date(birthDate))
    // Convertir las fechas a milisegundos
    const birthMiliSeconds = birthDate.getTime();
    const currentMiliSeconds = currentDate.getTime();

    // Calcular la diferencia en milisegundos
    const diffMiliSeconds = currentMiliSeconds - birthMiliSeconds;

    // Convertir la diferencia a segundos
    const diffSeconds = diffMiliSeconds / 1000;

    // Convertir la diferencia a días
    const diffDays = diffSeconds / 86400;

    // Calcular la edad en años
    const age = Math.floor(diffDays / 365);

    // Devolver la edad en años
    return age;
}
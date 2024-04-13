export const ageCalculate = (dia, mes, anio) => {
    const today = new Date();
    //Restamos los años
    let anios = today.getFullYear() - anio;
    // Si no ha llegado su cumpleaños le restamos el año por cumplir (Los meses en Date empiezan en 0, por eso tenemos que sumar 1)
    if (mes > (today.getMonth() + 1) || dia > today.getDay())
        anios--;
    return anios;
}

//* Función para dar formato a los precios

export function insertDecimal(number = 0) {
    const numberString = number.toString();
    const decimalIndex = numberString.slice(0, 1) + '.' + numberString.slice(1);

    return decimalIndex;
};

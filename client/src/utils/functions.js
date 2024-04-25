
//* Función para dar formato a los precios

export function insertDecimal(number = 0) {
    const numberString = number.toString();
    const decimalIndex = numberString.slice(0, 1) + '.' + numberString.slice(1);

    return decimalIndex;
};

//* Función para obtener los decimales de un número según la configuración

export function getDecimals(amount, decimals) {
    return (amount % 1).toFixed(decimals).split('.')[1];
};

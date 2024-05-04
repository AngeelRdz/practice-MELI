//* El servicio de búsqueda de resultados se encarga de realizar la petición al servidor para obtener los resultados de la búsqueda.

export async function fetchItems(query) {
    try {
        const response = await fetch(`/api/items?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.items && Array.isArray(data.items)) {
            return {
                items: data.items,
                categories: data.categories || [],
            };
        } else {
            throw new Error("Received data is not in the expected format");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

//* El servicio de detalle de producto se encarga de realizar la petición al servidor para obtener los detalles de un producto.

export async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`/api/items/${productId}`);
        const data = await response.json();

        if (data.item) {
            return data.item;
        } else {
            throw new Error("Product not found in the response");
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
}

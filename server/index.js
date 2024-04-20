const express = require('express');
const axios = require('axios');

const app = express();
//* API: https://api.mercadolibre.com/sites/MLA/search?q=:query

//* Settings
app.set('Appname', 'Angeel Rdz');

//* Middleware
app.use(express.json());

app.use((req, res, next) => {
	console.log(`Route: ${req.url} Method: ${req.method}`);
	next();
});

//* Función auxiliar para obtener el símbolo de la moneda
async function getCurrencySymbol(currencyId) {
    try {
        const response = await axios.get(`https://api.mercadolibre.com/currencies/${currencyId}`);
        return response.data.symbol;
    } catch (error) {
        console.error('Error al obtener el símbolo de la moneda:', error);
        return currencyId;  // Retorna el ID de la moneda como símbolo por defecto si falla la API
    }
}

//* Endpoint para buscar productos
app.get('/api/items', async (req, res) => {
    const query = req.query.q;
	console.log('Query:', query);

    try {
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
		const filterResult = response.data.results;
		//* Toma solo los primeros 4 elementos
		const results = filterResult.slice(0, 4);
		console.log('results:', results);

		//* Determinar la categoría con más resultados (para simplificar, usamos la primera categoría)
		// Supongamos que utilizamos 'filters' para determinar la categoría porque siempre viene con el producto
        const categoryFilter = response.data.filters.find(f => f.id === 'category');
        const pathFromRoot = categoryFilter ? categoryFilter.values[0].path_from_root : [];

		//* Obtener símbolos de moneda para cada producto
        const itemsWithCurrency = await Promise.all(results.map(async item => {
            const symbol = await getCurrencySymbol(item.currency_id);
            return {
                id: item.id,
                title: item.title,
                price: {
                    currency: symbol,
                    amount: Math.floor(item.price),
                    decimals: +((item.price % 1).toFixed(2).substring(2)) // Extraer solo la parte decimal como entero
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping
            };
        }));

        const formattedResults = {
            author: {
                name: "Angeel",
                lastname: "Rdz"
            },
            categories: pathFromRoot,
            items: itemsWithCurrency
        };

        res.json(formattedResults);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

//*  Endpoint para obtener detalles del producto
app.get('/api/items/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
        const productResponse = await axios.get(`https://api.mercadolibre.com/items/${itemId}`);
        const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${itemId}/description`);
        const currencySymbol = await getCurrencySymbol(productResponse.data.currency_id);
		const categoryResponse = await axios.get(`https://api.mercadolibre.com/categories/${productResponse.data.category_id}`);

        const item = {
            id: productResponse.data.id,
            title: productResponse.data.title,
            price: {
                currency: currencySymbol,
                amount: Math.floor(productResponse.data.price),
                decimals: +((productResponse.data.price % 1).toFixed(2).substring(2))
            },
            picture: productResponse.data.thumbnail,
            condition: productResponse.data.condition,
            free_shipping: productResponse.data.shipping.free_shipping,
			//* Pendiente de agregar
            sold_quantity: productResponse.data.sold_quantity,
            description: descriptionResponse.data.plain_text,
			category_path: categoryResponse.data.path_from_root
        };

        const responseJson = {
            author: {
                name: "Angeel",
                lastname: "Rdz"
            },
            item: item
        };
		
		console.log('responseJson:', responseJson);
		res.json(responseJson);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

//* Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);

console.log(`Server ${app.get('Appname')} is running on ${3000}`);

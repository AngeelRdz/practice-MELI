import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search');  // Obtiene la consulta de la URL
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/items?q=${encodeURIComponent(query)}`);
                const data = await response.json();  // Directamente obtenemos el JSON

                if (data.items && Array.isArray(data.items)) {  // Aseguramos que data.items existe y es un arreglo
                    setItems(data.items);
                    if (data.categories && Array.isArray(data.categories)) {
                        setCategories(data.categories);
                    }
                } else {
                    throw new Error("Received data is not an array");  // Manejo del caso donde items no es un arreglo
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setItems([]);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };
    
        if (query) {
            fetchItems();
        }
    }, [query]);

    const handleItemClick = (id) => {
        navigate(`/items/${id}`);
    };
    
    return (
        <div>
            {loading ? <p>Loading...</p> : (
                <div>
                    <div>
                        <BreadCrumbs categories={categories} />
                    </div>
                    <ul>
                        {items.map(item => (
                            <li key={item.id} onClick={() => handleItemClick(item.id)}>
                                <h3>{item.title}</h3>
                                <p>{item.price.currency} {item.price.amount.toFixed(2)}</p>
                                <img src={item.picture} alt={item.title} />
                                <p>Condition: {item.condition}</p>
                                {item.free_shipping && <p>Free Shipping Available</p>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchResults;

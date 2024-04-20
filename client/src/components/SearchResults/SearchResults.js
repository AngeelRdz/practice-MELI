import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import logoShipping from '../../assets/ic_shipping@2x.png';

import './SearchResults.scss';
import '../../styles/commonStyles.scss';

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
        <div className='container-meli-content'>
            {loading ? <p>Loading...</p> : (
                <div className='container-meli-content-section'>
                    <BreadCrumbs categories={categories} />
                    <div className='container-meli-content-section-background'>
                        <ul className='container-meli-content-section-items'>
                            {items.map(item => (
                                <li
                                    key={item.id}
                                    onClick={() => handleItemClick(item.id)}
                                    className='container-product-list-li'
                                >
                                    <div className='content-image-product'>
                                        <img src={item.picture} alt={item.title} />
                                    </div>
                                    <div className='content-first-product-info'>
                                        <div className='content-join-texts'>
                                            <div className='content-price'>
                                                <h3 className='text-price'>
                                                    {item.price.currency} {item.price.amount.toFixed(2)}
                                                </h3>
                                            </div>
                                            <div className='content-shipping'>
                                                {
                                                    item.free_shipping &&
                                                        <img src={logoShipping} alt={item.free_shipping} />
                                                }
                                            </div>
                                        </div>
                                        <p className='title-product'>
                                            {item.title}
                                        </p>
                                        <p className='text-condition'>
                                            {item.condition}
                                        </p>
                                    </div>
                                    <div className='content-second-product-info'>
                                        <p className='text-location'>
                                            Ciudad de México
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchResults;

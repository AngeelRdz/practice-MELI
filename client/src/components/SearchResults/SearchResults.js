import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import logoShipping from '../../assets/ic_shipping@2x.png';

import { insertDecimal } from '../../utils/functions';
import { fetchItems } from '../../services/apis';

import './SearchResults.scss';
import '../../styles/commonStyles.scss';
import '../../styles/loaders.scss';

function SearchResults() {
    const [searchParams] = useSearchParams();
    //* Obtiene la consulta de la URL
    const query = searchParams.get('search');
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const { items, categories } = await fetchItems(query);
                setItems(items);
                setCategories(categories);
            } catch (error) {
                setItems([]);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    const handleItemClick = (id) => {
        navigate(`/items/${id}`);
    };
    
    return (
        <div className='container-meli-content'>
            {
                loading ? (
                    <div className='loader-container'>
                        <div className="loader"></div>
                    </div> 
                ) : (
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
                                                        {item.price.currency} {insertDecimal(item.price.amount)}
                                                    </h3>
                                                </div>
                                                <div className='content-shipping'>
                                                    {
                                                        item.free_shipping &&
                                                            <img src={logoShipping} alt={"logo_shopping"} />
                                                    }
                                                </div>
                                            </div>
                                            <p className='title-product'>
                                                {item.title}
                                            </p>
                                            <p className='text-condition'>
                                                {item.condition === 'new' ? 'Completo Único!' : 'Usado'}
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
                )
            }
        </div>
    );
}

export default SearchResults;

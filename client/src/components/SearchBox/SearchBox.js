import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logoML from '../../assets/Logo_ML@2x.png';
import lupaIcon from '../../assets/ic_Search@2x.png';

import './SearchBox.scss';

function SearchBox() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    //* Redirige al usuario a la página de resultados de búsqueda
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/items?search=${input}`);
    };

    //* Limpia el campo de búsqueda
    const handleClean = () => {
        console.log('Cleaning search box');
        setInput('');
        navigate('/');
    };

    return (
        <div className='container-search'>
            <div className='container-logo'>
                <img src={logoML} alt="Mercado Libre" onClick={handleClean} />
            </div>
            <div className='container-search-box'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nunca dejes de buscar"
                    />
                    
                    <button type="submit">
                        <img src={lupaIcon} alt="Buscar" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SearchBox;

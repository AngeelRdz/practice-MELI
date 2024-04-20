import React from 'react';

import SearchBox from '../SearchBox/SearchBox';
import './Header.scss';

function Header() {
    return (
        <div className='container-header'>
            <SearchBox />
        </div>
    );
}

export default Header;

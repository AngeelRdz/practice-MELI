import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Headers';
import SearchResult from './components/SearchResults/SearchResults';
import ProductDetail from './components/ProductDetail/ProductDetail';

import './styles/App.scss';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                {/* <Route path="/" element={<SearchResult />} /> */}
                <Route path="/items" element={<SearchResult />} />
                <Route path="/items/:id" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
}

export default App;

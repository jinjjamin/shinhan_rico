import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Pages */
import Main from '../Pages/Main';
import Analyze from '../Pages/Analyze';

const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/Analyze" element={<Analyze />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
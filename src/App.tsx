import React from 'react';
import Home from './presentation/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Folder from "./presentation/pages/Folder";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/folder/:id" element={<Folder />} />
            </Routes>
        </Router>
    )
}

export default App;

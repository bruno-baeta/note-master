import React from 'react';
import Home from './presentation/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Folder from "./presentation/pages/Folder";
import Note from "./presentation/pages/Note";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/folder/:id" element={<Folder />} />
                <Route path="/note/:noteName" element={<Note />} />
            </Routes>
        </Router>
    )
}

export default App;

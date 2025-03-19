import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Noticia from './pages/Noticia';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticia/:id" element={<Noticia />} />
      </Routes>
    </Router>
  );
};

export default App;
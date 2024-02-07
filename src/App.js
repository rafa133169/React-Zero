import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login.js'; // Modificada la ruta de importación
import Header from './components/Header/Header.js';
import Buttons from './components/Buttons/Buttons.js';
import Table from './components/Table/Table.js';
import ServicesTable from './components/ServicesTable/ServicesTable.js';
import PartsTable from './components/PartsTable/PartsTable.js';
import Tablas from './components/TableMecanical/TableMecanical.jsx';




function App() {
  const handleLogin = () => {
    console.log('Usuario ha iniciado sesión');
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/Buttons" element={<Buttons />} />
          <Route path="/Mecanicos" element={<Table />} />
          <Route path="/Servicios" element={<ServicesTable />} />
          <Route path="/Piezas" element={<PartsTable />} />
          <Route path='/VistaMec' element={<Tablas/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

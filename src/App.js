import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Buttons from './components/Buttons/Buttons';
import Table from './components/Table/Table';
import ServicesTable from './components/ServicesTable/ServicesTable';
import PartsTable from './components/PartsTable/PartsTable';
import Tablas from './components/TableMecanical/TableMecanical';


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

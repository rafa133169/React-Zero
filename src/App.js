import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.js';
import Login from './components/Login/Login.js';
import Header from './components/Header/Header.js';
import Buttons from './components/Buttons/Buttons.js';
import Table from './components/Table/Table.js';
import ServicesTable from './components/ServicesTable/ServicesTable.js';
import PartsTable from './components/PartsTable/PartsTable.js';
import TableMecanical from './components/TableMecanical/TableMecanical.jsx';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    console.log('Usuario ha iniciado sesión');
    setAuthenticated(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/Header"
            element={<PrivateRoute element={<Header />} isAuthenticated={authenticated} />}
          />
          <Route
            path="/Buttons"
            element={<PrivateRoute element={<Buttons />} isAuthenticated={authenticated} />}
          />
          <Route
            path="/Mecanicos"
            element={<PrivateRoute element={<Table />} isAuthenticated={authenticated} />}
          />
          <Route
            path="/Servicios"
            element={<PrivateRoute element={<ServicesTable />} isAuthenticated={authenticated} />}
          />
          <Route
            path="/Piezas"
            element={<PrivateRoute element={<PartsTable />} isAuthenticated={authenticated} />}
          />
          <Route
            path="/VistaMec"
            element={<PrivateRoute element={<TableMecanical />} isAuthenticated={authenticated} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

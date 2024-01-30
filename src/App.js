import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Buttons from './components/Buttons/Buttons';
import Table from './components/Table/Table';
import ServicesTable from './components/ServicesTable/ServicesTable'; // Añade la importación de ServicesTable

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('Mecánicos'); // Nuevo estado para gestionar la vista

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && <Header onLogout={handleLogout} />}
      {isLoggedIn && <Buttons onViewChange={handleViewChange} />} {/* Pasa la función de cambio de vista */}
      {isLoggedIn && currentView === 'Mecánicos' && <Table />}
      {isLoggedIn && currentView === 'Servicios' && <ServicesTable />} {/* Cambia a ServicesTable */}
    </div>
  );
}

export default App;

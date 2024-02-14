import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Header from './components/Header/Header.js';
import Buttons from './components/Buttons/Buttons.js';
import Table from './components/Table/Table.js';
import ServicesTable from './components/ServicesTable/ServicesTable.js';
import PartsTable from './components/PartsTable/PartsTable.js';
import TableMecanical from './components/TableMecanical/TableMecanical.jsx';
import Home from './components/Header/Home.js'; // Asegúrate de que este componente exista si planeas usarlo
import firebaseApp from './components/firebase/credenciales.js'; // Ajusta esta ruta según la estructura de tu proyecto
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        getRol(usuarioFirebase.uid).then((rol) => {
          const userData = {
            uid: usuarioFirebase.uid,
            email: usuarioFirebase.email,
            rol: rol,
          };
          setUser(userData);
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    return docuCifrada.exists() ? docuCifrada.data().rol : null;
  }

  function PrivateRoute({ children, roles }) {
    return user && (!roles || roles.includes(user.rol)) ? children : <Navigate to="/" replace />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Home user={user} /></PrivateRoute>} />
          <Route path="/header" element={<PrivateRoute><Header /></PrivateRoute>} />
          <Route path="/buttons" element={<PrivateRoute><Buttons /></PrivateRoute>} />
          <Route path="/mecanicos" element={<PrivateRoute ><Table /></PrivateRoute>} />
          <Route path="/servicios" element={<PrivateRoute ><ServicesTable /></PrivateRoute>} />
          <Route path="/piezas" element={<PrivateRoute><PartsTable /></PrivateRoute>} />
          <Route path="/vistamec" element={<PrivateRoute><TableMecanical /></PrivateRoute>} />
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;

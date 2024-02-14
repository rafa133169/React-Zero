import React from "react";

import TableMecanical from "../TableMecanical/TableMecanical.jsx";
import ServicesTable from "../ServicesTable/ServicesTable.js";

import firebaseApp from "../firebase/credenciales.js";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

function Home({ user }) {
  return (
    <div>
      {user.rol === "admin" ? <ServicesTable /> : <TableMecanical />}
    </div>
  );
}

export default Home;
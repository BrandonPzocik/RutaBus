import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Landing from "../views/Landing";
import { ReclamosPeticiones } from "../views/ReclamosPeticiones.jsx";
import { Login } from "../views/Login";
import Home from "../views/Home.jsx";
import About from "../views/About.jsx";
import Contact from "../views/Contact.jsx";
import Profile from "../views/Profile.jsx";
import MapaPage from "../views/mapa.jsx";

const AppRouter = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Landing />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/home" /> : <Login />}
        />

        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/" />}
        />

        <Route path="/reclamos" element={<ReclamosPeticiones />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mapa" element={<MapaPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PGinaDeInicioNoLogueado } from "./PGinaDeInicioNoLogueado/PGinaDeInicioNoLogueado";
import { PGinaDeLogin } from "./PGinaDeLogin/PGinaDeLogin"; // Importa tu componente de Login
import { PGinaDeRegistro } from "./PGinaDeRegistro/PGinaDeRegistro"; // Importa tu componente de Login
import { PGinaDeInicioLogueado } from "./PGinaDeInicioLogueado/PGinaDeInicioLogueado";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PGinaDeInicioNoLogueado />} />
        <Route path="/login" element={<PGinaDeLogin />} />
        <Route path="/signUp" element={<PGinaDeRegistro />} />
        <Route path="/logueado" element={<PGinaDeInicioLogueado />} />
      </Routes>
    </Router>
  );
}
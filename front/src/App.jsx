import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Inicio } from "./Inicio/Inicio";
import { Login } from "./Login/Login"; // Importa tu componente de Login
import { Registro } from "./Registro/Registro"; // Importa tu componente de Registro
import { Categorias } from "./Categorias/Categorias"; // Importa correctamente el componente Categorias
import { RecuperarContraseña } from "./RecuperarContraseña/RecuperarContraseña";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Registro />} />
        <Route path="/categories" element={<Categorias />} />
        <Route path="/forgotPass" element={<RecuperarContraseña />} />
      </Routes>
    </Router>
  );
}
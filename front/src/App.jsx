import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Inicio } from "./Inicio/Inicio";
import { Login } from "./Login/Login"; // Importa tu componente de Login
import { Registro } from "./Registro/Registro"; // Importa tu componente de Login

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Registro />} />
      </Routes>
    </Router>
  );
}
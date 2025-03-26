import { useState } from "react";
import "./PGinaDeLogin.css";
import { LogoArtRoomDefinitivo8 } from "../LogoArtRoomDefinitivo8/LogoArtRoomDefinitivo8.jsx";
import { useNavigate } from "react-router-dom";
import { SignInButton } from "../SignInButton/SignInButton"; // Importa el botón

export const PGinaDeLogin = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ email: "", contrasena: "" });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <div className={`p-gina-de-login ${className}`}>
      <div className="login-container">
        <header className="login-header">
          <LogoArtRoomDefinitivo8 className="logo-art-room-definitivo-2-instance" />
          <div className="divisory-line"></div>
        </header>

        {/* Campo de Email */}
        <div className="input-field">
          <label className="login-label">Email</label>
          <input
            type="email"
            name="email"
            className="login-input"
            placeholder="email@example.com"
            value={usuario.email}
            onChange={handleChange}
          />
        </div>

        {/* Campo de Password */}
        <div className="input-field">
          <label className="login-label">Password</label>
          <input
            type="password"
            name="contrasena"
            className="login-input"
            placeholder="password123"
            value={usuario.contrasena}
            onChange={handleChange}
          />
        </div>

        {/* Botón de Login */}
        <SignInButton 
          email={usuario.email} 
          contrasena={usuario.contrasena} 
          onLoginSuccess={(userData) => {
            // Aquí puedes manejar lo que sucede después de un login exitoso.
            console.log('Usuario logueado:', userData);
            navigate("/logueado"); // Redirige a la página después de un login exitoso
          }}
        />
      </div>
    </div>
  );
};


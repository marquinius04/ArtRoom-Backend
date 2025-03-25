import "./PGinaDeRegistro.css";
import { LogoArtRoomDefinitivo8 } from "../LogoArtRoomDefinitivo8/LogoArtRoomDefinitivo8.jsx";
import { useNavigate } from "react-router-dom";

export const PGinaDeRegistro = ({ className, ...props }) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/logueado"); // Redirige a la página de inicio no logueado
  };
  
  return (
    <div className={`p-gina-de-login ${className}`}>
      <div className="login-container">
        {/* Header: Logo y línea divisoria */}
        <header className="login-header">
          <LogoArtRoomDefinitivo8 className="logo-art-room-definitivo-2-instance" />
          <div className="divisory-line"></div>
        </header>

        {/* Campo de Email */}
        <div className="input-field">
          <label className="login-label">Full name</label>
          <input
            type="text"
            className="login-input"
            placeholder="Name, surname..."
          />
        </div>

        {/* Campo de Password */}
        <div className="input-field">
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="email@example.com"
          />
        </div>

        {/* Campo de Email */}
        <div className="input-field">
          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="password123"
          />
        </div>

        {/* Campo de Password */}
        <div className="input-field">
          <label className="login-label">Confirm password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Same password as above"
          />
        </div>

        {/* Botón de Crear cuenta */}
        <button className="login-button-instance" onClick={handleSignUpClick}>Registro</button>
      </div>
    </div>
  );
};

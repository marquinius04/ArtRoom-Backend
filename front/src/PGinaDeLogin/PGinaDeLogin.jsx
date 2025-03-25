import "./PGinaDeLogin.css";
import { LogoArtRoomDefinitivo8 } from "../LogoArtRoomDefinitivo8/LogoArtRoomDefinitivo8.jsx";
import { useNavigate } from "react-router-dom";

export const PGinaDeLogin = ({ className, ...props }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/logueado"); // Redirige a la página de inicio no logueado
  };

  const handleSignUpRedirectClick = () => {
    navigate("/signUp"); // Redirige a la página de inicio no logueado
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
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="email@example.com"
          />
        </div>

        {/* Campo de Password */}
        <div className="input-field">
          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="password123"
          />
        </div>

        {/* Botón de Login */}
        <button className="login-button-instance" onClick={handleLoginClick}>Login</button>

        {/* Texto de ayuda */}
        <div className="forgot-your-password">Forgot your password?</div>

        {/* Texto de registro */}
        <div className="sign-up-redirect">
          Don&#039;t have an account?{" "}
          <span className="sign-up-text" onClick={handleSignUpRedirectClick}>Sign up here</span>
        </div>
      </div>
    </div>
  );
};

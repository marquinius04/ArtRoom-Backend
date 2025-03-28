import { useState } from "react";
import "./PGinaDeRegistro.css";
import { LogoArtRoomDefinitivo8 } from "../LogoArtRoomDefinitivo8/LogoArtRoomDefinitivo8.jsx";
import { useNavigate } from "react-router-dom";
import { SignUpButton } from "../SignUpButton/SignUpButton.jsx";

export const PGinaDeRegistro = ({ className, ...props }) => {
  const navigate = useNavigate();

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  // Estado para manejar errores
  const [error, setError] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validar antes de enviar
  const handleSignUp = () => {
    if (formData.contrasena !== formData.confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError(""); // Limpiar el error si las contraseñas coinciden
    navigate("/logueado"); // Redirigir si todo está correcto
  };

  return (
    <div className={`p-gina-de-login ${className}`}>
      <div className="login-container">
        {/* Header: Logo y línea divisoria */}
        <header className="login-header">
          <LogoArtRoomDefinitivo8 className="logo-art-room-definitivo-2-instance" />
          <div className="divisory-line"></div>
        </header>

        {/* Campo de Nombre */}
        <div className="input-field">
          <label className="login-label">Full name</label>
          <input
            type="text"
            name="nombre"
            className="login-input"
            placeholder="Name, surname..."
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        {/* Campo de Email */}
        <div className="input-field">
          <label className="login-label">Email</label>
          <input
            type="email"
            name="email"
            className="login-input"
            placeholder="email@example.com"
            value={formData.email}
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
            value={formData.contrasena}
            onChange={handleChange}
          />
        </div>

        {/* Campo de Confirmar Password */}
        <div className="input-field">
          <label className="login-label">Confirm password</label>
          <input
            type="password"
            name="confirmarContrasena"
            className="login-input"
            placeholder="Same password as above"
            value={formData.confirmarContrasena}
            onChange={handleChange}
          />
        </div>

        {/* Mostrar error si las contraseñas no coinciden */}
        {error && <p className="error-message">{error}</p>}

        {/* Botón de Crear cuenta con validación de contraseñas */}
        <SignUpButton usuario={formData} onSuccess={handleSignUp} />
      </div>
    </div>
  );
};

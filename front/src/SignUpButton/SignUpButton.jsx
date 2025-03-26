import { useState } from "react";
import "./SignUpButton.css";

export const SignUpButton = ({ className, usuario, ...props }) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!usuario?.nombre || !usuario?.email || !usuario?.contrasena) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/usuarios/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      console.log("Datos enviados al backend:", usuario);

      if (!response.ok) {
        throw new Error("Error al registrarse");
      }

      const data = await response.json();
      console.log("Usuario registrado:", data);
      alert("Registro exitoso");
    } catch (error) {
      console.error(error);
      alert("Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`sign-up-button ${className}`}
      onClick={handleSignUp}
      disabled={loading}
      {...props}
    >
      <span className="sign-up-text">{loading ? "Registrando..." : "Sign Up"}</span>
      <img className="sign-up-icon" src="sign-up-icon.png" alt="Sign Up Icon" />
    </button>
  );
};

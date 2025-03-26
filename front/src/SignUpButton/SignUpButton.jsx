import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la redirección
import "./SignUpButton.css";

export const SignUpButton = ({ className, usuario, onSignUpSuccess, ...props }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializamos useNavigate

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

      // Llamamos a la función onSignUpSuccess pasada por props
      if (onSignUpSuccess) {
        onSignUpSuccess(data); // Aquí puedes pasar los datos del usuario o redirigir
      }

      // Redirigimos a la página de inicio logueado
      navigate("/logueado"); // Cambia "/inicio-logueado" a la ruta correspondiente

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


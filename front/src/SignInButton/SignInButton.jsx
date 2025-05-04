import { useState } from "react";
import { useLocation } from "react-router-dom"; // Importamos useLocation para la detección de página
import "./SignInButton.css";

export const SignInButton = ({ className, email, contrasena, onLoginSuccess, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation(); // Inicializamos useNavigate

  const handleSignIn = async () => {
    if (!email || !contrasena) {
      alert("Por favor, ingresa tus credenciales.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Realiza la solicitud de login al backend
      const response = await fetch("http://localhost:5000/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contrasena }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      console.log("Usuario logueado:", data);
      
      // Ejecuta la función de éxito que puede redirigir al usuario o hacer otras acciones
      if (onLoginSuccess) {
        onLoginSuccess(data); // Pasa los datos del usuario autenticado al componente superior
      }
      
      alert("Login exitoso");
    } catch (error) {
      console.error("Error en el login:", error);
      setError(error.message);
      alert("Error en el login. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <button
        className={`${className}`}
        onClick={handleSignIn}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <span className="sign-in-text">Cargando...</span>
        ) : (
          <>
            <span className="sign-in-text">
              {location.pathname === "/login" ? "Login" : "Sign In"}
            </span>
            {(location.pathname === "/" || location.pathname === "/categories") && ( // Condición para mostrar el icono solo en la ruta "/"
              <img className="sign-in-icon" src="sign-in-icon.png" alt="Sign In Icon" />
            )}
          </>
        )}
      </button>
      {error && <div className="error-message">{error}</div>} {/* Muestra el error debajo del botón */}
    </div>
  );
};



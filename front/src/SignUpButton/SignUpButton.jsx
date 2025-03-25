import "./SignUpButton.css";

export const SignUpButton = ({ className, onClick, ...props }) => {
  return (
    <button
      className={`sign-up-button ${className}`} // Combina las clases existentes con las que se pasen
      onClick={onClick} // Asegura que el evento onClick funcione
      {...props} // Pasa cualquier otra propiedad adicional
    >
      
      <span className="sign-up-text">Sign Up</span>
      <img className="sign-up-icon" src="sign-up-icon.png" alt="Sign Up Icon" />
    </button>
  );
};
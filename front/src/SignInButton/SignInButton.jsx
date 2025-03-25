import "./SignInButton.css";

export const SignInButton = ({ className, onClick, ...props }) => {
  return (
    <button
      className={`${className}`} // Combina las clases existentes con las que se pasen
      onClick={onClick} // Asegura que el evento onClick funcione
      {...props} // Pasa cualquier otra propiedad adicional
    >

      <span className="sign-in-text">Sign In</span>
      <img className="sign-in-icon" src="sign-in-icon.png" alt="Sign In Icon" />
    </button>
  );
};

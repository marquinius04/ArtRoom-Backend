import "../Inicio/Inicio.css"; // Reutilizamos los estilos del header desde Inicio.css
import "./Categorias.css"; // Estilos específicos de Categorias
import { LogoArtRoomDefinitivo2 } from "../LogoArtRoomDefinitivo2/LogoArtRoomDefinitivo2.jsx";
import { SignUpButton } from "../SignUpButton/SignUpButton.jsx";
import { SignInButton } from "../SignInButton/SignInButton.jsx";
import { SkillIconsInstagram } from "../SkillIconsInstagram/SkillIconsInstagram.jsx";
import { LogosYoutubeIcon } from "../LogosYoutubeIcon/LogosYoutubeIcon.jsx";
import { DeviconTwitter } from "../DeviconTwitter/DeviconTwitter.jsx";
import { useNavigate } from "react-router-dom";

export const Categorias = ({ className, ...props }) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login"); // Redirige a la página de Login
  };

  const handleSignUpClick = () => {
    navigate("/signUp"); // Redirige a la página de Registro
  };

  const categories = [
    { name: "Animals and Plants", image: "plankton.png" },
    { name: "Realistic Furnitures", image: "chair.png" },
    { name: "Weapons and Ammunition", image: "ak-recargando.png" },
    { name: "Sculpture and Art", image: "lumina.png" },
    { name: "Fantastic Landscapes", image: "fantasy.png" },
    { name: "Realistic Landscapes", image: "realistic-env.png" },
    { name: "Cars and Vehicles", image: "abandoned-cars.png" },
    { name: "Buildings and Structures", image: "desert.png" },
  ];

  return (
    <div className={`background`}>
      <div className="header">
        <LogoArtRoomDefinitivo2/>
        <div className="search-container">
          <img src="vector0.svg" alt="Search Icon" className="search-icon" />
          <span className="search-text">Search</span>
        </div>
        <div className="auth-buttons">
          <SignUpButton
            className="sign-up-button" 
            onClick={handleSignUpClick}
          />
          <SignInButton
            className="sign-in-button"
            onClick={handleSignInClick}
          />
        </div>
      </div>

      <h1 className="categories-title">Categories</h1>
      <div className="grid-4-columns"> {/* Reutilizamos la clase assets-grid */}
        {categories.map((category, index) => (
          <div key={index} className="card"> {/* Reutilizamos la clase asset-item */}
            <img src={category.image} alt={category.name} />
            <div className="card-title">{category.name}</div>
          </div>
        ))}
      </div>

      <footer>
        <div className="social-media">
          <SkillIconsInstagram className="skill-icons-instagram-instance" />
          <LogosYoutubeIcon className="logos-youtube-icon-instance" />
          <DeviconTwitter className="devicon-twitter-instance" />
        </div>
        <div className="copyright">Copyright © UA 2024-2025</div>
      </footer>
    </div>
  );
};
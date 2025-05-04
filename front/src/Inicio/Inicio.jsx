import "./Inicio.css";
import { LogoArtRoomDefinitivo2 } from "../LogoArtRoomDefinitivo2/LogoArtRoomDefinitivo2.jsx";
import { SignUpButton } from "../SignUpButton/SignUpButton.jsx";
import { SignInButton } from "../SignInButton/SignInButton.jsx";
import { SkillIconsInstagram } from "../SkillIconsInstagram/SkillIconsInstagram.jsx";
import { LogosYoutubeIcon } from "../LogosYoutubeIcon/LogosYoutubeIcon.jsx";
import { DeviconTwitter } from "../DeviconTwitter/DeviconTwitter.jsx";
import { useNavigate } from "react-router-dom";

export const Inicio = ({ className, ...props }) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login"); // Redirige a la página de Login
  };

  const handleSignUpClick = () => {
    navigate("/signUp"); // Redirige a la página de Registro
  };

  const handleCategoriesClick = () => {
    navigate("/categorias"); // Redirige a la página de Categorías
  };

  // Datos para los elementos repetitivos
  const trendingAssets = [
    { title: "Medieval Kingdom", image: "medieval.png", likes: 120, views: 450 },
    { title: "Time Ghost: Character", image: "time-character.png", likes: 98, views: 320 },
    { title: "Time Ghost: Environment", image: "time-env.png", likes: 150, views: 500 },
    { title: "Fantasy Kingdom", image: "fantasy.png", likes: 200, views: 600 },
    { title: "Lumina GI 2024", image: "lumina.png", likes: 180, views: 550 },
    { title: "Toon Enchanted Meadow", image: "toon-meadow.png", likes: 75, views: 250 },
    { title: "Abandoned Cars", image: "abandoned-cars.png", likes: 90, views: 300 },
    { title: "Desert Kingdom", image: "desert.png", likes: 110, views: 400 },
    { title: "Temple Asset Pack", image: "temple.png", likes: 130, views: 420 },
    { title: "Plankton 3D Model", image: "plankton.png", likes: 50, views: 150 },
  ];

  const categories = [
    "3D",
    "Scripts",
    "Add-ons",
    "Sounds",
    "Music",
    "Templates",
    "Tools",
    "2D",
  ];

  return (
    <div className={`p-gina-de-inicio-no-logueado ${className}`}>
      <div className="header">
        <LogoArtRoomDefinitivo2 className="logo-art-room-definitivo-2-instance" />
        <div className="search-container">
          <img src="vector0.svg" alt="Search Icon" className="search-icon" />
          <span className="search-text">Search</span>
        </div>
        <div className="auth-buttons">
          <SignUpButton
            className="sign-up-button-instance" 
            onClick={handleSignUpClick}
          />
          <SignInButton
            className="sign-in-button-instance"
            onClick={handleSignInClick}
          />
        </div>
      </div>

      <div className="filters-grid">
        {categories.map((category, index) => (
          <div key={index} className="filter-item">
            {category}
          </div>
        ))}
      </div>

      <div className="recommended-assets">
        <div className="assets-grid">
          {trendingAssets.map((asset, index) => (
            <div key={index} className="asset-item">
              <img src={asset.image} alt={asset.title} />
              <div className="asset-title">{asset.title}</div>
              <div className="asset-stats">
                <div className="asset-likes">
                  <img src="like-icon.png" alt="Likes" className="stat-icon" />
                  {asset.likes}
                </div>
                <div className="asset-views">
                  <img src="view-icon.png" alt="Views" className="stat-icon" />
                  {asset.views}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="categories-link" onClick={handleCategoriesClick}>
        Search by categories
      </div>

      <div className="trending-assets">
        <h2>Top Trending Assets</h2>
        <div className="assets-grid">
          {trendingAssets.slice(0, 3).map((asset, index) => (
            <div key={index} className="asset-item">
              <img src={asset.image} alt={asset.title} />
              <div className="asset-title">{asset.title}</div>
              <div className="asset-stats">
                <div className="asset-likes">
                  <img src="like-icon.png" alt="Likes" className="stat-icon" />
                  {asset.likes}
                </div>
                <div className="asset-views">
                  <img src="view-icon.png" alt="Views" className="stat-icon" />
                  {asset.views}
                </div>
              </div>
            </div>
          ))}
        </div>
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
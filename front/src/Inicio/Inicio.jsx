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
    navigate("/categories"); // Redirige a la página de Categorías
  };

  // Datos para los elementos repetitivos
  const trendingAssets = [
    { title: "Medieval Kingdom", image: "https://www.dropbox.com/scl/fi/m0voxyg52vh3trimmeit9/medieval.png?rlkey=1g36ma5gepk0e6jt0kwrrfsrz&st=2j7cqm18&dl&raw=1", likes: 120, views: 450 },
    { title: "Time Ghost: Character", image: "https://www.dropbox.com/scl/fi/nicjjn2or114xfc8wc8tk/time-character.png?rlkey=i5ms5f8yemin4yidanwqyo890&st=knbujtvz&raw=1", likes: 98, views: 320 },
    { title: "Time Ghost: Environment", image: "https://www.dropbox.com/scl/fi/f93eic51n1gu8v1hrc6w6/time-env.png?rlkey=nhp7ciowh11ztad74amhlzxgn&st=ud7v91m2&dl&raw=1", likes: 150, views: 500 },
    { title: "Fantasy Kingdom", image: "https://www.dropbox.com/scl/fi/h426ejua4jker77mt078t/fantasy.png?rlkey=cma3zzqhl8j99elx0uulp8j22&st=k65fqwcz&dl&raw=1", likes: 200, views: 600 },
    { title: "Lumina GI 2024", image: "https://www.dropbox.com/scl/fi/2s91d7c5ph88nnn1ogq74/lumina.png?rlkey=3rve8t7z5a2pm4to7io41qvxz&st=ky7c1glt&dl&raw=1", likes: 180, views: 550 },
    { title: "Toon Enchanted Meadow", image: "https://www.dropbox.com/scl/fi/oe9dcp250wrv65ooty3gx/toon-meadow.png?rlkey=bnu0zhr7zozvugybzu5koy7z8&st=d809crvg&dl&raw=1", likes: 75, views: 250 },
    { title: "Abandoned Cars", image: "https://www.dropbox.com/scl/fi/vjx476errlhj0ew8uj4su/abandoned-cars.png?rlkey=qayrjvpnn28v97dj5v9a6itni&st=qf3uea9i&dl&raw=1", likes: 90, views: 300 },
    { title: "Desert Kingdom", image: "https://www.dropbox.com/scl/fi/svvcr8htvsoiitkxe8qdb/desert.png?rlkey=agxxzyaimyznwyu8yg9716boe&st=rl9ppnh5&dl&raw=1", likes: 110, views: 400 },
    { title: "Temple Asset Pack", image: "https://www.dropbox.com/scl/fi/tem2btbz610sese58bv4l/temple.png?rlkey=6fh0au08fc9sf02utbr07fh8y&st=yrbtqo17&dl&raw=1", likes: 130, views: 420 },
    { title: "Plankton 3D Model", image: "https://www.dropbox.com/scl/fi/c0ttuw8c6b8qox9q9lpvk/plankton.png?rlkey=7ekpp1tw8l760nir3cxulgswh&st=0ovzsrpb&dl&raw=1", likes: 50, views: 150 },
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
          <input className="search-text"></input>
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
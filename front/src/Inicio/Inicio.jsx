import { useEffect, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Detectar login al montar el componente
  useEffect(() => {
    const user = localStorage.getItem("user"); // O usa auth context, JWT, etc.
    console.log("Usuario en Inicio:", user);
    setIsLoggedIn(!!user);
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    console.log("Usuario logueado en Inicio:", userData);
  };
  

  const handleSignInClick = () => navigate("/login");
  const handleSignUpClick = () => navigate("/signUp");
  const handleCategoriesClick = () => navigate("/categories");
  const handleProfileClick = () => navigate("/profile");
  const handleUploadClick = () => navigate("/uploadAssets");
  const handleLogoutClick = () => {
    localStorage.removeItem("user"); // o remove token/cookie
    setIsLoggedIn(false);
    navigate("/"); // volver al inicio
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
    { title: "Plankton 3D Model", image: "https://www.dropbox.com/scl/fi/c0ttuw8c6b8qox9q9lpvk/plankton.png?rlkey=7ekpp1tw8l760nir3cxulgswh&st=269pngna&raw=1", likes: 50, views: 150 },
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
          <img
            src="https://www.dropbox.com/scl/fi/ieaswykdv57270lwyk217/vector0.svg?rlkey=infc1esp7w5jleq4zlb80nr5p&st=f84l3uv2&raw=1"
            alt="Search Icon"
            className="search-icon"
          />
          <input
            type="text"
            className="search-text"
            placeholder="Search..."
          />
        </div>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <button className="upload-icon" onClick={handleUploadClick}><img src="https://www.dropbox.com/scl/fi/o4cednhkybd1ty8xsp5x7/upload-icon.png?rlkey=0ymn2yz9rqdpuyf2hd50hoa7o&st=0t6y1zo8&dl&raw=1"></img></button>
              <button className="user-icon" onClick={handleProfileClick}><img src="https://www.dropbox.com/scl/fi/hfz5wn581d6rot1ccxuyh/user-icon.png?rlkey=hm75yyttqaw7hb8n5tk3ja3xq&st=rknzoa1v&dl&raw=1"></img></button>
            </>
          ) : (
            <>
              <SignUpButton
                className="sign-up-button-instance"
                onClick={handleSignUpClick}
              />
              <SignInButton
                className="sign-in-button-instance"
                onClick={handleSignInClick}
                onLoginSuccess={handleLoginSuccess}
              />
            </>
          )}
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
                  <img src="https://www.dropbox.com/scl/fi/q33jkrd672q4d25su0x05/like-icon.png?rlkey=sp7h5t1wobga7jb2ctkk0tbcf&st=fnredprb&raw=1" alt="Likes" className="stat-icon" />
                  {asset.likes}
                </div>
                <div className="asset-views">
                  <img src="https://www.dropbox.com/scl/fi/voana9ty7p7zl13it9os8/view-icon.png?rlkey=ma0u1ziyxl1zb0fgilffd3jjx&st=mt18cmdg&raw=1" alt="Views" className="stat-icon" />
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
                  <img src="https://www.dropbox.com/scl/fi/q33jkrd672q4d25su0x05/like-icon.png?rlkey=sp7h5t1wobga7jb2ctkk0tbcf&st=fnredprb&raw=1" alt="Likes" className="stat-icon" />
                  {asset.likes}
                </div>
                <div className="asset-views">
                  <img src="https://www.dropbox.com/scl/fi/voana9ty7p7zl13it9os8/view-icon.png?rlkey=ma0u1ziyxl1zb0fgilffd3jjx&st=mt18cmdg&raw=1" alt="Views" className="stat-icon" />
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
import { useEffect, useState } from "react";
import "./Inicio.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogoArtRoomDefinitivo2 } from "../LogoArtRoomDefinitivo2/LogoArtRoomDefinitivo2.jsx";
import { SignUpButton } from "../SignUpButton/SignUpButton.jsx";
import { SignInButton } from "../SignInButton/SignInButton.jsx";
import { SkillIconsInstagram } from "../SkillIconsInstagram/SkillIconsInstagram.jsx";
import { LogosYoutubeIcon } from "../LogosYoutubeIcon/LogosYoutubeIcon.jsx";
import { DeviconTwitter } from "../DeviconTwitter/DeviconTwitter.jsx";

export const Inicio = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    axios.get("http://localhost:5000/api/recursos")
      .then((res) => setRecursos(res.data))
      .catch((err) => console.error("Error al cargar recursos:", err));
  }, []);

  const handleSignInClick = () => navigate("/login");
  const handleSignUpClick = () => navigate("/signUp");
  const handleCategoriesClick = () => navigate("/categories");
  const handleProfileClick = () => navigate("/profile");
  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleAssetClick = (id) => {
    navigate(`/asset/${id}`);
  };

  const categories = ["3D", "Scripts", "Add-ons", "Sounds", "Music", "Templates", "Tools", "2D"];

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
          <input type="text" className="search-text" placeholder="Search..." />
        </div>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <button className="upload-icon" onClick={handleLogoutClick}>
                <img src="https://www.dropbox.com/scl/fi/o4cednhkybd1ty8xsp5x7/upload-icon.png?rlkey=0ymn2yz9rqdpuyf2hd50hoa7o&st=0t6y1zo8&dl&raw=1" />
              </button>
              <button className="user-icon" onClick={handleProfileClick}>
                <img src="https://www.dropbox.com/scl/fi/hfz5wn581d6rot1ccxuyh/user-icon.png?rlkey=hm75yyttqaw7hb8n5tk3ja3xq&st=rknzoa1v&dl&raw=1" />
              </button>
            </>
          ) : (
            <>
              <SignUpButton className="sign-up-button-instance" onClick={handleSignUpClick} />
              <SignInButton className="sign-in-button-instance" onClick={handleSignInClick} />
            </>
          )}
        </div>
      </div>

      <div className="filters-grid">
        {categories.map((category, index) => (
          <div key={index} className="filter-item">{category}</div>
        ))}
      </div>

      <div className="recommended-assets">
        <h2>Recursos disponibles</h2>
        <div className="assets-grid">
          {recursos.map((asset) => (
            <div
              key={asset._id}
              className="asset-item"
              onClick={() => handleAssetClick(asset._id)}
              style={{ cursor: "pointer" }}
            >
              <img src={asset.previewUrl || asset.archivoUrl} alt={asset.titulo} />
              <div className="asset-title">{asset.titulo}</div>
              <div className="asset-stats">
                <div className="asset-likes">
                  <img src="https://www.dropbox.com/scl/fi/q33jkrd672q4d25su0x05/like-icon.png?rlkey=sp7h5t1wobga7jb2ctkk0tbcf&raw=1" alt="Likes" className="stat-icon" />
                  {asset.likes || 0}
                </div>
                <div className="asset-views">
                  <img src="https://www.dropbox.com/scl/fi/voana9ty7p7zl13it9os8/view-icon.png?rlkey=ma0u1ziyxl1zb0fgilffd3jjx&raw=1" alt="Views" className="stat-icon" />
                  {asset.views || 0}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="categories-link" onClick={handleCategoriesClick}>
        Search by categories
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

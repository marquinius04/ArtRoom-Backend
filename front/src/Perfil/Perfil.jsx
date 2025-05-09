import "./Perfil.css";
import { LogoArtRoomDefinitivo2 } from "../LogoArtRoomDefinitivo2/LogoArtRoomDefinitivo2.jsx";
import { SignUpButton } from "../SignUpButton/SignUpButton.jsx";
import { SignInButton } from "../SignInButton/SignInButton.jsx";
import { SkillIconsInstagram } from "../SkillIconsInstagram/SkillIconsInstagram.jsx";
import { LogosYoutubeIcon } from "../LogosYoutubeIcon/LogosYoutubeIcon.jsx";
import { DeviconTwitter } from "../DeviconTwitter/DeviconTwitter.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export const Perfil = ({ className, ...props }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   const user = localStorage.getItem("user");
     setIsLoggedIn(!!user);
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); // o "/login"
  };
  
  const handleProfileClick = () => navigate("/profile");
  

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login"); // Redirige a la página de Login
  };

  const handleSignUpClick = () => {
    navigate("/signUp"); // Redirige a la página de Registro
  };

  const userAssets = [
    {
      title: "Medieval Kingdom",
      image: "https://www.dropbox.com/scl/fi/m0voxyg52vh3trimmeit9/medieval.png?rlkey=1g36ma5gepk0e6jt0kwrrfsrz&st=2j7cqm18&dl&raw=1",
      likes: 120,
      views: 450,
    },
    {
      title: "Time Ghost",
      image: "https://www.dropbox.com/scl/fi/nicjjn2or114xfc8wc8tk/time-character.png?rlkey=i5ms5f8yemin4yidanwqyo890&st=knbujtvz&raw=1",
      likes: 98,
      views: 320,
    },
    {
      title: "Time Environment",
      image: "https://www.dropbox.com/scl/fi/f93eic51n1gu8v1hrc6w6/time-env.png?rlkey=nhp7ciowh11ztad74amhlzxgn&st=ud7v91m2&dl&raw=1",
      likes: 150,
      views: 500,
    },
  ];

  return (
    <div className={`background`}>
      <div className="header">
        <LogoArtRoomDefinitivo2/>
        <div className="search-container">
          <img src="https://www.dropbox.com/scl/fi/ieaswykdv57270lwyk217/vector0.svg?rlkey=infc1esp7w5jleq4zlb80nr5p&st=f84l3uv2&raw=1" alt="Search Icon" className="search-icon" />
          <input
            type="text"
            className="search-text"
            placeholder="Search..."
          />
        </div>
        <div className="auth-buttons">
        {isLoggedIn ? (
            <>
              <button className="upload-icon" onClick={handleLogoutClick}><img src="https://www.dropbox.com/scl/fi/o4cednhkybd1ty8xsp5x7/upload-icon.png?rlkey=0ymn2yz9rqdpuyf2hd50hoa7o&st=0t6y1zo8&dl&raw=1"></img></button>
              <button className="user-icon" onClick={handleProfileClick}><img src="https://www.dropbox.com/scl/fi/hfz5wn581d6rot1ccxuyh/user-icon.png?rlkey=hm75yyttqaw7hb8n5tk3ja3xq&st=rknzoa1v&dl&raw=1"></img></button>
            </>
          ) : (
            <>
          <SignUpButton
            className="sign-up-button" 
            onClick={handleSignUpClick}
          />
          <SignInButton
            className="sign-in-button"
            onClick={handleSignInClick}
          />
          </>
          )};
        </div>
      </div>

      <div className="dashboard-usuario">
        <div className="dashboard-izq">
          <div className="dashboard-perfil">
            <img className="profile-photo" src="https://www.dropbox.com/scl/fi/hfz5wn581d6rot1ccxuyh/user-icon.png?rlkey=hm75yyttqaw7hb8n5tk3ja3xq&st=rknzoa1v&dl&raw=1"></img>
            <div className="divisory-line"></div>
            <a href="/my-assets">My Assets</a>
              <div className="assets-grid">
                {userAssets.map((asset, index) => (
                  <div key={index} className="asset-item">
                    <img src={asset.image} alt={asset.title} className="asset-image" />
                    <div className="asset-title">{asset.title}</div>
                    <div className="asset-stats">
                      <div className="asset-likes">
                        <img
                          src="https://www.dropbox.com/scl/fi/q33jkrd672q4d25su0x05/like-icon.png?rlkey=sp7h5t1wobga7jb2ctkk0tbcf&st=fnredprb&raw=1"
                          alt="Likes"
                          className="stat-icon"
                        />
                        {asset.likes}
                      </div>
                      <div className="asset-views">
                        <img
                          src="https://www.dropbox.com/scl/fi/voana9ty7p7zl13it9os8/view-icon.png?rlkey=ma0u1ziyxl1zb0fgilffd3jjx&st=mt18cmdg&raw=1"
                          alt="Views"
                          className="stat-icon"
                        />
                        {asset.views}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
          <div className="dashboard-historial">
            <button className="button">Download history</button>
          </div>
        </div>

        <div className="dashboard-dcha">
          <button className="button">Change password</button>
          <button className="button">Add social networks</button>
          <button className="button delete-account">Delete account</button>
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

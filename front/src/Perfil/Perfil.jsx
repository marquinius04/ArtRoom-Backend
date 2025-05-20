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

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
  
    if (!confirmed) return;
  
    const user = JSON.parse(localStorage.getItem("user")); // Asegúrate de que user._id esté disponible
  
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/delete-account/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
  
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("There was a problem deleting your account. Please try again.");
    }
  };
  

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Usuario no autenticado");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`http://localhost:5000/api/usuarios/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}` // solo si usas JWT
        },
        body: JSON.stringify({ password: newPassword })
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la contraseña");
      }

      alert("Contraseña actualizada correctamente");
      setShowPasswordForm(false);
      setNewPassword("");
      setRepeatPassword("");
    } catch (error) {
      console.error(error);
      alert("Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 875);

  useEffect(() => {
   const user = localStorage.getItem("user");
     setIsLoggedIn(!!user);
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); // o "/login"
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 875);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
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
              <a href="/profile" className="user-icon"> <img src="https://www.dropbox.com/scl/fi/hfz5wn581d6rot1ccxuyh/user-icon.png?rlkey=hm75yyttqaw7hb8n5tk3ja3xq&st=rknzoa1v&dl&raw=1"></img></a>
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
          )}
        </div>
      </div>

      <div className="dashboard-usuario">
        <div className="dashboard-izq">
          <div className="dashboard-perfil">
            <div className="arriba-perfil">
              <img className="profile-photo" src="https://www.dropbox.com/scl/fi/hfz5wn581d6rot1ccxuyh/user-icon.png?rlkey=hm75yyttqaw7hb8n5tk3ja3xq&st=rknzoa1v&dl&raw=1"></img>
              <div className="divisory-line"></div>
            </div>
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
            {isMobile ? (
              <button href="/downloadHistory" className="button">Download history</button>
            ) : (
              <>
                <a href="/downloadHistory">Download history</a>
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
              </>
            )}
          </div>
        </div>

        <div className="dashboard-dcha">
          {!showPasswordForm && (
            <button
              className="button"
              onClick={() => setShowPasswordForm(true)}
            >
              Change password
            </button>
          )}

          {showPasswordForm && (
            <div className="password-form">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Repeat New Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
              
              <div className="form-buttons">
                <button onClick={handleChangePassword} disabled={loading} className="button">
                  {loading ? "Actualizando..." : "Confirm Change"}
                </button>
                <button
                  className="button cancel-button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setNewPassword("");
                    setRepeatPassword("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <button className="button">Add social networks</button>
          <button
            className="button delete-account"
            onClick={handleDeleteAccount}
          >
            Delete account
          </button>
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

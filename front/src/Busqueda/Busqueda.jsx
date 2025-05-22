import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Busqueda.css"; // puedes crear uno nuevo si prefieres
import { Cabecera } from "../Componentes/Cabecera.jsx";
import { SkillIconsInstagram } from "../SkillIconsInstagram/SkillIconsInstagram.jsx";
import { LogosYoutubeIcon } from "../LogosYoutubeIcon/LogosYoutubeIcon.jsx";
import { DeviconTwitter } from "../DeviconTwitter/DeviconTwitter.jsx";

export const Busqueda = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q")?.toLowerCase() || "";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recursos, setRecursos] = useState([]);
  const [filteredRecursos, setFilteredRecursos] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    fetch("http://localhost:5000/api/recursos")
      .then((res) => res.json())
      .then((data) => {
        setRecursos(data);
        const resultados = data.filter((recurso) =>
          recurso.titulo?.toLowerCase().includes(searchQuery)
        );
        setFilteredRecursos(resultados);
      })
      .catch((err) => console.error("Error al cargar recursos:", err));
  }, [searchQuery]);

  const handleSignInClick = () => navigate("/login");
  const handleSignUpClick = () => navigate("/signUp");
  const handleProfileClick = () => navigate("/profile");
  const handleUploadClick = () => navigate("/uploadAssets");
  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };
  const handleAssetClick = (id) => {
    navigate(`/asset/${id}`);
  };

  return (
    <div className="pagina-busqueda">
        <div className="content">
            <Cabecera
              isLoggedIn={isLoggedIn}
              handleUploadClick={handleUploadClick}
              handleProfileClick={handleProfileClick}
              handleSignUpClick={handleSignUpClick}
              handleSignInClick={handleSignInClick}
              handleLogoutClick={handleLogoutClick}
            />
      
            <h2>Resultados de búsqueda: "{searchQuery}"</h2>
            <div className="assets-grid">
              {filteredRecursos.length > 0 ? (
                filteredRecursos.map((asset) => (
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
                        <img
                          src="https://www.dropbox.com/scl/fi/q33jkrd672q4d25su0x05/like-icon.png?rlkey=sp7h5t1wobga7jb2ctkk0tbcf&raw=1"
                          alt="Likes"
                          className="stat-icon"
                        />
                        {asset.numLikes || 0}
                      </div>
                      <div className="asset-views">
                        <img
                          src="https://www.dropbox.com/scl/fi/voana9ty7p7zl13it9os8/view-icon.png?rlkey=ma0u1ziyxl1zb0fgilffd3jjx&raw=1"
                          alt="Views"
                          className="stat-icon"
                        />
                        {asset.numVistas || 0}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No se encontraron recursos con ese título.</p>
              )}
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

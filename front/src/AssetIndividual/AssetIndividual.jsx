import "./AssetIndividual.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Cabecera } from "../Componentes/Cabecera.jsx";

export const AssetIndividual = ({ className = "", ...props }) => {
  const { id } = useParams(); // Obtiene el id de la URL
  const [asset, setAsset] = useState(null); // Estado para almacenar los datos del asset
  const [randomAssets, setRandomAssets] = useState([]); // Estado para almacenar los assets aleatorios
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [comments, setComments] = useState([]); // Estado para almacenar los comentarios
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user"); // O usa auth context, JWT, etc.
    console.log("Usuario en Inicio:", user);
    setIsLoggedIn(!!user);

    const fetchAsset = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recursos/${id}`); // Realiza la solicitud a la API con el id
        if (!response.ok) {
          throw new Error("Error al obtener el asset");
        }
        const data = await response.json();
        setAsset(data); // Actualiza el estado con los datos del asset
      } catch (error) {
        setError(error.message); // Maneja errores
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    const fetchRandomAssets = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recursos/random"); // Solicita 3 assets aleatorios
        if (!response.ok) {
          throw new Error("Error al obtener assets aleatorios");
        }
        const data = await response.json();
        setRandomAssets(data); // Actualiza el estado con los assets aleatorios
      } catch (error) {
        console.error("Error al obtener assets aleatorios:", error);
      }
    };

    fetchAsset();
    fetchRandomAssets();
  }, [id]); // Ejecuta el efecto cuando cambia el id

  if (loading) return <div>Cargando modelo...</div>; // Muestra un mensaje mientras se cargan los datos
  if (error) return <div>Error: {error}</div>; // Muestra un mensaje de error si ocurre un problema

  const handleAssetClick = (id) => {
    navigate(`/asset/${id}`);
  };

  const handleSignInClick = () => navigate("/login");
  const handleSignUpClick = () => navigate("/signUp");
  const handleProfileClick = () => navigate("/profile");
  const handleUploadClick = () => navigate("/uploadAssets");
  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    console.log("Usuario eliminado del localStorage");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className={`asset-individual ${className}`} {...props}>
      <Cabecera
        isLoggedIn={isLoggedIn}
        handleUploadClick={handleUploadClick}
        handleProfileClick={handleProfileClick}
        handleSignUpClick={handleSignUpClick}
        handleSignInClick={handleSignInClick}
        handleLogoutClick={handleLogoutClick}
      />
      <div className="asset-content">
        {/* Primera fila: Información del asset y proyectos relacionados */}
        <div className="asset-row">
          <div className="asset-info">
            <img
              src={asset.archivoUrl}
              alt={asset.titulo}
              className="asset-image"
            />
            <div className="asset-stats">
              <h1>{asset.titulo}</h1>
              <h1>
                <img
                  alt="Likes"
                  className="stat-icon"
                  src="https://www.dropbox.com/scl/fi/q33jkrd672q4d25su0x05/like-icon.png?rlkey=sp7h5t1wobga7jb2ctkk0tbcf&raw=1"
                />
                {asset.numDescargas}
              </h1>
              <h1>
                <img
                  alt="Views"
                  className="stat-icon"
                  src="https://www.dropbox.com/scl/fi/voana9ty7p7zl13it9os8/view-icon.png?rlkey=ma0u1ziyxl1zb0fgilffd3jjx&raw=1"
                />
                {asset?.numVistas || "Falta BD"}
              </h1>
            </div>
            <p className="asset-usuario">Subido por: {asset.usuarioId.username}</p>
            <p>{asset?.descripcion || "Falta BD"}</p>

            {/* Nueva sección para las tags */}
            {Array.isArray(asset.tags) && asset.tags.length > 0 && (
              <div className="asset-tags">
                <h3>Etiquetas:</h3>
                <div className="tags-container">
                  {asset.tags.map((tag, index) => (
                    <span key={index} className="tag-item">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <a href={asset.archivoUrl} download className="download-button">
              Descargar modelo
            </a>
          </div>

          {/* Proyectos relacionados */}
          <div className="asset-related">
            <h2>Proyectos relacionados</h2>
            <div className="related-assets">
              {randomAssets.map((relatedAsset) => (
                <div
                  key={relatedAsset._id}
                  className="related-asset-item"
                  onClick={() => handleAssetClick(relatedAsset._id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={relatedAsset.previewUrl || relatedAsset.archivoUrl}
                    alt={relatedAsset.titulo}
                    className="related-asset-image"
                  />
                  <div className="related-asset-info">
                    <div className="related-asset-title">{relatedAsset.titulo}</div>
                    <div className="related-asset-user">
                      Publicado por: {relatedAsset.usuario?.nombre || "Desconocido"}
                    </div>
                  </div>
                  <div className="related-asset-stats">
                    <div className="related-asset-likes">
                      <img
                        src="https://www.dropbox.com/scl/fi/q33jkrd672q4d25su0x05/like-icon.png?rlkey=sp7h5t1wobga7jb2ctkk0tbcf&raw=1"
                        alt="Likes"
                        className="stat-icon"
                      />
                      {relatedAsset.likes || 0}
                    </div>
                    <div className="related-asset-views">
                      <img
                        src="https://www.dropbox.com/scl/fi/voana9ty7p7zl13it9os8/view-icon.png?rlkey=ma0u1ziyxl1zb0fgilffd3jjx&raw=1"
                        alt="Views"
                        className="stat-icon"
                      />
                      {relatedAsset.views || 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Segunda fila: Caja de comentarios */}
        <div className="comments-section">
          <h2>Comentarios</h2>
          {isLoggedIn ? (
            <form
              className="comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                const newComment = e.target.comment.value;
                if (newComment.trim()) {
                  const user = JSON.parse(localStorage.getItem("user"));
                  const username = user?.username || "Usuario Anónimo"; // Extrae solo el username
                  setComments([...comments, { text: newComment, user: username }]); // Guarda solo el username
                  e.target.reset();
                }
              }}
            >
              <textarea
                name="comment"
                className="comment-input"
                placeholder="Escribe un comentario..."
                rows="4"
              ></textarea>
              <button type="submit" className="comment-submit-button">
                Enviar
              </button>
            </form>
          ) : (
            <p className="login-message">
              Debes <span onClick={() => navigate("/login")} className="login-link">iniciar sesión</span> para comentar.
            </p>
          )}
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p className="comment-user">{comment.user}</p>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
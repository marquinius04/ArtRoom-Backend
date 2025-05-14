import "./SubirAssets.css";
import { LogoArtRoomDefinitivo2 } from "../LogoArtRoomDefinitivo2/LogoArtRoomDefinitivo2.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SubirAssets = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user"); // Obtiene el usuario del localStorage
    console.log("Usuario en SubirAssets:", !!user);
    setIsLoggedIn(!!user); // Actualiza el estado

    if (!user) {
      navigate("/"); // Redirige al inicio si no está logueado
    }
  }, [navigate]); // Solo depende de navigate

  return (
    <div className={`p-gina-de-subir-assets`}>
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
          <button className="upload-icon"><img src="https://www.dropbox.com/scl/fi/o4cednhkybd1ty8xsp5x7/upload-icon.png?rlkey=0ymn2yz9rqdpuyf2hd50hoa7o&st=0t6y1zo8&dl&raw=1"></img></button>
          <button className="user-icon"><img src="https://www.dropbox.com/scl/fi/hfz5wn581d6rot1ccxuyh/user-icon.png?rlkey=hm75yyttqaw7hb8n5tk3ja3xq&st=rknzoa1v&dl&raw=1"></img></button>
        </div>
      </div>

      <div className="subir-assets-container">
        <div className="div-izquierda">
          <div className="main-info"></div>
          <div className="media-files"></div>
          {/* <button className="button">
            <img src="https://www.dropbox.com/scl/fi/o4cednhkybd1ty8xsp5x7/upload-icon.png?rlkey=0ymn2yz9rqdpuyf2hd50hoa7o&st=0t6y1zo8&dl&raw=1"></img>
            Upload
          </button> */}
        </div>
        <div className="div-derecha">
        </div>
      </div>
    </div>
  );
};

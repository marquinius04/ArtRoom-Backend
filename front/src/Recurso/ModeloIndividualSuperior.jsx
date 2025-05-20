import "./ModeloIndividualSuperior.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LogoArtRoomDefinitivo2 } from "../LogoArtRoomDefinitivo2/LogoArtRoomDefinitivo2.jsx";

export const ModeloIndividualSuperior = ({ className = "", ...props }) => {
  const { titulo } = useParams();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recursos/${encodeURIComponent(titulo)}`);
        const data = await response.json();
        setAsset(data);
      } catch (error) {
        console.error("Error al obtener el asset:", error);
      }
    };

    fetchAsset();
  }, [titulo]);

  if (!asset) return <div>Cargando modelo...</div>;

  return (
    <div className={`modelo-individual-superior ${className}`} {...props}>
      <div className="fondo"></div>
      <div className="fondo-ventana-emergente"></div>

      <div className="a-adir-a-favs">
        <div className="fondo-boton-a-adir"></div>
        <img className="add" src="add0.png" alt="Añadir a favoritos" />
        <div className="a-adir-a-favoritos">Añadir a favoritos</div>
      </div>

      <div className="compartir">
        <div className="fondo-boton-compartir"></div>
        <img className="share" src="share0.png" alt="Compartir" />
        <div className="compartir2">Compartir</div>
      </div>

      <div className="contenido">
        <div className="modelo">
          {/* Usa el archivoUrl como src */}
          <img className="modelo2" src={asset.archivoUrl} alt={asset.titulo} />
          {/* Iconos */}
          <img className="vr" src="vr0.png" alt="Modo VR" />
          <img className="pantalla-grande" src="pantalla-grande0.png" alt="Pantalla grande" />
          <img className="capas" src="capas0.png" alt="Capas" />
          <img className="engranaje" src="engranaje0.png" alt="Configuración" />
          <img className="ayuda" src="ayuda0.png" alt="Ayuda" />

          <div className="descargar">
            <div className="rectangle-15"></div>
            <img className="image-9" src="image-90.png" alt="Descargar" />
            <a
              className="descargar-modelo"
              href={asset.archivoUrl}
              download
            >
              Descargar modelo
            </a>
          </div>
        </div>

        <div className="estadisticas-modelo">
          <div className="_132">{asset.numDescargas}</div>
          <img className="star-2" src="star-20.svg" alt="Estrella" />
          <img className="ojo-abierto-1-2" src="ojo-abierto-1-20.png" alt="Vistas" />
        </div>
      </div>

      <div className="header">
        <LogoArtRoomDefinitivo2 className="logo-instance" />
        <div className="navbar-grupo">
          <div className="rectangle-13"></div>
          <div className="search">Search</div>
          <img className="vector" src="vector0.svg" alt="Buscar" />
        </div>
        <img className="carrito" src="carrito0.png" alt="Carrito" />

        <div className="sign-up-grupo">
          <div className="rectangle-12"></div>
          <div className="sign-up">Sign Up</div>
          <img className="image-5" src="image-50.png" alt="Sign up" />
        </div>

        <div className="sign-in-grupo">
          <div className="rectangle-142"></div>
          <div className="sign-in">Sign In</div>
          <img className="image-6" src="image-60.png" alt="Sign in" />
        </div>
      </div>

      <img className="image-10" src="image-100.png" alt="Decoración" />
    </div>
  );
};

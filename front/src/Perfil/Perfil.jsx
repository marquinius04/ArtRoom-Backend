import "./Perfil.css";
import { LogoArtRoomDefinitivo2 } from "../LogoArtRoomDefinitivo2/LogoArtRoomDefinitivo2.jsx";
import { SignUpButton } from "../SignUpButton/SignUpButton.jsx";
import { SignInButton } from "../SignInButton/SignInButton.jsx";
import { SkillIconsInstagram } from "../SkillIconsInstagram/SkillIconsInstagram.jsx";
import { LogosYoutubeIcon } from "../LogosYoutubeIcon/LogosYoutubeIcon.jsx";
import { DeviconTwitter } from "../DeviconTwitter/DeviconTwitter.jsx";
import { useNavigate } from "react-router-dom";

export const Perfil = ({ className, ...props }) => {

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login"); // Redirige a la página de Login
  };

  const handleSignUpClick = () => {
    navigate("/signUp"); // Redirige a la página de Registro
  };

  return (
    <div className={`background`}>
      <div className="header">
        <LogoArtRoomDefinitivo2/>
        <div className="search-container">
          <img src="vector0.svg" alt="Search Icon" className="search-icon" />
          <span className="search-text">Search</span>
        </div>
        <div className="auth-buttons">
          <SignUpButton
            className="sign-up-button" 
            onClick={handleSignUpClick}
          />
          <SignInButton
            className="sign-in-button"
            onClick={handleSignInClick}
          />
        </div>
      </div>

      <div className="dashboard-usuario">
        
        <div className="dashboard-izq">
          <div className="dashboard-perfil">
            <img src="user-icon.png"></img>
            <div className="divisory-line"></div>
            <a href="/my-assets">My Assets</a>
              // Grid de 3 assets
          </div>
          <div className="dashboard-historial">
            // Recently downloaded (se debe de poder entrar a la sección de todos los descargados en un futuro)
              // Grid de 3 assets
          </div>
        </div>

        <div className="dashboard-dcha">
          <div className="dashboard-perfil"></div>
          <button className="button">Change password</button>
          <button className="button">Add social networks</button>
          <button className="button">Delete account</button>
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
    // <div className={"dashboard-de-usuario " + className}>
    //   <div className="rectangle-15"></div>
    //   <div className="rectangle-17"></div>
    //   <LogoArtRoomDefinitivo2 className="logo-art-room-definitivo-2-instance"></LogoArtRoomDefinitivo2>
    //   <div className="search">Search </div>
    //   <img className="image-24" src="image-240.png" />
    //   <img className="image-25" src="image-250.png" />
    //   <div className="fondo-ventana-emergente"></div>
    //   <img className="image-26" src="image-260.png" />
    //   <div className="line-3"></div>
    //   <div className="username">Username </div>
    //   <div className="my-assets">My assets </div>
    //   <div className="fondo-ventana-emergente2"></div>
    //   <div className="fondo-ventana-emergente3"></div>
    //   <div className="frame-4">
    //     <div className="fondo-ventana-emergente4"></div>
    //     <div className="plankton-3-d-model">
    //       Plankton 3D Model
    //       <br />
    //       <br />{" "}
    //     </div>
    //     <img className="image-9" src="image-90.png" />
    //     <div className="frame-11">
    //       <div className="_13">13 </div>
    //       <img className="image-36" src="image-360.png" />
    //       <div className="_614">614 </div>
    //       <img className="ojo-abierto-1-2" src="ojo-abierto-1-20.png" />
    //     </div>
    //   </div>
    //   <div className="frame-112">
    //     <div className="_13">13 </div>
    //     <img className="image-36" src="image-361.png" />
    //     <div className="_614">614 </div>
    //     <img className="ojo-abierto-1-2" src="ojo-abierto-1-21.png" />
    //   </div>
    //   <div className="frame-113">
    //     <div className="_13">13 </div>
    //     <img className="image-36" src="image-362.png" />
    //     <div className="_614">614 </div>
    //     <img className="ojo-abierto-1-2" src="ojo-abierto-1-22.png" />
    //   </div>
    //   <div className="desert-kingdom">Desert Kingdom </div>
    //   <img className="image-242" src="image-241.png" />
    //   <div className="modular-ancient-temple">Modular Ancient Temple </div>
    //   <img className="image-252" src="image-251.png" />
    //   <div className="fondo-ventana-emergente5"></div>
    //   <div className="recently-downloaded">Recently downloaded </div>
    //   <img className="vector" src="vector0.svg" />
    //   <div className="frame-17">
    //     <div className="fondo-ventana-emergente4"></div>
    //     <div className="frame-11">
    //       <div className="_13">13 </div>
    //       <img className="image-36" src="image-363.png" />
    //       <div className="_614">614 </div>
    //       <img className="ojo-abierto-1-2" src="ojo-abierto-1-23.png" />
    //     </div>
    //     <div className="lumina-gi-2024">Lumina GI 2024 </div>
    //     <img className="image-362" src="image-364.png" />
    //   </div>
    //   <div className="frame-18">
    //     <div className="fondo-ventana-emergente4"></div>
    //     <div className="frame-11">
    //       <div className="_13">13 </div>
    //       <img className="image-36" src="image-365.png" />
    //       <div className="_614">614 </div>
    //       <img className="ojo-abierto-1-2" src="ojo-abierto-1-24.png" />
    //     </div>
    //   </div>
    //   <div className="frame-19">
    //     <div className="fondo-ventana-emergente4"></div>
    //     <div className="frame-11">
    //       <div className="_13">13 </div>
    //       <img className="image-36" src="image-366.png" />
    //       <div className="_614">614 </div>
    //       <img className="ojo-abierto-1-2" src="ojo-abierto-1-25.png" />
    //     </div>
    //   </div>
    //   <img className="image-363" src="image-367.png" />
    //   <div className="coast-and-dunes">Coast and Dunes </div>
    //   <div className="fps-animation-ultimate">FPS Animation Ultimate </div>
    //   <img className="image-37" src="image-370.png" />
    //   <div className="frame-16">
    //     <div className="fondo-ventana-emergente6"></div>
    //     <div className="settings">Settings </div>
    //     <div className="frame-20">
    //       <div className="frame-6"></div>
    //       <div className="change-password">Change password </div>
    //     </div>
    //     <div className="frame-21">
    //       <div className="frame-5"></div>
    //       <div className="add-your-social-networks">
    //         Add your social networks{" "}
    //       </div>
    //     </div>
    //     <div className="frame-22">
    //       <div className="frame-7"></div>
    //       <div className="delete-account">Delete account </div>
    //     </div>
    //   </div>
    // </div>
  );
};

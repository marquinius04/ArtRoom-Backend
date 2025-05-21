import "./SubirAssets.css";
import { LogoArtRoomDefinitivo2 } from "../LogoArtRoomDefinitivo2/LogoArtRoomDefinitivo2.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const subirArchivoDropbox = async (file) => {
  const formData = new FormData();
  formData.append("archivo", file);  // 'archivo' porque multer espera ese nombre

  const response = await fetch("http://localhost:5000/api/assets/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  // data tiene { url: publicUrl } desde el backend
  // No tienes fileName en la respuesta, puedes obtenerlo del file.name
  return { url: data.url, fileName: file.name };
};


export const SubirAssets = ({ className, ...props }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tags, setTags] = useState([]); // Estado para almacenar las tags
  const [newTag, setNewTag] = useState(""); // Estado para la nueva tag que se va a agregar
  const [uploadedFile, setUploadedFile] = useState(null); // Estado para almacenar la URL del archivo subido
  const [uploadedFileName, setUploadedFileName] = useState(""); // Estado para almacenar el nombre del archivo subido
  const [thumbnailFile, setThumbnailFile] = useState(null); // Estado para almacenar la URL del thumbnail
  const [thumbnailFileName, setThumbnailFileName] = useState(""); // Estado para almacenar el nombre del thumbnail
  const [categories, setCategories] = useState([]); // Nuevo estado para categorías desde el backend

const handleUpload = async () => {
  const userRaw = localStorage.getItem("user");
  let user;
  
  try {
    user = JSON.parse(userRaw); // asegúrate de que es un objeto
  } catch (error) {
    console.error("Error al parsear el usuario:", error);
    alert("Error al obtener la sesión del usuario.");
    return;
  }

  if (!user || !user._id || !uploadedFile || !thumbnailFile) {
    alert("Debes subir archivo, thumbnail y estar logueado.");
    return;
  }

  const assetData = {
    titulo,
    descripcion,
    archivoUrl: uploadedFile,
    thumbnailUrl: thumbnailFile,
    tags,
    usuarioId: user._id, // Aquí se incluye correctamente
  };

  try {
    const response = await fetch("http://localhost:5000/api/recursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assetData),
    });

    const data = await response.json();
    if (data.success) {
      alert("¡Asset registrado correctamente!");
      navigate("/");
    } else {
      console.error("Respuesta inesperada del backend:", data);
      alert("Error al registrar asset.");
    }
  } catch (error) {
    console.error("Error al enviar asset:", error);
    alert("Error de red al registrar asset.");
  }
};


const handleThumbnailUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const result = await subirArchivoDropbox(file);
    setThumbnailFile(result.url);
    setThumbnailFileName(result.fileName);
    console.log("Thumbnail subido:", result.url);
  }
};

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const result = await subirArchivoDropbox(file);
    setUploadedFile(result.url);
    setUploadedFileName(result.fileName);
    console.log("Archivo subido a Dropbox:", result.url);
  }
};

  const availableCategories = categories.filter(
    (category) => !tags.includes(category)
  ); // Filtra las categorías que no están en las tags

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]); // Agrega la nueva tag al estado
      setNewTag(""); // Limpia el desplegable
    }
  };

  const handleInputChange = (e) => {
    setNewTag(e.target.value); // Actualiza el estado del desplegable
  };

  useEffect(() => {
    const userRaw = localStorage.getItem("user"); // Obtiene el usuario del localStorage
    let user;
    try{
      user = JSON.parse(userRaw);
    }catch(e){
      user=null;
    }
    setIsLoggedIn(!!user); // Actualiza el estado

    if (!user) {
      navigate("/"); // Redirige al inicio si no está logueado
      return;
    }

    fetch("http://localhost:5000/api/categorias")
      .then((res) => {
        console.log("Status:", res.status);
        return res.text(); // primero como texto
      })
      .then((text) => {
        console.log("Texto recibido:", text); // Verás si es HTML
        const json = JSON.parse(text); // intentar parsear si es JSON válido
        const nombres = json.map((cat) => cat.nombre_categoria);
        setCategories(nombres);
      })
      .catch((error) => {
        console.error("Error al cargar las categorías:", error);
      });
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
          <input type="text" className="search-text" placeholder="Search..." />
        </div>
        <div className="auth-buttons">
          <button className="upload-icon">
            <img src="https://www.dropbox.com/scl/fi/o4cednhkybd1ty8xsp5x7/upload-icon.png?rlkey=0ymn2yz9rqdpuyf2hd50hoa7o&st=0t6y1zo8&dl&raw=1"></img>
          </button>
          <button className="user-icon">
            <img src="https://www.dropbox.com/scl/fi/hfz5wn581d6rot1ccxuyh/user-icon.png?rlkey=hm75yyttqaw7hb8n5tk3ja3xq&st=rknzoa1v&dl&raw=1"></img>
          </button>
        </div>
      </div>

      <div className="subir-assets-container">
        <div className="div-izquierda">
          <div className="main-info">
            <div className="input-container">
              <label className="input-label">Title</label>
              <input
                type="text"
                className="input-field"
                placeholder="What is the name of your project?"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="input-label">Description</label>
              <input
                type="text"
                className="input-field"
                placeholder="Describe your project"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          </div>
          <div className="media-files">
            {uploadedFile ? (
              <>
                <p className="uploaded-file-name">{uploadedFileName}</p>
              </>
            ) : (
              <>
                <input
                  type="file"
                  id="media-upload"
                  className="file-input"
                  accept=".mp4, .png, .jpg, .jpeg, .obj, .fbx, .glb, .gltf, .blend"
                  onChange={(e) => handleFileUpload(e)}
                />
                <label htmlFor="media-upload" className="media-upload-label">
                  <img
                    src="https://www.dropbox.com/scl/fi/msdm8luh3afl9g9qwl96o/media-upload.png?rlkey=ws5ahcdoipiueocleyrqsyolj&st=n3k2l30l&raw=1"
                    alt="media upload icon"
                  />
                </label>
                <p>Add or drag any type of media file here</p>
              </>
            )}
          </div>
          <button className="button" onClick={handleUpload}>
            <img
              src="https://www.dropbox.com/scl/fi/vvz488011glv9otp4gtxa/upload-icon-alt.png?rlkey=5kyfsnfje3jcymlneko1wxmue&st=qz61etu6&raw=1"
              alt="upload alternative icon"
              className="upload-icon"
            />
            Upload
          </button>
        </div>
        <div className="div-derecha">
          <h1>Thumbnail</h1>
          <div className="media-rectangle">
            {thumbnailFile ? (
              <img
                src={thumbnailFile}
                alt="Uploaded thumbnail preview"
                className="uploaded-file-preview"
              />
            ) : (
              <>
                <input
                  type="file"
                  id="thumbnail-upload"
                  className="file-input"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleThumbnailUpload}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="media-upload-label"
                >
                  <img
                    src="https://www.dropbox.com/scl/fi/18y0fpk4tvf1rhxzt93gq/media-icon.svg?rlkey=wph40wpuhvkgxajjbd0441mxm&st=c2cuud3q&raw=1"
                    alt="media file icon"
                  />
                </label>
              </>
            )}
          </div>
          <button
            className="button"
            onClick={() => document.getElementById("thumbnail-upload")?.click()}
            aria-label="Upload a thumbnail image"
          >
            Upload photo
          </button>

          <h1>Tags</h1>
          <div className="tags-container">
            {tags?.map((tag, index) => (
              <div key={`${tag}-${index}`} className="tag">
                {tag}
                <button
                  className="remove-tag-button"
                  onClick={() => handleRemoveTag(index)}
                  aria-label={`Remove tag ${tag}`}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <div className="add-tag-container">
            <select
              className="add-tag-select"
              value={newTag}
              onChange={handleInputChange}
              aria-label="Select a category tag to add"
            >
              <option value="">Select a category...</option>
              {availableCategories?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              className="add-tag-button"
              onClick={handleAddTag}
              aria-label="Add selected tag"
            >
              <img
                src="https://www.dropbox.com/scl/fi/w9f8fad221ofvffhg9im6/add-tag-button.svg?rlkey=30vbxlaff4cnscrajjj8f0otk&st=wgrj2bef&raw=1"
                alt="add tag button"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

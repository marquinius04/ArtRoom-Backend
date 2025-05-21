const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // sin disco, solo en memoria

const { Dropbox } = require('dropbox');
const fetch = require('isomorphic-fetch');
const path = require('path');

// Función auxiliar
function convertirLinkADirecto(sharedUrl) {
  let url = sharedUrl
    .replace("www.dropbox.com", "dl.dropboxusercontent.com")
    .replace("dropbox.com", "dl.dropboxusercontent.com");

  if (url.includes('?')) {
    if (!url.includes('raw=1')) url += '&raw=1';
  } else {
    url += '?raw=1';
  }

  return url;
}

// POST /api/dropbox/upload
router.post('/upload', upload.single('archivo'), async (req, res) => {
  const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch });

  if (!req.file) {
    return res.status(400).json({ message: 'No se envió ningún archivo' });
  }

  const folderPath = '/recursos';
  let fileName = req.file.originalname;
  let filePath = `${folderPath}/${fileName}`;

  try {
    // Verificar si ya existe el archivo
    let exists = false;
    try {
      await dbx.filesGetMetadata({ path: filePath });
      exists = true;
    } catch (e) {
      if (e.status !== 409) throw e;
    }

    if (exists) {
      const timestamp = Date.now();
      const ext = path.extname(fileName);
      const base = path.basename(fileName, ext);
      fileName = `${base}_${timestamp}${ext}`;
      filePath = `${folderPath}/${fileName}`;
    }

    // Subir archivo
    const dropboxRes = await dbx.filesUpload({
      path: filePath,
      contents: req.file.buffer,
      mode: { '.tag': 'add' }
    });

    // Crear o reutilizar enlace
    let sharedUrl;
    const existingLinks = await dbx.sharingListSharedLinks({
      path: dropboxRes.result.path_lower,
      direct_only: true
    });

    if (existingLinks.result.links.length > 0) {
      sharedUrl = existingLinks.result.links[0].url;
    } else {
      const sharedLink = await dbx.sharingCreateSharedLinkWithSettings({
        path: dropboxRes.result.path_lower
      });
      sharedUrl = sharedLink.result.url;
    }

    const publicUrl = convertirLinkADirecto(sharedUrl);

    // Devuelve la URL final usable por el frontend
    res.status(200).json({ url: publicUrl, name: fileName });

  } catch (err) {
    console.error('Error al subir a Dropbox:', err);
    res.status(500).json({ message: 'Error al subir el archivo' });
  }
});

module.exports = router;

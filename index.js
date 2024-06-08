const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON and serve static files
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from 'uploads'

// Multer Configuration for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle File Uploads
app.post('/upload', upload.array('files', 10), (req, res) => {
    const version = req.body.version;
    const changes = req.body.changes;
    const fileLinks = req.files.map(file => ({
        filename: file.originalname,
        path: `/uploads/${file.originalname}`
    }));

    const versionInfo = {
        version,
        changes,
        files: fileLinks
    };

    fs.writeJson(`versions/version-${version}.json`, versionInfo, { spaces: 2 })
        .then(() => res.status(200).json({ message: 'Files uploaded and version info saved.' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Get Latest Version Info
app.get('/latest-version', (req, res) => {
    fs.readdir('versions', (err, files) => {
        if (err) return res.status(500).json({ error: err.message });

        const latestVersionFile = files.sort((a, b) => {
            const versionA = parseFloat(a.split('-')[1]);
            const versionB = parseFloat(b.split('-')[1]);
            return versionB - versionA;
        })[0];

        fs.readJson(`versions/${latestVersionFile}`)
            .then(versionInfo => res.status(200).json(versionInfo))
            .catch(err => res.status(500).json({ error: err.message }));
    });
});

// // Serve Files Dynamically
// app.get('/uploads/:filename', (req, res) => {
//   const filename = req.params.filename;
//   const filepath = path.join(__dirname, 'uploads', filename);

//   fs.access(filepath, fs.constants.F_OK, (err) => {
//     if (err) {
//       return res.status(404).send('File not found');
//     }
//     res.sendFile(filepath);
//   });
// });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

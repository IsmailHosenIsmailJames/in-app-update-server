const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Endpoint to handle form submissions
app.post('/upload', (req, res) => {
    const { version, changes, links } = req.body;

    const apkLinks = links.split('\n').map(link => link.trim()).filter(link => link);
    const data = {
        version,
        changes,
        apkLinks
    };

    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Server error: Unable to save data.');
        }
        res.send('Data successfully uploaded and saved.');
    });
});

// Endpoint to get the latest version info
app.get('/update-info', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Server error: Unable to read data.');
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

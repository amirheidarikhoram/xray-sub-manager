const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

const SUBS_FOLDER = `subs`

app.get('/hello', (req, res) => {
    res.send("hello")
});

app.get('/subs/:remark', (req, res) => {
    const id = req.header('Authorization');
    if (!id) {
        return res.status(401).send('Unauthorized');
    }

    const { remark } = req.params;
    const filePath = getFileName(remark, id)
    const fullFilePath = path.join(__dirname, SUBS_FOLDER, filePath);

    res.sendFile(fullFilePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).send('File not found');
            } else {
                res.status(500).send('Server error');
            }
        }
    });
});

function getFileName(remark, id) {
    return `${remark}_${id}`
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
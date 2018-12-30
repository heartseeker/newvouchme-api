const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');
const fs = require('fs');

// get current profile
router.get('/me', (req, res) => {
    res.send({ key: 'value' });
});


// Upload ids, billing info
router.post('/upload' , async function (req, res) {

    let fileData = [];
    let fileNames = [];

    const storage = multer.diskStorage({
        destination: 'public/uploads/',
        filename: function(req, file, cb) {
            fileData.push(file);
            const name = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
            fileNames.push(name);
            cb(null, name);
        }
    });

    const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        },
        limits: {
            fileSize: 1024 * 1024
        }
    }).any();

    upload(req, res, async (err) => {
        if (err) {
            res.status(400).send('Invalid request, ' + err); 
            return;
        } else {
            res.send({ status: 200, message: 'Uploaded sucessfully' });
        }
    });

})

module.exports = router;
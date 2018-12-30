const express = require('express');

let router = express.Router();


// Users API endpoints
// ==============================================
router.use('/users', require('./users'));

module.exports = router;
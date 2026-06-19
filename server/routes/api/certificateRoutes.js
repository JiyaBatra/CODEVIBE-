const express = require('express');
const router = express.Router();

const certificatecontroller = require('../../controller/certificate/certificatecontroller');
const verifyToken = require('../../middleware/authMiddleware');

router.post('/', verifyToken, certificatecontroller.getCertificateInfo);

module.exports = router;

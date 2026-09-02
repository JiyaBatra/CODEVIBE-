const express = require('express');
const router = express.Router();

const certificatecontroller = require('../../controller/certificate/certificatecontroller');

router.post('/', certificatecontroller.getCertificateInfo);

module.exports = router;

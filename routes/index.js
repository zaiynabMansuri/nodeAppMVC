/**
 * index.js
 * @description :: index route of platforms
 */

const express = require('express');
const router =  express.Router();

router.use(require('./admin/index'));
router.use(require('./device/index'));

module.exports = router;
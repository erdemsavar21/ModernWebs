const express = require('express');
const router = express.Router();
const blog_controller = require('./blog_controller');

router.use('/',blog_controller);
router.use('/blog',blog_controller);

module.exports = router;
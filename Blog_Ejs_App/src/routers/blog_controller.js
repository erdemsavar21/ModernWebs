const router = require('express').Router();
const {getAllArticles} = require('../controllers/blog_controller');

router.get('/',getAllArticles);

module.exports = router;
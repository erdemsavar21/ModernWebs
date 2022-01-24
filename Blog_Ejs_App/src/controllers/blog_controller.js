const axios = require('axios');
const asyncErrorWrapper = require("express-async-handler");


const getAllArticles = asyncErrorWrapper( async (req, res) => {
    
    const response = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts');
    
    res.render('blog_index',{articles: response.data });
});

module.exports = { getAllArticles };
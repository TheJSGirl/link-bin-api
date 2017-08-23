const mainRoutes = require('express').Router();
const bookmarkRoutes = require('./bookmarkRoutes');


mainRoutes.use('/bookmarks', bookmarkRoutes);

module.exports = mainRoutes;
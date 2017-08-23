const bookMarkRoutes = require('express').Router();
const sequelize = require('../../db/db');
const Bookmark = require('../../models/Bookmark');

bookMarkRoutes.route('/')
    .get((req, res) =>{

    })
    .post((req, res) => {
      // TODO data will come from user

      const newBookmark = Bookmark.build({
        name: 'Facebook',
        link: 'https://facebook.com',
        created_at: new Date().toDateString() 
      }); 

      Bookmark.sync({force: false})
      .then(() => {
        newBookmark.save()
        .then((data) => {
          // data saved successfully, send response to user
          res.status(200).json({
            data,
            status: 'ok',
            message: 'saved bookmark',
            errCode: null
          });
          console.log(data);
        })
        .catch((err) => {
          res.status(503).json({
            data: [],
            status: 'failed',
            messsage: 'database error',
            errCode: 503
          });
          console.log(err)
        });
      })
      .catch(err => console.log(err));
    });

module.exports = bookMarkRoutes;
const bookMarkRoutes = require('express').Router();
const sequelize = require('../../db/db');
const Bookmark = require('../../models/Bookmark');
const {verifyLink} = require('../../helpers');



bookMarkRoutes.route('/')
    .get((req, res) =>{
      Bookmark.findAll()
        .then((data) => {
          res.status(200).json({
            data,
            status:'ok',
            message: 'all the bookmarks',
            errCode: null
          });
        })
        .catch((err) => {
          res.status(503).json({
            data:[],
            status: 'failed',
            message: 'service unavailable',
            errCode: 503
          })
        });

    })
    .post((req, res) => {
      // TODO data will come from user

      const name = req.body.name;
      const link = req.body.link;

      // server side validation for arguments

      if(name.length < 3 || name.length > 50) {
        return res.status(422).json({
          data: [],
          status: 'failed',
          message: 'invalid name sent, it should be 3-50 chars long',
          errCode: 422
        });
      }

      /**
       * check if the link received from user is a valid link or not
       */
      if(!verifyLink(link)){
        // similar to verifyLink(link) === false
        return res.status(422).json({
          data: [],
          status: 'failed',
          message: 'invalid link sent',
          errCode: 422
        });
      }

      const newBookmark = Bookmark.build({
        name,
        link,
        // time will always generated by the server
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
          //console.log(data);
        })
        .catch((err) => {
          res.status(503).json({
            data: [],
            status: 'failed',
            messsage: 'service unavailable',
            errCode: 503
          });
          console.log(err)
        });
      })
      .catch(err => console.log(err));
    });

module.exports = bookMarkRoutes;
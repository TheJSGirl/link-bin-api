const bookMarkRoutes = require('express').Router();
const sequelize = require('../../db/db');
const Bookmark = require('../../models/Bookmark');
const {verifyLink, sendResponse} = require('../../helpers');



bookMarkRoutes.route('/')
    .get((req, res) =>{
      Bookmark.findAll()
        .then((data) => {
          return sendResponse(res, data, 'ok', 'all the bookmarks', 200);
         
        })
        .catch((err) => {
          console.log(err);
          return sendResponse(res, [], 'failed', 'service unavailable', 503);
         
        });
      })
    .post((req, res) => {
      // TODO data will come from user

      // console.log(req.body);

      const name = req.body.name;
      const link = req.body.link;

      // server side validation for arguments

      if( name === undefined || link === undefined ){
        return sendResponse(res, [], 'failed', 'missing parameters', 422);
      }

      if(name.length < 3 || name.length > 50) {
        return sendResponse(res, [], 'failed', 'invalid name sent, it should be 3-50 chars long', 422);
      }

      /**
       * check if the link received from user is a valid link or not
       */
      if(!verifyLink(link)){
        // similar to verifyLink(link) === false
        return sendResponse(res, [], 'failed', 'invalid link sent', 422);
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
          return sendResponse(res, data, 'ok', 'saved bookmark', 200);
          //console.log(data);
        })
        .catch((err) => {
          console.log(err); 
          
          if(err.original.code === 'ER_DUP_ENTRY'){
            return sendResponse(res, null, 'failed', 'duplicate data', 409);
          }

          return sendResponse(res, null, 'failed', 'service unavailable', 503);
      
        });
      })
      .catch(err => console.log(err));
    });


bookMarkRoutes.route('/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)) {
      console.log(id);
      return (res, null, 'failed', 'invalid id', 422);
      // return res.status(422).json({
      //   data: [],
      //   status: 'failed',
      //   messsage: 'invalid id sent',
      //   errCode: 422
      // });
    }
    Bookmark.findAll({
      where: {
        id: id
      }
    })
    .then((data) => {
      //console.log('data = ',data);
      if(data.length < 1){
        //id not available in bookmark table 
        // so the length of data will be less than 1 or == 0
       // now we'll return the user a message that data not found  
        return sendResponse (res, null, 'failed', 'data not found', 404);
      }
      return sendResponse (res, data, 'ok', 'found data', 200);
    })
    .catch((err) => {
      console.log(err);
      return sendResponse(res, [], 'failed', 'service unavailable', 503);
    });
  })
  .delete((req, res) => {
    let _id = parseInt(req.params.id);

    if(isNaN(_id)){
      return sendResponse(res, null, 'failed', 'invalid id', 422);
    }

    Bookmark.destroy({
      where: {
        id: _id
      }
    })
    .then((data) => {
      return sendResponse(res, null, 'ok', 'deleted sucessfully', 200);
    })
    .catch((err) => {
      console.error(err);
      return sendResponse(res, null, 'failed', 'service unavailable', 503 );
    });
  })
  .patch((req, res) => {
    console.log(req.body);
    console.log(req.params);
  
    const id   = parseInt(req.params.id);
    const name = req.body.name;
    const link = req.body.link;
    if(!name && !link ){
      return sendResponse(res, null, 'failed', 'missing parameter', 422);
    }
    const updateList = {};

    if(isNaN(id)){
      return sendResponse(res, null, 'failed', 'invalid id', 422);
    }

    if(name){
      updateList.name = name;
    }

    if (link) {
      updateList.link = link;
    }

    Bookmark.update(
      updateList,
      {
      where: {
        id: id
      }
    })
    .then((data) => {
      return sendResponse(res, data, 'ok', 'updated', 200);
    })
    .catch((err) => {
      console.error('**Error => ', err);

      if(err.original.code === 'ER_DUP_ENTRY'){
        return sendResponse(res, null, 'failed', 'duplicate data', 409);
      }

      //its nt wrking
      return sendResponse(res, null, 'failed', 'service unavailable', 503);
    });
  });


module.exports = bookMarkRoutes;
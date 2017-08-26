module.exports = {
  verifyLink: (link) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(link);
  },
  /**
   *  Function : sendResponse()
   * @param {object} res : the response object of route
   * @param {array} data : the data array from mysql by Sequelize
   */
  sendResponse: (res, data = [], status, message, code) => {
    let errCode = code;

    if(status === 'ok'){
      errCode = null;
    }
   
    return res.status(code).json({
      data,
      status,
      message,
      errCode
    });
  }
}



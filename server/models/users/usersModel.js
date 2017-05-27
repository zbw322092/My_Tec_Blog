var mysql = require('mysql');
var db = require('../../database.js');

module.exports = {
  register: function(req, res) {
    console.log(req.body);
    var createdAt = new Date();
    var users = {
      "id": null,
      "name": req.body.name,
      "email": req.body.email,
      "phone": req.body.phone,
      "password":req.body.password,
      "created_at":createdAt,
      "updated_at": null
    };

    db.query('INSERT INTO users SET ?', users, function(error, results, fields) {
      if (error) {
        return res.json({
          message:'there are some error with query'
        });
      }

      res
        .status(200)
        .json({
          message: 'Create user successfully',
          data: {}
        });

    });

  }


};
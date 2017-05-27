var mysql = require('mysql');
var bcrypt = require('bcrypt');
var db = require('../../database.js');
var SaltRound = 10;

module.exports = {
  register: function(req, res) {
    console.log(req.body);
    bcrypt.genSalt(SaltRound, function(err, salt) {
      if (err) {
        return console.log('generate salt error: ', err)
      }
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          return console.log('generate hash error: ', err)
        }        
        var createdAt = new Date();
        var users = {
          "id": null,
          "name": req.body.name,
          "email": req.body.email,
          "phone": req.body.phone,
          "password": hash,
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
      });
    });
  }


};
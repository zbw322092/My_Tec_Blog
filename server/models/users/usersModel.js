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
        db.query(
        'INSERT INTO users SET ?',
        [users], 
        function(error, results, fields) {
          if (error) {
            console.log(error);
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
  },

  login: function(req, res) {
    db.query('SELECT name, email, password FROM users WHERE ? = email',
    [req.body.email],
    function(error, results, fields) {
      if (error) {
        return res
          .status(500)
          .json({
            message: 'login error'
          });
      }
      console.log(results);
      if (results.length > 1) {
        res
          .status(500)
          .json({
            message: 'get user data error'
          });
      } else if(results.length === 0) {
        res
          .status(500)
          .json({
            message: 'user not exist'
          });
      } else {
        matchPassword(req.body.password, results[0].password);
      }

      function matchPassword(password, hash) {
        bcrypt.compare(password, hash, function(err, matched) {
          if (err) {
            return res
              .status(500)
              .json({
                message: 'compare error'
              });
          }

          if (matched) {
            return res
              .status(200)
              .json({
                message: 'login successfully'
              });
          } else {
            return res
              .status(200)
              .json({
                message: 'login failed'
              });
          }
        });
      }
    });
  },

  userExist: function(req, res) {
    db.query('SELECT count(email) FROM users WHERE email = ?',
    [req.body.email],
    function(error, results, fields) {
      if (error) {
        return res.status(500).json({ mesaage: 'query failed' });
      }
      console.log(results[0]['count(email)']);
      if (results[0]['count(email)'] > 0) {
        res.status(200).json({ message: 'email has been taken' });
      } else if (results[0]['count(email)'] === 0) {
        res.status(200).json({ message: 'email is ok' });
      }
    });
  }


};
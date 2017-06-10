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
        matchPassword(req.body.password, results[0]);
      }

      function matchPassword(password, user) {
        bcrypt.compare(password, user.password, function(err, matched) {
          if (err) {
            return res
              .status(500)
              .json({
                message: 'compare error'
              });
          }

          if (matched) {
            // when user login success, set the key to redis
            delete user.password;
            req.session.key = user;
            return res
              .status(200)
              .json({
                code: '0000',
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

  logout: function(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        return res
        .status(500)
        .json({
          code: '0000',
          message: 'logout failed'
        });
      }

      res.status(200).json({ message: 'logout success' });
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
  },

  loginRequired: function(req, res, next) {
    var user = req.session.key;
    if (!user) {
      return res
        .status(200)
        .json({
          message: 'login required',
          code: '0001'
        });
    }
    next();
  },

  basicInfo: function(req, res, next) {
    var email = req.session.key['email'];
    var name = req.session.key['name'];
    var size = Number(req.query.size);
    var page = Number(req.query.page);
    var offset = page * size - 2;

    var sql = 'SELECT SQL_CALC_FOUND_ROWS blogs.post_id, blogs.post_title, LEFT(blog_body.post_content, 200) AS post_content_excerpt, blogs.created, blogs.modified, blogs.tags ' +
    'FROM blogs INNER JOIN blog_body ON blogs.post_id = blog_body.post_id AND blogs.author = ? LIMIT ?,?;';
    var inserts = [name,offset,size];
    sql = mysql.format(sql, inserts);
    console.log(sql);

    db.query(sql, function(errors, results, fields) {
      if (errors) {
        console.log(errors);
        return res.status(500).json({ mesaage: 'query failed' });
      }
      var postsResult = results;

      db.query('SELECT FOUND_ROWS() AS postAmount;', function(errors, results, fields) {
        if (errors) {
          console.log(errors);
          return res.status(500).json({ mesaage: 'query failed' });
        }

        // number of posts which will be return without LIMIT clause
        var postAmount = results[0].postAmount;

        res.status(200)
          .json({
            message: 'success',
            code: '0000',
            data: {
              username: name,
              postAmount: postAmount,
              posts: postsResult
            }
          });


      });
    });

  }


};
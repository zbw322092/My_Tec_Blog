var mysql = require('mysql');
var db = require('../../database');

module.exports = {
  createPost: function(req, res) {
    db.beginTransaction(function(err) {
      if (err) { throw err; }
      var createTimestamp = 'TB'+ + new Date();
      console.log('createTimestamp: ', createTimestamp);
      db.query(
        'INSERT INTO blogs VALUES(?, ?, ?, NOW(), null)',
        [createTimestamp, req.body.author, req.body.postTitle],
        function(error, results, fields) {
          // if error happens, execute rollback
          if (error) {
            return db.rollback(function() {
              throw error;
            });
          }

          // if first query success, execute second query
          db.query(
            'INSERT INTO blog_body VALUES(?, ?)',
            [createTimestamp, req.body.content],
            function(error, results, fields) {
              // error and the rollback
              if (error) {
                return db.rollback(function() {
                  throw error;
                });
              }

              // commit
              db.commit(function(err) {
                // error and rollback
                if (err) {
                  return db.rollback(function() {
                    throw err;
                  });
                }

                console.log('create post success!');
                res
                  .status(200)
                  .json({message: 'success'});
              });

            }
          );

        }
      );
    });
  },

  getAllPost: function(req, res) {
    var sql = "SELECT *, DATE_FORMAT(created, '%Y-%m-%d') AS created FROM blogs LEFT JOIN blog_body ON blogs.post_id = blog_body.post_id";
    sql = mysql.format(sql);
    db.query(sql, function(error, results, fields) {
      if (error) {
        return res
          .status(500)
          .json({
            message: 'get post error'
          })
      }
      
      results.forEach(function(value, key, array) {
        console.log('Post: ', value);
        console.log('Post author: ', value.author);
      });

      res
        .status(200)
        .json({
          message: 'success',
          data: results
        });
    });
  }

}
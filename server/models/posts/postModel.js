var mysql = require('mysql');
var db = require('../../database');

module.exports = {
  createPost: function(req, res) {
    db.beginTransaction(function(err) {
      if (err) { throw err; }
      var createTimestamp = 'TB'+ + new Date();
      var author = req.session.key['name'];
      db.query(
        'INSERT INTO blogs VALUES(?, ?, ?, NOW(), null, ?)',
        [createTimestamp, author, req.body.postTitle, req.body.tags],
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
                return res
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

      return res
        .status(200)
        .json({
          message: 'success',
          data: results
        });
    });
  },

  getOnePost: function(req, res) {
    var post_id = req.params.id;
    var sql = "SELECT * FROM blogs INNER JOIN blog_body ON blogs.post_id = ? AND blogs.post_id = blog_body.post_id";
    var insert = [post_id];
    var sql = mysql.format(sql, insert);

    db.query(sql, function(error, results, fields) {
      if (error) {
        return res
          .status(500)
          .json({
            message: 'get post error'
          })
      }

      return res
        .status(200)
        .json({
          code: '0000',
          message: 'success',
          data: results
        });
    });
  },

  updateOnePost: function(req, res) {
    var postId = req.query.postId;
    var modified = new Date();
    var sql = "UPDATE blogs, blog_body SET blogs.post_title = ?, blogs.modified = ?, blogs.tags = ? ," +
    "blog_body.post_content = ? WHERE blogs.post_id = blog_body.post_id AND blog_body.post_id = '" + postId + "';";
    var inserts = [req.body.postTitle, modified, req.body.tags, req.body.postContent];
    sql = mysql.format(sql, inserts);

    db.query(sql, function(error, results, fields) {

      if (error) {
        console.log('error: ', error);
        return res
          .status(500)
          .json({
            message: 'update post error'
          })
      }

      return res
        .status(200)
        .json({
          code: '0000',
          message: 'update post successfully'
        });
    });
  }

}
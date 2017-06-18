var mysql = require('mysql');
var db = require('../../database');
var async = require('async');

module.exports = {
  createPost: function (req, res) {
    var createTimestamp = 'TB' + + new Date();
    var author = req.session.key['name'];

    function queryOne(next) {
      db
        .beginTransaction(function (err) {
          if (err) {
            throw err;
          }

          db.query('INSERT INTO blogs VALUES(?, ?, ?, NOW(), null, ?)', [
            createTimestamp, author, req.body.postTitle, req.body.tags
          ], function (error, results, fields) {
            // if error happens, execute rollback
            if (error) {
              return db.rollback(function () {
                throw error;
              });
            }

            next();
          })
        })
    }

    function queryTwo(next) {
      // if first query success, execute second query
      db
        .query('INSERT INTO blog_body VALUES(?, ?)', [
          createTimestamp, req.body.content
        ], function (error, results, fields) {
          // error and the rollback
          if (error) {
            return db.rollback(function () {
              throw error;
            });
          }

          next();
        })
    }

    function queryThree(next) {
      db
        .commit(function (err, results) {
          // error and rollback
          if (err) {
            return db.rollback(function () {
              throw err;
            });
          }
          next(null, results);
        });
    }

    function resFunc(err, results) {
      if (err) {
        console.log(err);
        res.status(500)
          .json({
            message: 'create post error'
          });
      }
      console.log('create post success!');
      return res
        .status(200)
        .json({ message: 'success' });
    }

    async.waterfall([
      queryOne,
      queryTwo,
      queryThree
    ], resFunc);
  },

  getAllPost: function (req, res) {
    var sql = "SELECT *, blogs.post_id, DATE_FORMAT(created, '%Y-%m-%d') AS created, COALESCE(post_count.like_times, 0) AS like_times FROM blogs JOIN " +
      "blog_body ON blogs.post_id = blog_body.post_id LEFT JOIN post_count ON blogs.post_id = post_count.post_id";
    sql = mysql.format(sql);
    db.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'get post error' })
      }

      return res
        .status(200)
        .json({ message: 'success', data: results });
    });
  },

  getOnePost: function (req, res) {
    var post_id = req.params.id;
    var sql = "SELECT * FROM blogs INNER JOIN blog_body ON blogs.post_id = ? AND blogs.post_id " +
      "= blog_body.post_id";
    var insert = [post_id];
    var sql = mysql.format(sql, insert);

    db.query(sql, function (error, results, fields) {
      if (error) {
        return res
          .status(500)
          .json({ message: 'get post error' })
      }

      return res
        .status(200)
        .json({ code: '0000', message: 'success', data: results });
    });
  },

  updateOnePost: function (req, res) {
    var postId = req.query.postId;
    var modified = new Date();
    var sql = "UPDATE blogs, blog_body SET blogs.post_title = ?, blogs.modified = ?, blogs.tags" +
      " = ? ,blog_body.post_content = ? WHERE blogs.post_id = blog_body.post_id AND blo" +
      "g_body.post_id = '" + postId + "';";
    var inserts = [req.body.postTitle, modified, req.body.tags, req.body.postContent];
    sql = mysql.format(sql, inserts);

    db.query(sql, function (error, results, fields) {

      if (error) {
        console.log('error: ', error);
        return res
          .status(500)
          .json({ message: 'update post error' })
      }

      return res
        .status(200)
        .json({ code: '0000', message: 'update post successfully' });
    });
  },

  deleteOnePost: function (req, res) {
    var postId = req.query.postId;
    var sql = "DELETE blogs, blog_body FROM blogs INNER JOIN blog_body WHERE blogs.post_id = bl" +
      "og_body.post_id AND blogs.post_id = ?;";
    var inserts = [postId];
    sql = mysql.format(sql, inserts);

    db.query(sql, function (error, results, fields) {

      if (error) {
        console.log('error: ', error);
        return res
          .status(500)
          .json({ message: 'delete post error' })
      }

      return res
        .status(200)
        .json({ code: '0000', message: 'delete post successfully' });
    });
  },

  likePost: function (req, res) {
    var post_id = req.body.post_id;
    var liked_userid = req.session.key['id'];

    function queryOne(next) {
      var sql = 'INSERT INTO post_likes (post_id,liked_userid,created,status) VALUES(?,?,NOW(),?)' +
        ' ON DUPLICATE KEY UPDATE status = ?';
      var inserts = [post_id, liked_userid, '1', '1'];
      sql = mysql.format(sql, inserts);

      db.query(sql, function (error, results, fields) {

        if (error) {
          console.log('error: ', error);
          return res
            .status(500)
            .json({ message: 'like post error' })
        }

        next();
      })
    }

    function queryTwo(next) {
      var sql = "INSERT INTO post_count (post_id, like_times) VALUES (?,?) " +
        "ON DUPLICATE KEY UPDATE like_times = like_times + 1";
      var inserts = [post_id, 1];
      sql = mysql.format(sql, inserts);

      db.query(sql, function (error, results, fields) {
        if (error) {
          console.log('error: ', error);
          return res
            .status(500)
            .json({ message: 'count post error' })
        }

        next();
      })
    }

    function queryThree(next) {
      var sql = "SELECT like_times FROM post_count WHERE post_id = ?";
      var inserts = [post_id];
      sql = mysql.format(sql, inserts);
      db.query(sql, function (error, results, fields) {
        if (error) {
          console.log('error: ', error);
          return res
            .status(500)
            .json({ message: 'get post count error' })
        }

        next(null, results);
      });
    }

    function resFunc(err, results) {
      if (err) {
        console.log('error: ', err);
        return res
          .status(500)
          .json({ message: 'request error' });
      }

      return res
        .status(200)
        .json({
          code: '0000',
          message: 'like post successfully',
          data: results
        });
    }

    async.waterfall([
      queryOne,
      queryTwo,
      queryThree
    ], resFunc);

  },


  getLikes: function (req, res) {
    var userId = req.session.key['id'];
    var sql = "SELECT post_id FROM post_likes WHERE liked_userid = ? AND status = '1'";
    var inserts = [userId];
    sql = mysql.format(sql, inserts);
    db.query(sql, function (error, results, fields) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'query user data error' });
      }

      res.status(200)
        .json({
          code: '0000',
          message: 'success',
          data: results
        });
    });
  },

  unlikePost: function (req, res) {
    var post_id = req.body.post_id;
    var liked_userid = req.session.key['id'];
    var sql = 'UPDATE post_likes SET status = ? WHERE post_id = ? AND liked_userid = ?'
    var inserts = ['0', post_id, liked_userid];
    sql = mysql.format(sql, inserts);

    db.query(sql, function (error, results, fields) {

      if (error) {
        console.log('error: ', error);
        return res
          .status(500)
          .json({ message: 'unlike post error' })
      }


      var sql = "UPDATE post_count SET like_times = like_times-1 WHERE post_id = ?";
      var inserts = [post_id];
      sql = mysql.format(sql, inserts);

      db.query(sql, function (error, results, fields) {
        if (error) {
          console.log('error: ', error);
          return res
            .status(500)
            .json({ message: 'count post error' })
        }

        var sql = "SELECT like_times FROM post_count WHERE post_id = ?";
        var inserts = [post_id];
        sql = mysql.format(sql, inserts);
        db.query(sql, function (error, results, fields) {
          return res
            .status(200)
            .json({
              code: '0000',
              message: 'unlike post successfully',
              data: results
            });
        });
      });

    });
  },

  unlikePost: function (req, res) {
    var post_id = req.body.post_id;
    var liked_userid = req.session.key['id'];

    function queryOne(next) {
      var sql = 'UPDATE post_likes SET status = ? WHERE post_id = ? AND liked_userid = ?'
      var inserts = ['0', post_id, liked_userid];
      sql = mysql.format(sql, inserts);

      db.query(sql, function (error, results, fields) {

        if (error) {
          console.log('error: ', error);
          return res
            .status(500)
            .json({ message: 'unlike post error' })
        }

        next();
      });
    }

    function queryTwo(next) {
      var sql = "UPDATE post_count SET like_times = like_times-1 WHERE post_id = ?";
      var inserts = [post_id];
      sql = mysql.format(sql, inserts);

      db.query(sql, function (error, results, fields) {
        if (error) {
          console.log('error: ', error);
          return res
            .status(500)
            .json({ message: 'count post error' })
        }

        next();
      });
    }

    function queryThree(next) {
      var sql = "SELECT like_times FROM post_count WHERE post_id = ?";
      var inserts = [post_id];
      sql = mysql.format(sql, inserts);
      db.query(sql, function (error, results, fields) {
        if (error) {
          console.log('error: ', error);
          return res
            .status(500)
            .json({ message: 'get post count error' })
        }

        next(null, results);
      });
    }

    function resFunc(error, results) {
      if (error) {
        res.status(500)
          .json({
            message: "unlike post error"
          })
      }
      return res
        .status(200)
        .json({
          code: '0000',
          message: 'unlike post successfully',
          data: results
        });

    }

    async.waterfall([
      queryOne,
      queryTwo,
      queryThree
    ], resFunc);
  }
}
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
  }


}
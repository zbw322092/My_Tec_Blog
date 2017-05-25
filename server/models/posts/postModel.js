module.exports = {
  createPost: function(req) {
    var connection = req.getConnection;
    connection.beginTransaction(function(err) {
      if (err) { throw err; }
      var createTimestamp = 'TB'+ + new Date();
      connection.query(
        'INSERT INTO blogs VALUES(post_id = ?, author=?, post_title=?, NOW(), null)',
        [createTimestamp, req.body.author, req.body.postTitle],
        function(error, results, fields) {
          // if error happens, execute rollback
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }

          // if first query success, execute second query
          connection.query(
            'INSERT INTO blog_body VALUES(post_id = ?, post_content = ?)',
            [createTimestamp, req.body.author, req.body.content],
            function(error, results, fields) {
              // error and the rollback
              if (error) {
                return connection.rollback(function() {
                  throw error;
                });
              }
              
              // commit
              connection.commit(function(err) {
                // error and rollback
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }

                console.log('create post success!');
              });

            }
          );

        }
      );
    });
  }


}
const db = require('../database');

class Images {
  // static retrieveAll(callback) {
  //   db.query('SELECT city_name from cities', (err, res) => {
  //     if (err.error) {
  //       return callback(err);
  //     }
  //     callback(res);
  //   })
  // }

  static insert(url, user_id, author, callback) {
    db.query(`
    INSERT INTO images (url, user_id, author)
    VALUES ($1, $2, $3)`,
    [url, user_id, author], (err, res) => {
      if (err.error) {
        return callback(err);
      }
      callback(res);
    })
  }
}

module.exports = Images;
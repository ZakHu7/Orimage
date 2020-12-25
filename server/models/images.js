const db = require('../database');

class Images {
  static create(url, user_id, author, callback) {
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

  static getUserImages(user_id, callback) {
    db.query(
      `SELECT * from images
      WHERE user_id = $1
      ORDER BY created_on DESC`,
    [user_id], (err, res) => {
      if (err.error) {
        return callback(err);
      }
      callback(res);
    })
  }
}

module.exports = Images;
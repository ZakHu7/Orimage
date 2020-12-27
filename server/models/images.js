const db = require('../database');

class Images {
  static create(params, callback) {
    db.query(`
    INSERT INTO images (url, user_id, designed_by, folded_by, category, model, difficulty)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [params.url, params.user_id, params.designed_by,
      params.folded_by, params.category, params.model,
      params.difficulty], (err, res) => {
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
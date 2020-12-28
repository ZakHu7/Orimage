const db = require('../database');

class Images {
  static create(params, callback) {
    db.query(`
    INSERT INTO images (url, imageKey, user_id, designed_by, folded_by, category, model, difficulty)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [params.url, params.imageKey, params.user_id,
      params.designed_by, params.folded_by, params.category,
      params.model, params.difficulty], (err, res) => {
      if (err.error) {
        return callback(null, err);
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
        return callback(null, errerr);
      }
      callback(res);
    })
  }

  static getAllImages(lastDateTime, callback) {
    db.query(
      `SELECT * from images
      WHERE created_on < $1
      ORDER BY created_on DESC LIMIT 3`,
      [lastDateTime], (err, res) => {
      if (err.error) {
        return callback(null, err);
      }
      callback(res);
    })
  }

  static deleteImage(id, callback) {
    db.query(
      `DELETE FROM images
      WHERE id = $1;`,
      [id], (err, res) => {
      if (err.error) {
        return callback(null, err);
      }
      callback(res);
    })
  }
}

module.exports = Images;
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
        return callback(null, err.error);
      }
      callback(res);
    })
  }

  static getImageById(image_id, callback) {
    db.query(
      `SELECT * from images
      WHERE id = $1`,
    [image_id], (err, res) => {
      if (err.error) {
        return callback(null, err.error);
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

  static getFilteredImages(lastDateTime, filters, callback) {
    let filtersString = "";
    if (filters.designed_by !== undefined)
      filtersString += `AND LOWER(designed_by) = LOWER('${filters.designed_by}') `;
    if (filters.folded_by !== undefined)
      filtersString += `AND LOWER(folded_by) = LOWER('${filters.folded_by}') `;
    if (filters.category !== undefined)
      filtersString += `AND LOWER(category) = LOWER('${filters.category}') `;
    if (filters.model !== undefined)
      filtersString += `AND LOWER(model) = LOWER('${filters.model}') `;
    if (filters.difficulty !== undefined) {
      if (typeof filters.difficulty === "string") {
        filtersString += `AND LOWER(difficulty) = LOWER('${filters.difficulty}') `;
      } else {
        const difficultyArray = filters.difficulty.map(x => `LOWER('${x}')`)
        filtersString += `AND LOWER(difficulty) in (${difficultyArray}) `;
      }
    }
    lastDateTime = lastDateTime.replace("+","");

    const a = `SELECT * from images
    WHERE created_on < ${lastDateTime} 
    ${filtersString}
    ORDER BY created_on DESC LIMIT 3`;

    db.query(
      `SELECT * from images
      WHERE created_on < $1 
      ${filtersString}
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
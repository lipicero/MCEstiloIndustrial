var pool = require('./db');

async function getGaleria() {
  var query = 'select * from galeria order by id desc';
  var [rows] = await pool.query(query);
  return rows;
}
async function getGaleriaById(id) {
  var query = "select * from galeria where id = ?";
  var [rows] = await pool.query(query, [id]);
  return rows[0];
}

async function insertGaleria(obj) {
  try {
    var query = "insert into galeria set ?";
    var [rows] = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.error("Error inserting galeria:", error);
    throw error;
  }
}

async function modificarGaleriaById([obj, id]) {
  try {
    var query = "update galeria set ? where id=?";
    var [rows] = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteGaleriaById(id) {
  var query = "delete from galeria where id = ?";
  var [rows] = await pool.query(query, [id]);
  return rows;
}

module.exports = {
  getGaleria,
  getGaleriaById,
  insertGaleria,
  modificarGaleriaById,
  deleteGaleriaById
};

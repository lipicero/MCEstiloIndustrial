var pool = require('./db');
var bcrypt = require('bcrypt');

async function getUserByUsernameAndPassword(user, password) {
    try {
        var query = 'select * from users where usuario = ? limit 1';
        var [rows] = await pool.query(query, [user]);
        if (rows.length === 0) return null;
        var userData = rows[0];
        var isMatch = await bcrypt.compare(password, userData.password);
        return isMatch ? userData : null;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserByUsernameAndPassword
};
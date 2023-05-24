const mysql = require('mysql2');

const dbPool = mysql.createPool({
  host: '34.29.231.173',
  user: 'root',
  password: 'mysql',
  database: 'mahasiswa',
});

dbPool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Koneksi ke database terputus.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Terlalu banyak koneksi ke database.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Koneksi ke database ditolak.');
    }
    console.error('Error saat terhubung ke database:', err.message);
  } else {
    console.log('Berhasil terkoneksi ke database MySQL.');
    connection.release();
  }
});

module.exports = dbPool.promise();
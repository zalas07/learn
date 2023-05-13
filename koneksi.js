const express = require('express');
const mysql = require('mysql');
const app = express();

//buat koneksi database pada applikasi
const db =mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'bigdick',
    database : 'mahasiswa'
});

db.connect((err) =>{
    if(err) {
        console.log(err)
    }else{
        console.log('suscessfully connected to mysql!')
    }
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM <YOUR_TABLE_NAME>', (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  });

  module.exports = db;
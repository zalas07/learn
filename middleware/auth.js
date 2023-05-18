var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../rest')
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register

exports.registrasi = function(req, res){

    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE  ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table)

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query,post, function(eror, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("berhasil manambahkan data user baru",res);
                    }
                }) ;
            }else{
                response.ok("Email Sudah Terdaftar!",res);
            }
        }
    });
}
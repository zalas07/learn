var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../rest')
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
const { query } = require('express');

//controller untuk register

exports.registrasi = function (req, res) {

    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE  ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("berhasil manambahkan data user baru", res);
                    }
                });
            } else {
                response.ok("Email Sudah Terdaftar!", res);
            }
        }
    });
}


//controller untuk login
exports.login = function (req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }
    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            console.log(rows.length);
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440 //20 menit
                });
                id_user = rows[0].id;

                var data = {
                    id_user: id_user,
                    akses_token: token, // di ganti namanya dari access ke akses
                    ip_address: ip.address()
                }
                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            } else {
                res.json({ "Error": true, "Message": "Email atau password salah!" })
            }
        }
    });
}

exports.halamanlog = function (req, res) {
    response.ok("Halaman ini hanya untuk user terotorisasi", res);
}
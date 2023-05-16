'use strict';

var response = require('./rest');
var connection = require('./koneksi');

exports.index = function(req, res){
    response.ok("aplikasi REST API berjalan !", res)
};

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows ,fileds){
        if(error){
            connection.log(eror);
        }else{
            response.ok(rows, res)
        }
    });
};

//menampilkan semua data mahasiswa berdasarkan idnya

exports.tampilberdasarkanid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
    function(error, rows, fields){
        if(error){
            console.log(error)
        }else {
            response.ok(rows, res)
        }
    });
};

//menambahkan data mahasiswa
exports.tambahmahasiswa = function(req,res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
    [nim,nama,jurusan],
    function (error, rows, fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menmbahkan data!",res)
        }
    }); 

};
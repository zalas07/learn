'use strict';

var response = require('./rest');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("aplikasi REST API berjalan !", res)
};

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fileds) {
        if (error) {
            connection.log(eror);
        } else {
            response.ok(rows, res)
        }
    });
};

//menampilkan semua data mahasiswa berdasarkan idnya

exports.tampilberdasarkanid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        });
};

//menambahkan data mahasiswa
exports.tambahmahasiswa = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
        [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menmbahkan data!", res)
            }
        });

};

//mengubah data berdasarkan id
exports.editmahasiswa = function (req, res) {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=?', [nim, nama, jurusan],

        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Berhasil Mengubah data mahasiswa", res);
            }
        });
};

//menghapus data berdasarkan id

exports.hapusmahasiswa = function (req, res) {
    var id = req.body.id_mahasiswa;

    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?', [id],
        function (error, rows, field) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menghapus data", res)
            }
        });
}


//menampilkan matakulaih group

exports.tampilgroupmatkul = function(req, res) {
    connection.query('SELECT mahasiswa.id_mahasiswa,mahasiswa.nim,mahasiswa.nama,mahasiswa.jurusan,matakuliah.matakuliah,matakuliah.sks from KRS JOIN matakuliah JOIN mahasiswa WHERE krs.id_matkul =matakuliah.id_matkul AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function (error, rows, fields) {
            if(error) {
                console.log(error);

            } else {
                response.oknested(rows, res)
            }
        })
}
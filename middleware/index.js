var express = require('express');
var auth = require('./auth');
const verifikasi = require('./verifkasi');
var router = express.Router();
//var verifikasi = require('./verifikasi');

//daftarkan menu registrasi
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

//alamat yang perlu otorisasi

router.get('/api/v1/secret', verifikasi(), auth.halamanlog);

module.exports = router;
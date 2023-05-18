const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(roles) {
    return function (req, res, next) {
        var role = req.body.role;

        //cek authorization

        var tokenWithBarer = req.headers.authorization;
        if (tokenWithBarer) {
            var token = tokenWithBarer.split(' ')[1];

            //verifikasi
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return resizeTo.status(401).send({ auth: false, message: 'Token tidak terdaftar !' });

                } else {
                    if (roles == 2) {
                        req.auth = decoded;
                        next();
                    } else {
                        return res.status(401).send({ auth: false, message: 'Gagal mengotorisasi!' })

                    }
                }
            });
        } else {
            return resizeTo.status(401).send({ auth: false, message: 'Token tidak tersedia !' });
        }
    }
}
module.exports = verifikasi;
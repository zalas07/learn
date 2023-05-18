'use strict';

exports.ok = function(values, res){
    var data = {
        'status':200,
        'values': values,
        "message" : "user created"
    };
    res.json(data);
    res.end();  
}

//response untuk nested matakuliah
exports.oknested = function(values, res){
    //lakukan akumuklasi

    const hasil = values.reduce((akumulasikan, item)=>{
        //tentukan key group
        if(akumulasikan[item.nama]){
            //buat variable group mahasiswa
            const group = akumulasikan[item.nama];
            //cek jika isi arra adalah matakuliah
            if(Array.isArray(group.matakuliah)){
                //tambhakna value ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah);
            }else{
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }

        }else{
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    },{});
var data = {
    'status':200,
    'values':hasil
};
res.json(data);
res.end();

}

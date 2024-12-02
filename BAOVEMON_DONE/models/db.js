const mongooes = require('mongoose'); 

mongooes.connect('mongodb+srv://nvanhiep203:hiepnv123@md08store.q6psg.mongodb.net/UngDungMuaSamAoNamMD08?retryWrites=true&w=majority&appName=md08store')
    .catch((err)=>{
        console.log("loi ket noi CSDL");
        console.log(err);
    });


module.exports = {mongooes};



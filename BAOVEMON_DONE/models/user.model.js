const db = require('./db');

const userSchema = new db.mongooes.Schema(
    {
        email:{type : String,required:true,unique:true},
        fullname:{type:String,required:true},
        role:{type:Boolean,require:true},
        birthday:{type:String ,default:""},
        image :{type:String, default:""}
    },
    {
        collection: 'tb_nguoi_dung'
    }
);

let userModel = db.mongooes.model('userModel', userSchema);

module.exports = { userModel };

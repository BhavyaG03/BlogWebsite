const mongoose=require('mongoose')
const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const schema= mongoose.model('alpha',UserSchema)
module.exports=schema
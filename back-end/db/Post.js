const mongoose=require('mongoose')
const PostSchema=mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author:{type:mongoose.Schema.Types.ObjectId,ref:'alpha'}
  }, {
    timestamps: true,
})
const PostModel=mongoose.model('Post',PostSchema)
module.exports=PostModel
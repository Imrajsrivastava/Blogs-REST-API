const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const blogSchema = new mongoose.Schema({

    title:{type:String,required:true},
    content:{type:String,required:true},
    author:{type:ObjectId,ref:"user"}
    

})

const BlogModel = mongoose.model("blog",blogSchema);

module.exports = {BlogModel};
const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: { type: String, required: [true, "please provide title"], minlength: [10, "Please provide title at least 10 characters"], unique: true },
    content: { type: String, required: [true, "Please provide content"], minlength: [10, "Please provide title at least 10 characters"] },
    slug: { type: String},
    createdAd: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.ObjectId, required: true, ref: "User" }, //ref ile User'in bilgilerini de alabliriz
    likes : [{type : mongoose.Schema.ObjectId, ref: "User"}]
});

QuestionSchema.pre("save", function(next){
    if (!this.isModified("title")) {
        next();
    }
    this.slug = this.makeSlug();
    next();
});

QuestionSchema.methods.makeSlug = function(){
    return slugify(this.title,{
        replacement: '-', //bosluklari - ile degestirir
        remove: /[*+~.()'"!:@]/g, // beli karekterleri kaldirir
        lower: true, //kucuk harfe donusturur
    });
};

module.exports = mongoose.model("Question",QuestionSchema);
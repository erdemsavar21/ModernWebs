const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Schema = mongoose.Schema;
const Question = require("./question");

const UserSchema = new Schema({
    name: { type: String, required: [true, "Please provide a name"] },
    email: { type: String, required: true, unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please provide valid Email"] },
    role: { type: String, default: "user", enum: ["user", "admin"] }, //enum role sadece user veya admin olabilir, defaut olarak user alir.
    password: { type: String, minlength: [6, "please enter min 6 character"], required: [true, "Please provide a password"], select: false },
    createdDate: { type: Date, default: Date.now },
    title: { type: String },
    about: { type: String },
    place: { type: String },
    webseite: { type: String },
    profile_image: { type: String, default: "default.jpeg" },
    blocked: { type: Boolean, default: false },
    resetPasswordToken: { type: String},
    resetPasswordExpire: { type: Date}
});

UserSchema.methods.generateJwtFromUser = function() {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    const payload = {
        id : this._id,
        name : this.name
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY,{
        expiresIn : JWT_EXPIRE
    });

    return token;
};

UserSchema.methods.getResetPasswordTokenFromUser = function(){
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

    const {RESET_PASSWORD_EXPIRE} = process.env;
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE); // 1 saat gecerli olacak

    return resetPasswordToken;
};


UserSchema.pre(["save","findByIdAndUpdate"], function (next) {  //kayit eklemeden önce calisir, password hash lemek icin kullaniyoruz.

    if (!this.isModified("password")) {
        next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.post("remove", async function () {   //Kullanici delete edildikten sonra ona ait sorulari silmek icin kullaniyoruz
    await Question.deleteMany({
       user : this._id
    });
    
});





module.exports = mongoose.model("User", UserSchema);
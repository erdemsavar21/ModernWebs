const express = require("express");
const router = express.Router();
const { register, getUser, login, logout, imageUpload, forgotPassword, resetpassword } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");

router.post("/register", register);
router.post("/login", login);
router.post("/upload", [getAccessToRoute, profileImageUpload.single("profile_image")],imageUpload); //Body de form-data olarak profile_image paramatresi ile image gönderiyoruz Postman ile
router.post("/forgotpassword", forgotPassword);

router.get("/profile", getAccessToRoute, getUser);
router.get("/logout", getAccessToRoute, logout);

router.put("/resetpassword", getAccessToRoute, resetpassword);





module.exports = router;
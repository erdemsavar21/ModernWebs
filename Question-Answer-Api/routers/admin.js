const express = require("express");
const { getAccessToRoute,getAdminAccess } = require("../middlewares/authorization/auth");
const router = express.Router();
const {blockUser,deleteUser,updateUser} = require("../controllers/admin");

router.use([getAccessToRoute,getAdminAccess]); //Tüm rout larda gecerli olur

router.get("/block/:id",blockUser);
router.delete("/user/:id",deleteUser);
router.put("/user/:id",updateUser);

module.exports = router;
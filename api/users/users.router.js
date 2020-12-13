const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    createUser,
    login,
    getUserByUserId,
    getUsers,
    updateUsers,
    deleteUser
} = require("./users.controller");


router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserByUserId);
router.post("/login", login);
router.patch("/:id", updateUsers);
router.delete("/:id", deleteUser);

module.exports = router;

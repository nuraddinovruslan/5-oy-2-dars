const {Router} = require("express")
const { registr, login, deleteuser, updateuser } = require("../controller/users.controller")




const usersrouter= Router()

usersrouter.post("/register", registr)
usersrouter.post("/login", login)
usersrouter.delete("/delete_user/:id", deleteuser)
usersrouter.put("/update_user/:id", updateuser)

module.exports = usersrouter
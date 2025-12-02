const express = require("express")
const cors = require("cors")
const  productrouter  = require("./router/product.routes")
const usersrouter = require("./router/users.routes")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

app.use(productrouter)
app.use(usersrouter)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server is running:", PORT);
    
})
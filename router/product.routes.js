const {Router} = require("express")
const { addproduct, allproduct, oneproduct, updateproduct, deleteproduct } = require("../controller/product.controller")
const authorization = require("../middleware/authorization")

const productrouter = Router()

productrouter.post("/add_product", addproduct)
productrouter.get("/all_product", allproduct)
productrouter.get("/one_product/:id", oneproduct)
productrouter.put("/update_product/:id", updateproduct)
productrouter.delete("/delete_product/:id",  deleteproduct)

module.exports = productrouter

const express = require("express")
const cors = require("cors")
const productrouter = require("./router/product.routes")
require("dotenv").config()
const upload = require("./utils/multer")

const app = express()
app.use(cors())
app.use(express.json())

//upload
app.use("/images", express.static("upload/images"))
//single upload
app.post("/upload", upload.single("file"), (req, res) => {
    return res.status(201).json({
        filePath: "http://localhost:4001/images/" + req.file.filename
    })
})
//multiple-upload
app.post("/upload-multi", upload.array("files", 4), (req, res) => {
    return res.status(201).json({
        filePath: req.files.map((img) => "http://localhost:4001/images/" + img.filename)
    })
})


const productRouter = require("./router/product.routes");
app.use("/", productRouter);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(productrouter)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server is running:", PORT);

})
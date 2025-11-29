const express = require("express")
require("dotenv").config()
const cors = require("cors")
const { read_file, write_file } = require("./fs/file-manager")
const { v4 } = require("uuid")

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000


//drinks
app.get("/get_all_drinks", (req, res) => {
    try {
        const data = read_file("data.json")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.get("/get_one_drinks/:id", (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("drinks.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "drinks not found"
            })
        }
        res.status(200).json(foundedData)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.post("/add_drinks", (req, res) => {
    try {
        const { title, count } = req.body
        const fileData = read_file("drinks.json")


        fileData.push({
            id: v4(),
            ...req.body
        })

        write_file('drinks.json', fileData)
        res.status(201).json({
            message: "Added new drinks"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.put("/update_drinks/:id", (req, res) => {
    try {
        const { title, count } = req.body
        const { id } = req.params
        const data = read_file("drinks.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "drinks not found"
            })
        }

        data.forEach((item) => {
            if (item.id === id) {
                item.title = title ? title : item.title
                item.count = count ? count : item.count
            }
        })

        write_file("drinks.json", data)
        res.status(200).json({
            message: "Updated drinks"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.delete("/delete_drinks/:id", (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("drinks.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "drinks not found"
            })
        }

        data.forEach((item, idx) => {
            if (item.id === id) {
                data.splice(idx, 1)
            }
        })

        write_file("drinks.json", data)
        res.status(200).json({
            message: "deleted drinks"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
//drinks

//animals
app.get("/get_all_animals", (req, res) => {
    try {
        const data = read_file("animals.json")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.get("/get_one_animals/:id", (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("animals.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "animals not found"
            })
        }
        res.status(200).json(foundedData)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.post("/add_animals", (req, res) => {
    try {
        const { title, age } = req.body
        const fileData = read_file("animals.json")


        fileData.push({
            id: v4(),
            title, 
            age
        })

        write_file('animals.json', fileData)
        res.status(201).json({
            message: "Added new animals"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.put("/animals_drinks/:id", (req, res) => {
    try {
        const { title, count } = req.body
        const { id } = req.params
        const data = read_file("animals.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "animals not found"
            })
        }

        data.forEach((item) => {
            if (item.id === id) {
                item.title = title ? title : item.title
                item.count = count ? count : item.count
            }
        })

        write_file("animals.json", data)
        res.status(200).json({
            message: "Updated animals"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.delete("/animals_drinks/:id", (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("animals.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "animals not found"
            })
        }

        data.forEach((item, idx) => {
            if (item.id === id) {
                data.splice(idx, 1)
            }
        })

        write_file("animals.json", data)
        res.status(200).json({
            message: "deleted animals"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
//animals

//fruits
app.get("/get_all_fruits", (req, res) => {
    try {
        const data = read_file("fruits.json")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.get("/get_one_fruits/:id", (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("fruits.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "fruits not found"
            })
        }
        res.status(200).json(foundedData)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.post("/add_fruits", (req, res) => {
    try {
        const { title, price } = req.body
        const fileData = read_file("fruits.json")


        fileData.push({
            id: v4(),
            title,
            price
        })

        write_file('fruits.json', fileData)
        res.status(201).json({
            message: "Added new fruits"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.put("/update_fruits/:id", (req, res) => {
    try {
        const { title, count } = req.body
        const { id } = req.params
        const data = read_file("fruits.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "fruits not found"
            })
        }

        data.forEach((item) => {
            if (item.id === id) {
                item.title = title ? title : item.title
                item.count = count ? count : item.count
            }
        })

        write_file("fruits.json", data)
        res.status(200).json({
            message: "Updated fruits"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.delete("/delete_fruits/:id", (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("fruits.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "fruits not found"
            })
        }

        data.forEach((item, idx) => {
            if (item.id === id) {
                data.splice(idx, 1)
            }
        })

        write_file("fruits.json", data)
        res.status(200).json({
            message: "deleted fruits"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
//fruits


//get
app.get("/get_all_data", (req, res) => {
    try {
        const data = read_file("data.json")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
//get

//getone
app.get("/get_one_data/:id", (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("data.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "Data not found"
            })
        }
        res.status(200).json(foundedData)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
//getone

//post
app.post("/add_data", (req, res) => {
    try {
        const { title, count } = req.body
        const fileData = read_file("data.json")


        fileData.push({
            id: v4(),
            title,
            count
        })

        write_file('data.json', fileData)
        res.status(201).json({
            message: "Added new data"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
//post

//update
app.put("/update_data/:id", (req, res) => {
    try {
        const { title, count } = req.body
        const { id } = req.params
        const data = read_file("data.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "Data not found"
            })
        }

        data.forEach((item) => {
            if (item.id === id) {
                item.title = title ? title : item.title
                item.count = count ? count : item.count
            }
        })

        write_file("data.json", data)
        res.status(200).json({
            message: "Updated"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
//update

//delete
app.delete("/delete_data/:id", (req, res) => {
    try {
        const { id } = req.params
        const data = read_file("data.json")
        const foundedData = data.find((item) => item.id === id)
        if (!foundedData) {
            return res.status(404).json({
                message: "Data not found"
            })
        }

        data.forEach((item, idx) => {
            if (item.id === id) {
                data.splice(idx, 1)
            }
        })

        write_file("data.json", data)
        res.status(200).json({
            message: "deleted"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
//delete

app.listen(PORT, () => {
    console.log("Server is running at:", PORT);

})
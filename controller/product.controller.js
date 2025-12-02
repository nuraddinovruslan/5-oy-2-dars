const { read_file, write_file } = require("../manager/manager");
const { v4 } = require("uuid");

const addproduct = async (req, res) => {
  try {
    const { product_name, amount, price } = req.body;
    const filedata = read_file("product.json");

    filedata.push({
      id: v4(),
      product_name,
      amount,
      price,
    });

    write_file("product.json", filedata);
    res.status(201).json({
      message: "Succesful added!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const allproduct = async (req, res) => {
  try {
    const filedata = read_file("product.json");
    res.status(200).json(filedata);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const oneproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const filedata = read_file("product.json");

    const foundeddata = filedata.find((item) => item.id === id);

    if (!foundeddata) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    res.status(200).json(foundeddata);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateproduct = async (req, res) => {
  try {
    const { product_name, amount, price } = req.body;
    const { id } = req.params;

    const filedata = read_file("product.json");
    const foundeddata = filedata.find((item) => item.id === id);

    if (!foundeddata) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    filedata.forEach((item) => {
      if (item.id === id) {
        item.product_name = product_name ? product_name : item.product_name;
        item.amount = amount ? amount : item.amount;
        item.price = price ? price : item.price;
      }
    });

    write_file("product.json", filedata);
    res.status(200).json({
      message: "Succesful update",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;

    const filedata = read_file("product.json");
    const foundeddata = filedata.find((item) => item.id === id);

    if (!foundeddata) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    filedata.forEach((item, index) => {
        if(item.id === id){
            filedata.splice(index, 1)
        }
    })

    write_file("product.json", filedata)
    res.status(200).json({
        message: "Succesful deleted!"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addproduct,
  allproduct,
  oneproduct,
  updateproduct,
  deleteproduct
};

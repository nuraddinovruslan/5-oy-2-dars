
const { read_file, write_file } = require("../manager/manager")
const bcrypt = require("bcryptjs")
const {v4} = require("uuid")
const sendMessagee = require("../utils/email-sender");
const tokenGenerator = require("../utils/token-generator");


const registr = async (req, res) =>{
    try{
      const {username, email, password, role} = req.body

      if(!username || !email || !password){
         return res.status(401).json({
            message: "Username, email, password are required!"
         })
      }
     const filedata = read_file("users.json")
     
     const founddedemail = filedata.find((item) => item.email === email)

     if(founddedemail){
        return res.status(409).json({
            message: "email already exist!"
        })
     }
     const founddedusername = filedata.find((item) => item.username === username)

     if(founddedusername){
        return res.status(409).json({
            message:"username already exist!"
        })
     }
      
     const hash = await bcrypt.hash(password, 12)
    
     const generetecode = +Array.from({length:6}, () =>  Math.ceil(Math.random() * 9)).join("")

     await sendMessagee (email, generetecode)
     filedata.push({
        id: v4(),
        username,
        email,
        role: "admin",
        password: hash
     }) 

     write_file("users.json", filedata)
     res.status(201).json({
        message: "Succesful registered!"
     })


    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(401).json({
                message: "Email and password are required!"
            })
        }

        const filedata = read_file("users.json")
        const founddeduser = filedata.find((item) => item.email === email)

        if (!founddeduser){
            return res.status(404).json({
                message: "User not found!"
            })
        }

        const decode = await bcrypt.compare(password, founddeduser.password)

        if(decode){
            const payload = {id: founddeduser.id, email: founddeduser.email, role: founddeduser.role}
            const token = tokenGenerator(payload)

            res.status(200).json({
                message: "Succesful!",
                token
            })
        }else {
            return res.status(401).json({
                message: "Wrong password!"
            })
        }

    }catch (error){
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteuser = async (req, res) => {
    try{
    const {id} = req.params

    const filedata = read_file("users.json")
    const founddeduser = filedata.find((item) => item.id === id)
    
    if(!founddeduser){
        return res.status(404).json({
            message: "user not found!"
        })
    }

    filedata.forEach((item, index) => {
        if(item.id === id){
            filedata.splice(index, 1)
        }
    });

    write_file("users.json", filedata)
    res.status(200).json({
        message: "User deleted!"
    })
 } catch (error){
    res.status(500).json({
        message: error.message
    })
 }
}


const updateuser = async (req, res) => {
  try {
    const { role} = req.body;
    const { id } = req.params;

    const filedata = read_file("users.json");
    const foundeddata = filedata.find((item) => item.id === id);

    if (!foundeddata) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    filedata.forEach((item) => {
      if (item.id === id) {
        item.role = role ? role : item.role;
     
      }
    });

    write_file("users.json", filedata);
    res.status(200).json({
      message: "Succesful update",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
    registr,
    login,
    deleteuser,
    updateuser
    
}
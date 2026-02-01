const userModel = require('../models/user.model');
const foodPartnerModel= require('../models/foodpartner.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Controller function for user registration
async function registerUser(req, res) {



    const { fullName, email, password, phone } = req.body ; // Destructure name, email, and password from the request body;

 

    const isUserAlreadyExists = await userModel.findOne({ email})

    if(isUserAlreadyExists){
        return res.status(400).json({ 
            message: 'User already exists'
         });
    }

    

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword,
        phone
    });

    const token = jwt.sign({
        id: user._id, role: "user" 

    }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            role: "user",
            fullName: user.fullName,
            email: user.email,
            phone: user.phone
       
        }
    })
}

// Controller function for user login
async function loginUser(req, res) {
    const { email, password } = req.body;

    const user =  await userModel.findOne({ email });

    if(!user){
         return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
         return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const token = jwt.sign({
         id: user._id, role: "user" 
      
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            role: "user" ,
            fullName: user.fullName,
            email: user.email,
        }
    });
}

// Controller function for user logout
function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

// Controller function for food partner registration
async function registerFoodPartner(req, res) {
const { name, email, password, contactName, phone, address } = req.body;

isAccountExists = await foodPartnerModel.findOne({ email});

if(isAccountExists){
    return res.status(400).json({
        message: "Food Partner already exists"
    }); 
}
const hashedPassword = await bcrypt.hash(password, 10);
const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    contactName,
    phone,
    address
})
const token = jwt.sign({
    id: foodPartner._id, role: "food-partner" 
    
}, process.env.JWT_SECRET);
res.cookie("token", token);
res.status(201).json({
    message: "Food Partner registered successfully",
    foodPartner: {
        id: foodPartner._id,
        role: "food-partner",
        name: foodPartner.name,
        email: foodPartner.email,
        address: foodPartner.address,
        phone: foodPartner.phone,
        contactName: foodPartner.contactName

    }
})
}

// Controller function for food partner login
async function loginFoodPartner(req, res) {
    const { email, password } = req.body; 
    const foodPartner =  await foodPartnerModel.findOne({ email });
    if(!foodPartner){
         return res.status(400).json({
            message: "Invalid email or password"
        });
    }   
    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if(!isPasswordValid){
         return res.status(400).json({
            message: "Invalid email or password"
        });
    }
    const token = jwt.sign({
     id: foodPartner._id, role: "food-partner" 
    }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({
        message: "Food Partner logged in successfully",
        foodPartner: {
            role: "food-partner",
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email,
        }
    });
}


// Controller function for food partner logout
async function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food Partner logged out successfully"
    });
}

async function getMe(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json(null);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json(decoded); // { id, role }
  } catch {
    return res.status(200).json(null);
  }
}





module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getMe
};
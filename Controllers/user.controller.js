const User = require("../models/User.model");

// controller to create user

const createUser = async(req, res) => {
    try{
       const {username, email} = req.body;

       // create new user

       const newUser = new User({
        username, email
       })

       // save user

       await newUser.save()

       return res.status(201).json({message : "User created", user: newUser})
       
    }catch(err){
        console.log("err", err.message)
    }
}


const getUsers = async(req,res)=> {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip =(page-1)*limit;

        const data =await User.aggregate([
            { 
                $skip : skip
            },
            {
                $limit : limit
            },
        ]);

        return res.status(200).json({message : "fetched users",data})



    }catch(err){
        console.log("err",err)
    }
}
module.exports = {createUser,getUsers}
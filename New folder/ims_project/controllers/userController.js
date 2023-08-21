const db = require("../models")
// const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
// const config = require("../config/auth.config")
const User = db.user
const session = require('express-session');

// Register User

const registerUser = async (req , res) => {
  
    const {firstName, lastName, email, mobileNumber,manager} = req.body
    if (!firstName || !lastName || !email || !mobileNumber) {
      return res.status(500).send({
         success : false,
         message : "All fields must have values"})
    }

    const isEmailAvailable = await User.findOne({
      where : {email : email}
    })

    if (isEmailAvailable) {
      return res.status(500).send({
        success : false,
        message : "Email already exist"})
    }

      const user = await User.create({
        firstName,
        lastName,
        email,
        password : bcrypt.hashSync(req.body.password, 8),
        mobileNumber
      });

      req.session.user = user
      console.log("user registered sucessfully")
      req.flash('message', 'You are now Register Sucessfully.');
      return res.redirect('/')
    
  }


//  Login User

const loginUser = async (req, res) => {

    const {email,password} = req.body

    if (!email || !password) {
        return res.status(500).send({
           success : false,
           message : "Please enter Email & Password"})
      }

      const user = await User.findOne({where :{email : req.body.email}})
      
      if (!user) {
        return res.status(500).send({
            success : false,
            message : "User not found"})
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      // let token = jwt.sign({ id: user.id }, config.secret, {
      //   expiresIn: "24H" // 24 hours
      // });

      // return res.status(200).send({
      //   success : true,
      //   username : user.firstName + " " + user.lastName,
      //   accessToken: token
      // })
      
      req.session.isLoggedIn = true
      req.session.userDetail = {
        id: user.id,
        role:user.role
      }
      req.flash('message', 'You are now login Sucessfully.');
      res.redirect('/dashboard')
}

// Create User

const createUser = async (req , res) => {
  console.log(123)
try{

  const {firstName, lastName, email, mobileNumber, role} = req.body
  if (!firstName || !lastName || !email || !mobileNumber) {
    return res.status(500).send({
       success : false,
       message : "All fields must have values"})
  }

  const isEmailAvailable = await User.findOne({
    where : {email : email}
  })

  if (isEmailAvailable) {
    return res.status(500).send({
      success : false,
      message : "Email already exist"})
  }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password : bcrypt.hashSync(req.body.password, 8),
      mobileNumber,
      role
    });
console.log(user)
    // req.session.user = user
    console.log("user registered sucessfully")
    req.flash('message', 'You are now Register Sucessfully.');
    return res.redirect('/userList')
}catch(err){
  console.log(err)
  res.status(500).send({
    success : false,
    message : err
  })

}

  
 
  
}

const updateUser = async (req , res) => {
  console.log(456)
  console.log(req.params.id)

  const user = await User.update(req.body, { where : { id : req.params.id }})
 
    // req.session.user = user
    console.log("user updated sucessfully")
    req.flash('message', 'You are now Register Sucessfully.');
    return res.redirect('/userList')
  
}
module.exports = {
    registerUser,
    loginUser,
    createUser,
    updateUser
}
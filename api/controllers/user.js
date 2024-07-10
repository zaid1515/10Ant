const jwt = require("jsonwebtoken");
const User = require("../models/user")
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");


const register = async (req, res) => {
     try {
          const { username, email, password } = req.body;
          if (!username || !email || !password) {
               return res.status(404).json("All fields are required")
          }

          const checkUser = await User.findOne({ email: email })
          if (checkUser) {
               return res.status(409).json({ msg: "User already exists!" })
          }
          const encrypt_pass = await bcrypt.hash(password, 10)

          const newUser = {
               username,
               email,
               password: encrypt_pass
          }
          const userCreated = await User.create(newUser)
          res.status(201).json({ success: true, newUser: userCreated });


     } catch (e) {
          console.log(e.message);
          res.status(500).json(e);
     }
}

const login = async (req, res) => {
     try {
          const { email, password } = req.body;

          const user = await User.findOne({ email: email }).select("password username email");
          if (!user) {
               return res.status(400).json({ msg: "User does not exist" });
          }
          console.log('User found:', user);

          const checkPass = await bcrypt.compare(password, user.password);
          if (!checkPass) {
               return res.status(401).json({ msg: "Invalid Credentials" });
          }
          const { password: _, ...userWithoutPassword } = user._doc;
          console.log(userWithoutPassword)
          const token = await jwt.sign(userWithoutPassword, process.env.JWT_SECRET, { expiresIn: '1h' });

          res.status(200).json({
               success: true,
               msg: "User logged in successfully",
               user: userWithoutPassword,
               token: token
          });

     } catch (e) {
          console.log(e.message);
          res.status(500).json({ msg: e.message });
     }
};

const googleLogin = async (req, res) => {
     try {
          console.log("inside google login")
          //user gets created and the req.user is updated with the user details through passportJs itself
          // passport supports sessions directly , but for jwt we need to setup it explicitly
          const token = await jwt.sign(
               {
                    _id: req.user._id,
                    username: req.user.username,
                    email: req.user.email,
                    profilePic: req.user.profilePic
               }
               , process.env.JWT_SECRET, { expiresIn: '1h' })

          res.redirect(`http://localhost:3000?token=${token}`)

     } catch (error) {
          console.log(error.message)
          res.status(500).json({
               success: false,
               error: error.message
          })
     }

}

const forgotPassword = async (req, res) => {
     try {
          const email = req.body.email;
          const user = await User.findOne({ email: email }).select("password username email");
          console.log(user)
          if (!user) {
               res.status(401).json({ success: false, msg: "User does not exist" })
          }
          else {
               const password = require('crypto').randomBytes(8).toString('hex')
               const content = `<p> Hi ${user.username},<br/>
         
          We received a request to reset the password for your account associated with this email address. 
          </p>

          <p> Your temporary password is <strong>${password}</strong>.
          <br/>Follow the link below to reset your password : <a href="http://localhost:3000/reset?email=${user.email}">Reset Password</a></p>
          <!--<p>For security reasons, this link will expire in <strong>10 mins</strong>.</p>-->
          `

               await sendEmail('mohdabuzaid15@gmail.com', "10ANT", "zaidrf786@gmail.com", user.username, "Reset Password", content);
               await user.updateOne({ resetPassword: password })
               res.status(200).json({ 
                    success: true, 
                    message: "User found, Temp password sent through email successfully!", 
                    code: 200 })
          }
     } catch (error) {
          console.log(error.message)
          return res.status(500).json({
               message: error.message,
               success: false,
               code: 500,
          })
     }
}

const resetPassword = async (req, res) => {
     try {
          const { email, password, newPassword } = req.body;
          if (!email || !password || !newPassword) {
               return res.status(404).json({
                    success: false,
                    code: 404,
                    message: "User details not found"
               })
          }

          const user = await User.findOne({ email: email }).select("username email password resetPassword");
          if (!user) {
               return res.status(404).json({
                    success: false,
                    message: "User not found",
                    code: 404
               })
          }

          if (user.updatedAt < Date.now() - 10 * 60 * 1000) {
               return res.status(400).json({
                    success: false,
                    code: 400,
                    message: "Reset password session has expired!"
               })
          }

          if (user.resetPassword !== password) {
               return res.status(400).json({
                    success: false,
                    code: 400,
                    message: "Invaild Credentials!",
                    data: user
               })
          }
          const encryptedPassword = await bcrypt.hash(newPassword, 10)
          await user.updateOne({ password: encryptedPassword });
          res.status(200).json({
               success: true,
               code: 200,
               message: "Password updated successfully"
          })
     } catch (error) {
          console.log(error.message)
          return res.status(500).json({
               success: false,
               code: 500,
               message: error.message
          })
     }
}
const getUser = async (req, res) => {
     try {
          const { id } = req.params
          const user = await User.findById(id);
          if (!user) {
               return res.status(404).json("User not found")
          }

          res.status(200).json({ success: true, data: user })

     } catch (e) {
          console.log(e.message);
          res.status(500).json(e);
     }
}

const getAllUsers = async (req, res) => {
     try {
          const users = await User.find({})
          if (!users) {
               res.status(404).json("Users Not Found")
          }
          res.status(200).json({ success: true, users: users })
     } catch (e) {

     }
}

const updateUser = async (req, res) => {
     try {
          console.log("inside")
          const user = { ...req.body };
          console.log(req.body)
          console.log(req.file)
          const updatedUser = {
               username: user.name,
               contact: user.contact,
               email: user.email,
               bio: user.bio,
               profilePic: req.file ? req.file.filename : undefined
          };

          const userId = req.params.id;
          const result = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

          if (!result) {
               return res.status(404).json({ message: "User not found" });
          }

          return res.status(200).json(result);
     } catch (e) {
          console.error(e.message);
          return res.status(500).json({ message: e.message });
     }
};

module.exports = { register, login, getUser, getAllUsers, updateUser, googleLogin, forgotPassword, resetPassword }
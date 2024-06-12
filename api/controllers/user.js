const jwt = require("jsonwebtoken");
const User = require("../models/user")
const bcrypt = require("bcrypt")


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

module.exports = { register, login, getUser, getAllUsers, updateUser }
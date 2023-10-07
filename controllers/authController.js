const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserTable = require('../models/User');
const crudModel = require('../models/profileSchema');

const register = async (req, res) => {
  try {
let isEmailExist=false;
    const { Username, Address, EmailId, password, IsActive, ProfileId } = req.body;

    // Check if the username is already taken
    const existingUser = await UserTable.findOne({ EmailId });
    if (existingUser) {
      isEmailExist=true;
      return res.status(200).json({ message: 'EmailId is already taken' ,isEmailExist});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new UserTable({
      Username,
      Address,
      EmailId,
      password: hashedPassword,
      IsActive,
      ProfileId
    });


    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Failed to register user', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getUserById = function (req, res) {
  const id = req.params.id;

  getUserDataById(id, function (data) {
    res.json(data);
  });
};

const getUserDataById = function (id, callback) {
  const userData = UserTable.findById(id);
  userData.exec()
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      throw err;
    });
};


const login = async (req, res) => {
  try {
    const { EmailId, password, ProfileId } = req.body;

    const user = await UserTable.findOne({ EmailId });
    // console.log("user : ", user);

    // Find the user
    if (user.IsActive == true) {
      const registerMailId = user.EmailId;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (registerMailId == EmailId & isPasswordValid) {
        console.log("seccess to login"); // login code 

        if (user.ProfileId !== "") {
          // Fetch user profile by ID
          crudModel.getOneUserById({ _id: user.ProfileId }, function (data) {
            console.log("hi",data);
            // res.json("hi",data)
            res.json(user)
            return;
            //     Continue with the code for a logged-in user.
          });
        } else {
          // Create a profile with the email and update
          console.log("No profile found, creating one...");


          // Assuming crudModel.RegisterDataFromProfile returns a Promise:
          crudModel.createProfileInMogo({ EmailId: EmailId })
            .then(profileData => {
              console.log("useridcreated profile : ", profileData._id);

              if (user) {
                user.ProfileId = profileData._id;
                 user.save();
                  const user1 =  UserTable.findOne({ EmailId });
                  res.json(user1);

                  // Save the updated user
              } else {
                // Handle the case where the user is not found
                console.error('User not found');
              }
            })
            .catch(error => {
              console.error("Error creating profile:", error);
              // Handle the error here.
            });
        }
      }
      else {
        return res.status(401).json({ message: 'Invalid credentials' });

      }
    } else {
      console.log("plz contact admin")
    }
    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, 'secret');

    // res.status(200).json({ token });
    res.json(user)
  } catch (error) {
    console.error('Failed to log in', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  getUserById

};

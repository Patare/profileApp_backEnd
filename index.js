const express = require("express");
const bodyParser = require("body-parser");
 const multer = require('multer')
   const upload = multer({ dest: 'uploads/' })
   const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// require('dotenv').config();
// const conn=require("./db/conn")
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors(
  {
    origin: "http://localhost:4200"
  }

));

app.use('/Uploads', express.static('Uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('trust proxy', 1);
app.use(session({
  secret: 'change this',
  resave: false,
  saveUninitialized: true
}));

  // const upload = require("./middleware/userImg");


 if (process.env.PORT) { session.cookie = { secure: true } }
// // use the this file in /api url
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/profile', require("./routes/profileRoute"));

// User Details 
app.listen(port, () => {
  console.log(`server is Running ${port}`);
})
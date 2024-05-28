const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = require("../Middlewares/verifytoken");

let userCollection;
let articleCollection;

userApp.use((req, res, next) => {
  userCollection = req.app.get("userscollection");
  articleCollection = req.app.get("articlescollection");
  next();
});

// User registration route
userApp.post(
  "/user",
  expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    const dbUser = await userCollection.findOne({ username: newUser.username });
    if (dbUser != null) {
      res.send({ message: "User existed" });
    } else {
      const hashedPass = await bcryptjs.hash(newUser.password, 10);
      newUser.password = hashedPass;
      await userCollection.insertOne(newUser);
      res.send({ message: "User created" });
    }
  })
);

// User login
userApp.post('/login', expressAsyncHandler(async (req, res) => {
  try {
    const userCred = req.body;

    // Check if the user exists in the database
    const dbuser = await userCollection.findOne({ username: userCred.username });
    if (!dbuser) {
      return res.status(400).send({ message: "Invalid username" });
    }

    // Compare the password
    const status = await bcryptjs.compare(userCred.password, dbuser.password);
    if (!status) {
      return res.status(400).send({ message: "Invalid password" });
    }

    // Create a JWT token
    const signedToken = jwt.sign({ username: dbuser.username }, process.env.SECRET_KEY, { expiresIn: '1d' });

    // Send response
    res.send({ message: "login success", token: signedToken, user: dbuser });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}));



// Viewing articles
userApp.get(
  "/articles",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const articlesList = await articleCollection.find({ status: true }).toArray();
    res.send({ message: "Articles", payload: articlesList });
  })
);

// Posting comments
userApp.post(
  "/comment/:articleId",verifyToken,
  expressAsyncHandler(async (req, res) => {
    //get user comment obj
    const userComment = req.body;
    const articleIdFromUrl=(+req.params.articleId);
    //insert userComment object to comments array of article by id
    let result = await articleCollection.updateOne(
      { articleId: articleIdFromUrl},
      { $addToSet: { comments: userComment } }
    );
    console.log(result);
    res.send({ message: "Comment posted" });
  })
);

module.exports = userApp;


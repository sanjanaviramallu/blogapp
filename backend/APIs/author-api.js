const exp = require("express");
const authorApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = require("../Middlewares/verifytoken");

authorApp.use(exp.json());

let authorCollection;
let articleCollection;

authorApp.use((req, res, next) => {
  authorCollection = req.app.get("authorscollection");
  articleCollection = req.app.get("articlescollection");
  next();
});

// Author registration route
authorApp.post(
  "/author",
  expressAsyncHandler(async (req, res) => {
    const newAuthor = req.body;
    const dbAuthor = await authorCollection.findOne({ username: newAuthor.username });
    if (dbAuthor !== null) {
      res.send({ message: "Author existed" });
    } else {
      const hashedPass = await bcryptjs.hash(newAuthor.password, 10);
      newAuthor.password = hashedPass;
      await authorCollection.insertOne(newAuthor);
      res.send({ message: "Author created" });
    }
  })
);

// Author login
authorApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      // Get credentials from the request body
      const authorCred = req.body;

      // Check if the author exists in the database
      const dbAuthor = await authorCollection.findOne({ username: authorCred.username });
      if (!dbAuthor) {
        return res.status(400).send({ message: "Invalid username" });
      }

      // Compare the password
      const status = await bcryptjs.compare(authorCred.password, dbAuthor.password);
      if (!status) {
        return res.status(400).send({ message: "Invalid password" });
      }

      // Create a JWT token
      const signedToken = jwt.sign(
        { username: dbAuthor.username, userType: "author" },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );

      // Send response
      res.send({
        message: "login success",
        token: signedToken,
        user: dbAuthor,
      });
    } catch (error) {
      console.error("Error during author login:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  })
);



// Adding article
authorApp.post(
  "/article",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const newArticle = req.body;
    newArticle.status = true;
    await articleCollection.insertOne(newArticle);
    res.send({ message: "New article added" });
  })
);

// Updating article
authorApp.put(
  "/article",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    await articleCollection.updateOne({ articleid: modifiedArticle.articleid }, { $set: modifiedArticle });
    res.send({ message: "Article modified" });
  })
);

// Deleting article by articleid
//delete an article by article ID
authorApp.put('/article/:articleid',verifyToken,expressAsyncHandler(async(req,res)=>{
  //get articleId from url
  const artileIdFromUrl=(+req.params.articleid);
   //get article 
   const articleToDelete=req.body;

   if(articleToDelete.status===true){
      let modifiedArt= await articleCollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
      res.send({message:"Article deleted",payload:modifiedArt.status})
   }
   if(articleToDelete.status===false){
       let modifiedArt= await articleCollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
       res.send({message:"Article restored",payload:modifiedArt.status})
   }
}))



// Read articles of author
authorApp.get(
  "/article/:username",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const authorName = req.params.username;
    const articlesList = await articleCollection.find({ status: true, username: authorName }).toArray();
    res.send({ message: "List of articles", payload: articlesList });
  })
);

module.exports = authorApp;

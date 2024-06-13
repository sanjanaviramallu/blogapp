const exp=require('express')
const cors=require('cors')
const app=exp()
require('dotenv').config()
const path=require('path')
//connnecting databse
const mongoClient=require('mongodb').MongoClient;

// deploying react build
app.use(exp.static(path.join(__dirname,'../client/build')))
mongoClient.connect(process.env.db_url)
.then(client=>{
    //get db obj
    const blogdb=client.db('blogdb')
    //get collection obj
    const userscollection=blogdb.collection('userscollection')
    const articlescollection=blogdb.collection('articlescollection')
    const authorscollection=blogdb.collection('authorscollection')
    const adminscollection=blogdb.collection('adminscollection')
    //share collection obj with express app
    app.set('userscollection',userscollection)
    app.set('articlescollection',articlescollection)
    app.set('authorscollection',authorscollection)
    app.set('adminscollection',adminscollection)
    //confirm db conn status
    console.log("db connection success")
})
.catch()

//parsing body of req
app.use(exp.json())
app.use(cors())

const userApp=require('./APIs/user-api')
const authorApp=require('./APIs/author-api')
const adminApp=require('./APIs/admin-api')

app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

//error handling
app.use((err,req,res,next)=>{
    res.send({message:'error',payload:err.message})
})



const port=process.env.PORT || 4000;
app.listen(port,()=>console.log(`Web server on port ${port}`))
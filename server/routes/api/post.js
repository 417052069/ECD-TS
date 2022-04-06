const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Get Posts

router.get("/toDoLists",async (req,res) => {
  const posts = await loadPostsCollection("toDoLists"); //  toDoLists
  res.send(await posts.find({}).toArray()); //"projectName": '云南文山',"projectName": '海南儋州'
})

router.get("/toDoLists/:id",async (req,res) => {
  const posts = await loadPostsCollection("toDoLists");
  res.send(await posts.find({id: parseInt(req.params.id)}).toArray());  //.toArray()
  // res.send(await posts.find({projectName: req.params.id}).toArray()); 
})

router.get("/overView",async (req,res) => {
  const posts = await loadPostsCollection("overview");
  res.send(await posts.find({}).toArray()); 
})

router.get("/overView/:id",async (req,res) => {
  const posts = await loadPostsCollection("overview");
  res.send(await posts.find({id: parseInt(req.params.id)}).toArray()); //.toArray()
})

router.get("/projectTimeLine",async (req,res) => {
  const posts = await loadPostsCollection("projectTimeline");
  res.send(await posts.find({}).toArray()); //"projectName": '云南文山',"projectName": '海南儋州'
})

router.get("/projectTimeLine/:id",async (req,res) => {
  const posts = await loadPostsCollection("projectTimeline");
  res.send(await posts.find({id: parseInt(req.params.id)}).toArray()); 
})

//Post
router.post("/toDoLists",async (req,res) => {
  const posts = await loadPostsCollection("toDoLists");
  // console.log(req.body)
  await posts.insertOne({
      ...req.body
  },(err) => {
    if(err) throw err
    res.status(201).send();
  })
})

//Add PUT  toDoLists/id
router.put("/toDoLists/:id",async (req,res) => {
  const posts = await loadPostsCollection("toDoLists"); //toDoLists
  try{
    await posts.updateOne({_id: new mongodb.ObjectId(req.params.id)},
    {$set:{...req.body}},(err) => {
      if(err) throw err 
      res.status(200).send()
    })
  } catch(err) {
    console.log(err)
  }
})

router.put("/projectTimeline/:id",async (req,res) => {
  const posts = await loadPostsCollection("projectTimeline"); //toDoLists
  console.log(req.body)
  try{
    await posts.updateOne({id: parseInt(req.params.id)},
    {$set:{...req.body}},(err) => {
      if(err) throw err 
      res.status(200).send()
    })
  } catch(err) {
    console.log(err)
  }
})

/* PUT overview/id*/
router.put("/overview/:id",async (req,res) => {
  const posts = await loadPostsCollection("overview"); 

  console.log(req.body)  
  
  try{
    await posts.updateOne({_id: new mongodb.ObjectId(req.params.id)},
    {$set:{...req.body}},(err) => {
      if(err) throw err 
      res.status(200).send()
    })
  } catch(err) {
    console.log(err)
  }
})


//Delete post
router.delete("/toDoLists/:id",async (req,res) => {
  const posts = await loadPostsCollection("toDoLists");
  // console.log(req.body)
  try{
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send();
  } catch(err) {
    console.log(err)
  }
})

async function loadPostsCollection(name){
  const client = await mongodb.MongoClient.connect(`mongodb+srv://zshining1986:KFMsa05OGImUrXel@cluster0.qjihz.mongodb.net/Vue?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
  });
  return client.db("Vue").collection(name)
  // const client = await mongodb.MongoClient.connect("mongodb://localhost:27017",{
    //   useNewUrlParser: true,
    // });
    // return client.db("gcjsb").collection(name)
}

module.exports = router;
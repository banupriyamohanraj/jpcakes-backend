require("dotenv").config();
const router = require('express').Router();
const { MongoClient} = require('mongodb')
const{ObjectId}= require('mongodb');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const authorize = require('./authorize')


const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017'

router.get("/itemlist",async(req,res)=>{
    try {
        let client = await MongoClient.connect(dbURL);
        let db = await client.db('jp');
        let data = await db.collection("item").find().toArray();
        if (data) {
            console.log(data)
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "no data found" })
        }
        client.close();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post('/itemlist', async (req, res) => {
    try {
        let client = await MongoClient.connect(dbURL);
        let db = await client.db('jp');
        let data = await db.collection("item").insertOne({itemid:req.body.itemid,title:req.body.title,img:req.body.img,rate:req.body.rate,state:req.body.state});
        res.status(200).json(data);
        
        client.close();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }

})


router.post("/itemlist/:id",async(req,res)=>{
    try {
        
        console.log('id: ' + req.params.id + ' type: ' + typeof req.params.id);
        let client = await MongoClient.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true});
        let db =  await client.db('jp');
        let data =await db.collection("item").findOne({ _id :ObjectId(req.params.id)})
     
        console.log(data)
            if(data){
                
                res.status(200).json({message:"item found",data})
            }
            else {
                res.status(404).json({ message: "not found" })
            }  
            client.close();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
})



module.exports = router;
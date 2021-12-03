require("dotenv").config();
const router = require('express').Router();
const { MongoClient} = require('mongodb')
const{ObjectId}= require('mongodb');
const bcrypt = require('bcrypt')



const dbURL = process.env.DB_URL || 'mongodb://127.0.0.1:27017'

router.put('/updatingaddress',async(req,res)=>{
    try {
        const city = req.body.city
        const state = req.body.state
        const zip = req.body.zip
        const street = req.body.street

        let client = await MongoClient.connect(dbURL);
        let db = await client.db('user');
    let activation =  await db.collection("logininfo").findOneAndUpdate({email : req.body.email},{$set :{city : city,state:state,zip:zip,street:street} })
    if(activation){
        res.status(200).json({message:"Address updated"})
    }else{
        res.status(401).json({message : "NO USER FOUND"})
    }
    client.close();
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

router.put('/upatepaymentmethod',async(req,res)=>{
    try {
        const confirmationcode = req.body.confirmationcode
        const status = req.body.status

        let client = await MongoClient.connect(dbURL);
        let db = await client.db('user');
    let activation =  await db.collection("logininfo").findOneAndUpdate({code : confirmationcode},{$set :{status : status,code:undefined} })
    if(activation){
        res.status(200).json({message:"Address updated"})
    }else{
        res.status(401).json({message : "NO USER FOUND"})
    }
    client.close();
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

module.exports = router;
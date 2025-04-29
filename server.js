const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const PORT = 5000
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log({message: "mongoose in connected"}))
.catch((error)=>console.log({message: "error in connecting!!"}))

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true}
})

const user = mongoose.model("user",userSchema)

app.post("/user",async(req,res)=>{
    try{
        const{name,email}=req.body;
        const newuser = new user({name,email})
        await newuser.save()
        res.status(201).json(newuser)
    }catch(error){
        res.status(500).json({error:error.message})
    }           
})

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true}
})

const product = mongoose.model("product",productSchema)

app.post("/product",async(req,res)=>{
    try{
        const{name,price}=req.body;
        const newproduct = new product({name,price})
        await newproduct.save()
        res.status(201).json(newproduct)
    }catch(error){
        res.status(500).json({error:error.message})
    }
})


app.listen(PORT,()=>console.log(`server is running in ${PORT}`))
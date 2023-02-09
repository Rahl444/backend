const express = require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Rahul:Rahul@cluster0.udbbkd9.mongodb.net/media?retryWrites=true&w=majority", 
{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => console.log('error', 'FAILED to connect to mongoose'));
db.once('open', () => console.log('info', 'MongoDB is running'));

app.post('/fileUpload', async (request, response) => {
    try{
        const body = await request.body
        console.log(body)
        const res = db.collection("rahul").insertOne(body)
        response.send("success")
    } catch (exception) {   
        console.log(exception);
        res.send(exception);
    }
})

app.get('/getData', async(req, res)=>{

    const result = await db.collection("rahul").find({}).toArray()
    console.log(result);
    res.send(result);

})

app.get('/', async(req, res)=>{

    //const result = await db.collection("rahul").find({}).toArray()
    //console.log(result);
    res.send("Media Storage System - Backend");

})

app.listen(4000, () => {
    console.log("Server started on Port 4000");
})     
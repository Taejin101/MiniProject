const express=require('express');       // import express module
const path=require('path');             // import path module
const app=express();                    // create an express application
const mongoose = require('mongoose');   // for connecting database
const bodyparser = require('body-parser');

main().catch(err => console.log(err));

async function main() {
   mongoose.connect('mongodb://localhost:27017/contactDance');
}

const port = 80;

// Defining schema for contact form
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'));    // for serving static files
app.use(express.urlencoded())

app.set('view engine','pug');                   // set up template engine as pug
app.set('views',path.join(__dirname,'views'));  // set up views directory

// ENDPOINTS
app.get('/about', (req,res)=>{
    res.status(404).render('about.pug');
});
app.get('/', (req,res)=>{
    res.status(200).render('home.pug');
});
app.get('/contact', (req,res)=>{
    res.status(200).render('contact.pug');
});
app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        // console.log("This item has been saved to the database");
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    });
    // res.status(200).render('contact.pug');
});
app.get('/services', (req,res)=>{
    res.status(200).render('services.pug');
});

// START THE SERVER 
app.listen(port, ()=>{
    console.log(`Your Website is running at port: ${port}`);
});
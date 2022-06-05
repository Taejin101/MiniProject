const express=require('express');    // import express module
const path=require('path');          // import path module
const app=express();                 // create an express application
const port=80;

app.use('/static',express.static('static'));    // for serving static files
app.use(express.urlencoded())

app.set('view engine','pug');                   // set up template engine as pug
app.set('views',path.join(__dirname,'views'));  // set up views directory

// ENDPOINTS
app.get('/', (req,res)=>{
    res.status(200).render('index.pug');
});

// START THE SERVER 
app.listen(port, ()=>{
    console.log(`Your Website is running at port:${port}`);
});
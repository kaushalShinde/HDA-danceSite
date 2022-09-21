const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
// const fs = require("fs");
const app = express();
const port = 80;

const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
// app.use(express.static('static', options));
app.use('static', express.static('static'))     // for serving static files
app.use(express.urlencoded());


// PUG SPECIFIC STUFF
app.set('view engine', 'pug')       // set the template engine as pug
app.set('views', path.join(__dirname, 'view'))      // set the view directory


// ENDPOINTS
app.get('/', (req, res)=>{
    const param = { };
    res.status(200).render('home.pug', param);
})

app.get('/contact', (req, res)=>{
    const param = { };
    res.status(200).render('contact.pug', param);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saaved to the database");
        // alert("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item has not saved to the database");
    })

    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started on port no ${port} `);
})




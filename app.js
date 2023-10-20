require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

mongoose.connect(process.env.MONGO_ATLAS_CONNECTION_STRING)
    .then((result) => {
        console.log('connected to database');
        app.listen(3000);
    })
    .catch((err) => console.log(err));


//register view engines
app.set('view engine', 'ejs');

app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.render('home', {title: 'Home'});
});

app.get('/about', (req,res)=>{
    res.render('about', {title: 'About'});
});

app.use('/blog', blogRoutes);

//404
app.use((req,res)=>{
    res.status(404).render('404', {title: '404 Not found!'});
});
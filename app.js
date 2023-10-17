require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const moment = require('moment');

const app = express();

mongoose.connect(process.env.MONGO_ATLAS_CONNECTION_STRING)
    .then((result) => {
        console.log('connected to database');
        app.listen(3000);
    })
    .catch((err) => console.log(err));


//register view engines
app.set('view engine', 'ejs');


app.get('/', (req,res)=>{
    res.render('home', {title: 'Home'});
});

app.get('/about', (req,res)=>{
    res.render('about', {title: 'About'});
});

app.get('/blog/add-blog', (req, res)=>{
    const blogObj = new Blog({
        title: 'Best wedding photographers',
        snippet: 'ISPWP is the best site',
        body: 'When we talk about a real photographers directory'
    });

    blogObj.save()
    .then((result)=> res.redirect('../blogs'))
    .catch((err)=>console.log(err));
});

app.get('/blog/create', (req,res)=>{
    res.render('create', {title: 'Add Blog'});
});

app.get('/blogs', (req, res) => {
    Blog.find()
    .then((result) => res.render('blogs', {title: 'all blogs', blogs: result}))
    .catch((err) => console.log(err));
});

app.get('/blog/:id', (req, res) => {
    Blog.findById(req.params.id)
    .then((result) => res.render('blog-detail', {title: result.title, moment, blog: result}))
    .catch((err) => console.log(err));
});

app.delete('/blog/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then(result => {
        res.json({ redirect: '/blogs', message: 'success'})
    })
    .catch(err => console.log(err));
});
//404
app.use((req,res)=>{
    res.status(404).render('404', {title: '404 Not found!'});
});
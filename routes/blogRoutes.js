const express = require('express');
const Blog = require('../models/blog');
const moment = require('moment');

const router = express.Router();



router.get('/add-blog', (req,res)=>{
    res.render('add-blog', {title: 'Add Blog'});
});

router.post('/create', (req, res)=>{
    const blogObj = new Blog(req.body);

    blogObj.save()
    .then((result)=> res.redirect('../blog'))
    .catch((err)=>console.log(err));
});

router.get('/', (req, res) => {
    Blog.find()
    .then((result) => res.render('blogs', {title: 'all blogs', blogs: result}))
    .catch((err) => console.log(err));
});

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
    .then((result) => res.render('blog-detail', {title: result.title, moment, blog: result}))
    .catch((err) => console.log(err));
});

router.delete('/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then(result => {
        res.json({ redirect: '/blog', message: 'success'})
    })
    .catch(err => console.log(err));
});

module.exports = router;
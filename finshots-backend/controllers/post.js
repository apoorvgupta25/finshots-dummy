const Post = require('../models/post')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs');

exports.getPostById = (req, res, next, id) => {
    Post.findById(id).populate("category").populate("author", "_id name").exec((err, prod) => {
        if(err){
            return res.status(400).json({
                error: "Post not found"
            });
        }
        req.post = prod;
        next();
    });
};

exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with Image"
            });
        }

        const {title, description, content, category} = fields;
        if(!title || !description || !content || !category){
            return res.status(400).json({
                error: "Please Include all fields"
            });
        }

        let post = new Post(fields);
        post.author = req.profile._id;

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                  error: "File size too big!"
                });
            }

            post.photo.data = fs.readFileSync(file.photo.path);
            post.photo.contentType = file.photo.type;
        }

        post.save((err, post) => {
            if(err){
                return res.status(400).json({
                    error: "Not able to save Post in DB"
                });
            }
            res.json(post);
        });
    });
};

exports.getPost = (req, res) => {
    req.post.photo = undefined;
    return res.json(req.post);
};

exports.photo = (req, res, next) => {
    if(req.post.photo.data){
        res.set("Content-Type", req.post.photo.contentType);
        return res.send(req.post.photo.data)
    }
    next();
};

exports.deletePost =(req, res) => {
    let post = req.post;
    post.remove((err, deletedPost) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete Post"
            });
        }
        res.json({
            message: "Deletion was success",
            deletedPost
        });
    });
};

exports.updatePost = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with Image"
            });
        }

        let post = req.post;
        post = _.extend(post, fields)

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                  error: "File size too big!"
                });
            }
            post.photo.data = fs.readFileSync(file.photo.path);  //using file path
            post.photo.contentType = file.photo.type;
        }

        post.save((err, post) => {
            if(err){
                return res.status(400).json({
                    error: "Updation of post failed"
                });
            }
            res.json(post);
        });
    });
};

exports.getAllPosts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000000;

    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    Post.find()
        .select("-photo")
        .populate('category')
        .populate("author", "_id name")
        .sort([[sortBy, 'descending']])
        .limit(limit)
        .exec((err, posts) => {
        if(err){
            return res.status(400).json({
                error: "No Post was Found"
            });
        }
        res.json(posts);
    });
};

exports.getAllUniqueCategories = (req, res) => {
    Post.distinct("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error: "No Category Found"
            });
        }
        res.json(category);
    });
}

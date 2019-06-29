const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    const postQuery = Post.find();
    postQuery.then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        });
    });
}

exports.getPost = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(400).json({
                    message: 'Post not found'
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Fetching post failed'
            });
        });
}

exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            post: {
                id: createdPost._id,
                ...createdPost
            }
        });
    });
}

exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    Post.updateOne({ _id: req.body.id }, post)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({
                    message: 'Update successful'
                });
            } else {
                res.status(401).json({
                    message: 'Not authorised'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Update failed'
            });
        });
}

exports.deletePost = (req, res, next) => {
    Post.deleteOne({
        _id: req.params.id
    })
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({
                    message: 'Deletion successful'
                });
            } else {
                res.status(401).json({
                    message: 'Not authorised'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Delete failed'
            });
        });
}
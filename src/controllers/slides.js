const Slide = require('../models/slide');

exports.getSlides = (req, res, next) => {
    const slideQuery = Slide.find();
    slideQuery.then(documents => {
        res.status(200).json({
            message: 'Slides fetched successfully',
            slides: documents
        });
    });
}

exports.getSlide = (req, res, next) => {
    Slide.findById(req.params.id)
        .then(slide => {
            if(slide) {
                res.status(200).json(slide);
            } else {
                res.status(400).json({
                    message: 'Slide not found'
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Fetching slide failed'
            });
        });
}

exports.createSlide = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const slide = new Slide({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename
    });
    slide.save().then(createdSlide => {
        res.status(201).json({
            message: 'Slide added successfully',
            slide: {
                id: createdSlide._id,
                ...createdSlide
            }
        });
    });
}

exports.updateSlide = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    const slide = new Slide({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    Slide.updateOne({ _id: req.body.id }, slide)
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

exports.deleteSlide = (req, res, next) => {
    Slide.deleteOne({
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
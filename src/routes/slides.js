const express = require('express');
const router = express.Router();

const SlidesController = require('../controllers/slides');
const extractFile = require('../middleware/file');

router.get('', SlidesController.getSlides);
router.post('', extractFile, SlidesController.createSlide);
router.get('/:id', SlidesController.getSlide);
router.put('/:id', SlidesController.updateSlide);
router.delete('/:id', SlidesController.deleteSlide);

module.exports = router;
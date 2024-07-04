const express = require('express');
const router = express.Router();
const guideData = require('../services/guidedata');

router.get('/', async function(req, res, next) {
    try {
        res.json(await guideData.getFormattedGuideData(req.query.page));
    } catch (err) {
        console.error(`Error while getting guidedata`, err.message);
        next(err);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const testdata = require('../services/testdata');

router.get('/', async function(req, res, next) {
    try {
        res.json(await testdata.getFormattedGuideData(req.query.page));
    } catch (err) {
        console.error(`Error while getting testdata`, err.message);
        next(err);
    }
});

module.exports = router;
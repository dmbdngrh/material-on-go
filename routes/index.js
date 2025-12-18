const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Kucing Terbang')
});

module.exports = router;
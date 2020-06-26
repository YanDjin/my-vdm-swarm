import express from 'express';
const router = express.Router();

router.post('/', ((req, res) => {
    console.log('trying to login');
}))

module.exports = router;
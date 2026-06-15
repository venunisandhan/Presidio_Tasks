
const express = requrie('express');

const router = express.Router();

const { register , login , getProfile } = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');


router.post('/regsiter' , regsiter);

router.post('/login' , login);

router.get('/profile' , getProfile);

module.exports = router ;
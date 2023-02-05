const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUser
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/me',protect,getUser)
router.post('/register', registerUser)
router.post('/login',loginUser)


module.exports = router
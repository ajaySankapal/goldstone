const express = require('express')
const { register, storeUsers, getAllUsers, updateUser, getUserById } = require('../controllers/userController')

const router = express.Router()

router.route('/register').post(register)
router.route('/store').get(storeUsers)
router.route('/all').get(getAllUsers)
router.route('/:id').put(updateUser).get(getUserById)

module.exports = router
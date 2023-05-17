const User = require('../model/user')
const axios = require('axios')

exports.register = async (req, res) => {
    try {
        const { name, email, status, gender } = req.body
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exist!' })
        }
        user = await User.create({
            id: Math.random(),
            name,
            email,
            status,
            gender
        })
        res.status(201).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const fetchData = async () => {
    const { data } = await axios.get('https://gorest.co.in/public/v2/users');
    return data;
}

const insertData = async (user_) => {
    // await User.create(user)
    try {
        const { id, name, email, status, gender } = user_
        let user = await User.findOne({ email })
        if (user) {
            return;
        }
        user = await User.create({
            id,
            name,
            email,
            status,
            gender
        })

    } catch (error) {
    }
}
async function checkIfExists(user) {
    const result = await User.findOne({ email: user.email });
    return result !== null;
}
exports.storeUsers = async (req, res) => {
    try {
        let usersData = await fetchData()
        const existingUsers = await Promise.all(usersData.map(checkIfExists));
        const newUsers = usersData.filter(user => !existingUsers.includes(user));
        await Promise.all(usersData.map(insertData));
        const users = await User.find({})
        res.status(200).json({ success: true, users, message: 'Users stored successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ success: true, users })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })

    }
}

exports.updateUser = async (req, res) => {
    try {
        const { name, email, gender, status } = req.body

        let user = await User.findOne({ _id: req.params.id })

        if (user) {
            user.name = name
            user.email = email
            user.status = status
            user.gender = gender
            let updatedUser = await user.save()
            return res.status(200).json({ success: true, user: updatedUser })

        } else {
            res.status(404).json({ success: false, message: 'User not found.' })

        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            res.status(200).json({ success: true, user })
        } else {
            res.status(404).json({ success: false, message: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
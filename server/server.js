const express = require('express')
const userRoutes = require('./routes/userRoute')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs');
const { connectDatabase } = require('./config/db')
const User = require('./model/user')
const { Parser } = require('json2csv');
const csvWriter = require('csv-writer');
require('dotenv').config()

connectDatabase()

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.get('/', (req, res) => {
    res.send('API is working correctly!')
})

//routers
app.use('/api/users', userRoutes)
app.get('/export', async (req, res) => {
    // Fetch JSON data from your source or generate it
    const users = await User.find({})
    console.log(users)
    const csvFields = ['id', 'name', 'email', 'status', 'gender'];
    const json2csvParser = new Parser({ fields: csvFields });
    const csvData = json2csvParser.parse(users);

    fs.writeFile('Readme.csv', csvData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating CSV file');
        } else {
            console.log('CSV file created successfully');
            res.send('CSV file created successfully');
        }
    });
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
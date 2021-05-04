const express = require('express')
const app = express()
const PORT = process.env.PORT || 1341
const cors = require('cors')
const path = require('path')
const animals = require('./routes/animals.js')
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next()
})
app.use( express.static(path.join(__dirname, 'frontend')))
app.use('/animals', animals)
app.listen(PORT, () =>{
	console.log(`Server is listening at ${PORT}.`);
})

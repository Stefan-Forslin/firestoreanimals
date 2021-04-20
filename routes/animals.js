const express = require('express')
const router = express.Router()
const dbFunction = require('../database.js')
const db = dbFunction ()
router.get('/', async (req, res) => {
	//res.send('GET /animals/')
	const animalsRef = db.collection('animals')
	const snapshot = await animalsRef.get()
	if(snapshot.empty){
		res.send([])
		return
	}
	let items = []
	snapshot.forEach(docRef => {
		const data = docRef.data()
		data.id = doc.id
		items.push(data)
	})
	res.send(items)
})
router.get('/:id', async (req, res) =>{
	const id = req.params.id
	const docRef = await db.collection('animals').doc(id).get()
	if (!docRef.exists ){
		res.status(404).send('animal does not exist')
		return
	}
	const data = docRef.data()
	res.send(data)
})
module.exports = router

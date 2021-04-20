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
	snapshot.forEach(doc => {
		const data = doc.data()
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
router.post('/', async (req, res) => {
	const object = req.body
	if(!isAnimalsObject(object)){
		res.sendStatus(400)
		return
	}
	const docRef = await db.collection('animals').add(object)
	res.send(docRef.id)
})
router.put('/:id', async (req, res) => {
	const object = req.body
	const id = req.params.id
	if(!object || !id){
		res.sendStatus(400)
		return
	}
	const docRef = db.collection('animals').doc(id)
	await docRef.set(object, {merge: true})
	res.sendStatus(200)
})
function isAnimalsObject(maybeObject){
	if( !maybeObject)
	return false
    else if(!maybeObject.name || !maybeObject.age)
	return false
	return true
}
router.delete('/:id', async (req, res) =>{
	const id = req.params.id
	if (!id){
		res.sendStatus(400)
		return
	}
    await db.collection('animals').doc(id).delete()
	res.sendStatus(200)
})
module.exports = router

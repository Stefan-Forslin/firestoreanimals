const admin = require('firebase-admin')
const privateKey = require('./private-key-animals.json')
admin.initializeApp({
  credential: admin.credential.cert(privateKey)
});
function getDatabase(){
	return admin.firestore()
}
module.exports = getDatabase

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/messagedb', {useMongoClient: true}).then(function () {
	console.log("Mongodb connected")
}). catch(function (err) {
	console.log("I am the error in database")
	console.log(err)
})

module.exports = mongoose
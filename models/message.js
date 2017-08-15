var db = require("../db")

var Message = db.model('Message', {
	message : {type: String, required: true},
	date: {type: Date, required: true, default: Date.now}
})

module.exports = Message
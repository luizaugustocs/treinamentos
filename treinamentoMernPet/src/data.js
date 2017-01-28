const data = [{
	"_id": 0,
	"owner": "pauloapanucci@gmail.com",
	"createdAt": Date.now(),
	"status": 1,
	"priority": 1,
	"description": "App doesn't save my information.",
	"comments": [{
		"user": "xtheosirian@gmail.com",
		"message": "Still doesn't work."
	}, {
		"user": "pauloapanucci@gmail.com",
		"message": "Still doesn't work."
	}]
}, {
	"_id": 1,
	"owner": "xtheosirian@gmail.com",
	"createdAt": Date.now(),
	"status": 0,
	"priority": 0,
	"description": "App doesn't save my information.",
	"comments": []
}, {
	"_id": 2,
	"owner": "xtheosirian@gmail.com",
	"createdAt": Date.now(),
	"status": 0,
	"priority": 1,
	"description": "App doesn't save my information.",
	"comments": []
}, {
	"_id": 3,
	"owner": "xtheosirian@gmail.com",
	"createdAt": Date.now(),
	"status": 1,
	"priority": 2,
	"description": "App doesn't save my information.",
	"comments": []
}];

module.exports = data;

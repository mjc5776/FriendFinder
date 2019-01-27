
var path = require('path');
var friends = require("../data/friends");


module.exports = function(app) {

app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  
  
  app.post("/api/friends", function(req, res) {
    
    var userInput = req.body;
    var userResponses = userInput.scores;
    
    // Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 50; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			 //console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			 //console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				//console.log('Closest match found = ' + diff);
				//console.log('Friend name = ' + friends[i].name);
				//console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				//console.log(totalDifference);
				
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
    }
    
    friends.push(userInput);
	res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  });
};
const axios = require('axios');
let _TOKEN = null;
// Trying to resolve a non-existent file
// will result in an error
// The try block will attempt an error-prone action
// and if it doesn't work, the catch block runs
try {
  // The config.js file is ignored by git
  _TOKEN = require('./config.js')._TOKEN;
} catch (err) {
  _TOKEN = process.env._TOKEN;
}

//Generic api integration method (not used yet)
let getFromMeetUp = function (query) {
  //zip code, topic, free?
  var location = query.location;
  var topic = query.topic;
  return axios.get(`https://api.meetup.com/find/upcoming_events?key=48416f2b301d68647614267b3651601c&text=food`, 
    { params: 
      {
        'location.address': location,
        'q': topic
      }
    });
};

module.exports = { getFromMeetUp };

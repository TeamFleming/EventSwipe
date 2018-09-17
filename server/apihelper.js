// Eventbrite will not work with axios... only request (likely based on Eventbrite API rules)
const request = require('request');

// Setting up the deployment catches and development environment defaults for tokens
// Trying to resolve a non-existent file will result in an error
// The try block will attempt an error-prone action and if it doesn't work, the catch block runs
// The config.js file is ignored by git
// Setup specifically for heroku
let MEETUP_TOKEN = null;
let EVENTBRITE_TOKEN = null;
let ZIPCODE_TOKEN = require('../config.js').ZIPCODE_KEY;
try { 
  MEETUP_TOKEN = require('../config.js').MEETUP_TOKEN;
  EVENTBRITE_TOKEN = require('../config.js').EVENTBRITE_TOKEN;
} catch (err) {
  MEETUP_TOKEN = process.env.MEETUP_TOKEN;
  EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;
}

// Longitude and Latitude API for zip codes
const getZipCodeBasedOnLonAndLat = (zip, cb) => {
  let options = { url: `https://www.zipcodeapi.com/rest/${ZIPCODE_TOKEN}/info.json/${zip}/degrees`};
  request.get(options, (err, results) => {
    if (err) {
      console.error(`err in getZipCode: ${err}`);
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};


// Meetup API Request (necessitates a lon/lat from the above API)
const getFromMeetUp = (query, cb) => {
  let location = query.location;
  let topic = query.topic;
  // Specific substring of date taken from input from searchbar.jsx component
  let startDate = query.startDate.substring(0, query.startDate.length - 5);
  let endDate = query.endDate.substring(0, query.endDate.length - 5);
  getZipCodeBasedOnLonAndLat(location, (err, data) => {
    if (err) {
      console.error('err in call for getZip', err);
      cb(err, null);
    } else {
      data = JSON.parse(data.body);
      let lat = data.lat;
      let lng = data.lng;
      let options = { url: `https://api.meetup.com/find/upcoming_events?key=48416f2b301d68647614267b3651601c&text=${topic}&lat=${lat}&lon=${lng}&start_date_range=${startDate}&end_date_range=${endDate}&fields=featured_photo,group_photo,plain_text_description` };
      request.get(options, (err, results) => {
        if (err) {
          console.error(`err in request.get to zipcode: ${err}`);
          cb(err, null);
        } else {
          cb(null, results);
        }
      });
    }
  });
};

// Eventbrite API Request [Axios is not compatible with the eventbrite API...request is working alright with appropriate headers]
const getFromEventBrite = (query, cb) => {
  let location = query.location;
  let topic = query.topic;
  // Specific substring of date taken from input from searchbar.jsx component (It is different from the meetup substring methodology)
  let startDate = query.startDate.substring(0, query.startDate.length - 5) + 'Z';
  let endDate = query.endDate.substring(0, query.endDate.length - 5) + 'Z';
  let options = {
    url: `https://www.eventbriteapi.com/v3/events/search/?location.address=${location}&expand=organizer,venue&token=${EVENTBRITE_TOKEN}&q=${topic}&start_date.range_start=${startDate}&start_date.range_end=${endDate}`,
    headers: { Authorization: 'Bearer E5PTH3KVZH4MFUMMULAE' } // have to hardcode the key to be able to make request work 
  };
  request.get(options, (err, response, body) => {
    cb(err, JSON.parse(body));
  });
};


module.exports = { getFromMeetUp, getFromEventBrite };

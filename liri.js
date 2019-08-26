//read .env file 
require('dotenv').config();

var fs = require('fs')
var keys = require('./keys.js')
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require('axios');
var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
var input = process.argv.slice(3).join(' ');

// Spotify-this-song
function spotifyThisSong(input) {
	spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
		console.log('--------------------------------------------------')
		console.log('Artist(s):', data.tracks.items[0].artists[0].name); 
		console.log('Song Name:', data.tracks.items[0].name);
		console.log('Preview song:', data.tracks.items[0].preview_url);
		console.log('Album:', data.tracks.items[0].album.name)
		console.log('--------------------------------------------------')
	});
}
 
// Movie-this
function movieThis(input) {
	axios.get('https://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=trilogy')
	  .then(function (response) {
	    // handle success
		console.log('--------------------------------------------------')
	    console.log('Title:', response.data.Title);
	    console.log('Year:', response.data.Year);
	    console.log('IMDB Rating:', response.data.imdbRating);
	    console.log('Rotten Tomatoes Rating:', response.data.Ratings[1].Value);
	    console.log('Country:', response.data.Country);
	    console.log('Language:', response.data.Language);
	    console.log('Plot:', response.data.Plot);
	    console.log('Actors:', response.data.Actors);
	    console.log('--------------------------------------------------')
	    // console.log(response.data)
	  })
	  .catch(function (error) {
	    // handle error
	    console.log(error);
	})
}

// Concert-this
function concertThis(input) {

	axios.get('https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp')
	.then(function (response) {
		console.log('--------------------------------------------------')
		console.log('Name of Venue:', response.data[1].venue.name)
		console.log('Venue location:', response.data[1].venue.city)
		console.log('Date of the Event:', moment(response.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a"))
		console.log('--------------------------------------------------')
	})
}

if (search == 'spotify-this-song') {
	spotifyThisSong(input);
} else if (search == 'movie-this') {
	movieThis(input);
} else if (search == 'concert-this') {
	concertThis(input);
} else if (search == 'do-what-it-says') { 
	fs.readFile('random.txt', 'utf8', function(error, data) {
		if (error) {
			console.log('Error occurred', error);
		} else {
			var dataArr = data.split(",");

			if (dataArr[0] == 'spotify-this-song') {
				spotifyThisSong(dataArr[1]);
			} else if (dataArr[0] == 'movie-this') {
				movieThis(dataArr[1]);
			} else if (dataArr[0] == 'concert-this') {
				concertThis(dataArr[1]);
			}
		}	
	});
}







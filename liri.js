require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const fs = require("fs");
var action = process.argv[2];
var value = process.argv.slice(3).join(" ");
var whatever = false;
// console.log(typeof(value));
process.argv.splice[0, 3];

cases();

function cases(){
    switch (action) {
    case "concert-this":
        bands();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        if (value.length === 0) {
            value = "Mr. Nobody.";
            return movie();
        }
        else
            (movie())
        break;
    case "do-what-it-says":
        if(!whatever){
        doWhatItSays();}
        break;
}

}
function movie() {
    axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy").then(


        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Langauge: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }

    )
}

//concert-this - searches the Bands in Town Artist Events API
//spotify-this-song Show Artist, song's name, preview link, album
//movie-this - general movie data
//do-what-it-says -
function bands() {
    axios.get("https://rest.bandsintown.com/artists/" + value
        + "/events?app_id=codingbootcamp").then(function (response) {
            response.data.forEach(function (event) {
                console.log(event.venue.name)
                console.log(event.venue.city)
                console.log(event.datetime)
            });
        });

}
function spotifyThis() {
    if (value.trim().length === 0) {
        spotify
            .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
            .then(function (response) {

                console.log(response.album.artists[0].name);
                console.log(response.album.name);
                console.log(response.name);
                console.log(response.preview_url);
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    }


    else (
        spotify
            .search({ type: 'track', query: value, limit: 1 })
            .then(function (response) {
                //Artist
                console.log(response.tracks.items[0].album.artists[0].name)
                //Song Name
                console.log(response.tracks.items[0].name)
                // Preview Link
                console.log(response.tracks.items[0].preview_url)
                // Album
                console.log(response.tracks.items[0].album.name)
            }))


        .catch(function (err) {
            console.log(err);
        });

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        action = dataArr[0];
        console.log(action);
        value = dataArr[1];
        console.log(value);

        console.log(dataArr);
        whatever = true;
        cases();
        


    })};
# Comparify

Web App From Scratch @cmda-minor-web 2020 - 2021

Comparify is an application that lets a user compare their own playlists to
playlists from other users. When a user compares their playlist to another
playlist the following information will be displayed to the user:

-  Matching songs

## Actor Diagram

<img width="1769" alt="Schermafbeelding 2021-02-09 om 15 18 54" src="https://user-images.githubusercontent.com/43675725/107376402-258fba80-6aea-11eb-9ce9-4cf162a1e649.png">

## Live Demo

-  [Link to live demo](https://spotify-authentication.netlify.app)

## Installation Guide

For security reasons, the spotify key has not been included, feel free to create
your own for free.

[Spotify Dashboard](https://developer.spotify.com/dashboard/)

1. Navigate to desired directory `cd desktop`
2. Clone the repo to directory
   `git clone https://github.com/benl95/web-app-from-scratch-2021.git`
3. Open folder in desired code editor

## Features

-  Compare playlists to each other.
-  Matching songs will be displayed to user

## Data

The Spotify API will be used in this application to get playlists from users.

There are four ways of authorization to access the Spotify API and fetch the
desired data. These are the following:

-  [Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow)
-  [Authorization Code Flow With Proof Key For Exchange](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow-with-proof-key-for-code-exchange-pkce)
-  [Implicit Grant Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow)
-  [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow)

I will be using the Implicit
[Implicit Grant Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow)
flow to fetch the data, since the other authorization flows will require
Node.js.

Example fetching data:

```js
const options = {
	headers: {
		Authorization: 'Bearer ' + access_token,
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	json: true,
};

fetchData(endpoints, options)
	.then(convertToJSON)
	.then((data) => {
		console.log('Data: ', data); // Return an array of objects containing personal info about my Spotify user account
	});
```

## To Do's

-  [x] Fetch data from API
-  [x] Fetch tracks from a playlist
-  [ ] Render playlist to view

## License

[MIT License](https://opensource.org/licenses/MIT)

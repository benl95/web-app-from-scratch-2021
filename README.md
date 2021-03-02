# WAFS

Web App From Scratch @cmda-minor-web 2020 - 2021

This project is made with the Spotify API. It lets a user log in with his/her
spotify account and all the playliststs of the user will be shown on the screen.
When a user clicks on a playlist the tracks of a playlist will be shown on the
detail page

-  [Link to live demo](https://spotify-authentication.netlify.app)

## Actor Diagram

<img width="1286" alt="Schermafbeelding 2021-03-02 om 20 30 36" src="https://user-images.githubusercontent.com/43675725/109703877-4487e680-7b96-11eb-98a3-0f6298f714cd.png">


## Interaction diagram

<img width="1833" alt="Schermafbeelding 2021-03-02 om 20 30 17" src="https://user-images.githubusercontent.com/43675725/109703784-2ae69f00-7b96-11eb-95eb-8f9cfe4e350f.png">


## Installation Guide

For security reasons, the spotify key has not been included, feel free to create
your own for free at:

[Spotify Dashboard](https://developer.spotify.com/dashboard/)

1. Navigate to desired directory `cd desktop`
2. Clone the repo to directory
   `git clone https://github.com/benl95/web-app-from-scratch-2021.git`
3. Open folder in desired code editor
4. Create a `config.js` file in the main folder

   ```js
   export const clientID = 'ClIENT-ID-HERE',
   ```

5. Open `index.html` in live server

## Features

-  Get playlists of logged in user
-  Display the tracks a playlist when the user clicks on a playlist

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

-  [x] Connect to API
-  [x] Fetch a list of playlists
-  [x] Fetch tracks from a playlist
-  [x] Filter raw data
-  [x] Render list of playlists to view
-  [x] Set up routing for home and detail page
-  [x] Render songs of a playlist to view
-  [x] Style pages
-  [ ] Create compare function to compare playlists to each other on matching
       songs

## License

[MIT License](https://opensource.org/licenses/MIT)

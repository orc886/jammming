const CLIENT_ID = "ff52ce12ae4d4406b9d029f1b21361b8";
const REDIRECT_URI = "http://localhost:3000/";

let accessToken, expiresIn;

class Spotify {
	getAccessToken() {
		if(accessToken)
			return accessToken;
		
		let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
	
		if(accessTokenMatch==null || expiresInMatch==null)
		{
			window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
		}
		else
		{
			accessToken = accessTokenMatch[1];
			expiresIn = expiresInMatch[1];
		
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		}
		
		return accessToken;
	}
	
	search(term) {
		let token = this.getAccessToken();
		let headers = {Authorization: `Bearer ${token}`};
		
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term}`,
			{headers: headers}).then(response => response.json()).then(jsonResponse => {
				if (jsonResponse.tracks.items) {
					return jsonResponse.tracks.items.map(track => {
						return {
							id: track.id,
							name: track.name,
							artist: track.artists[0].name,
							album: track.album.name,
							uri: track.uri
						}
					});
				}
			});
	}
	
	savePlaylist(name, trackURIs) {
		if(!name || !trackURIs)
			return;
		
		let token = this.getAccessToken();
		let headers = {Authorization: `Bearer ${token}`};
		
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me`,
			{headers: headers}).then(response => response.json()).then(jsonResponse => {
				if (jsonResponse.id) {
					let userID = jsonResponse.id;
					
					return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userID}/playlists`,
						{headers: headers, method: 'POST', body: JSON.stringify({name: name})}).then(response => response.json()).then(jsonResponse => {
							if (jsonResponse.id) {
								let playlistID = jsonResponse.id;
								
								return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
									{headers: headers, method: 'POST', body: JSON.stringify({uris: trackURIs})}).then(response => response.json()).then(jsonResponse => {
										return jsonResponse.snapshot_id;
									});
							}
						});
				}
			});
	}
}

export default Spotify;
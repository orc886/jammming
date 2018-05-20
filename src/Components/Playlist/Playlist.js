import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';


class Playlist extends Component {
	constructor(params) {
		super(params);
		this.state = {};
		this.handleNameChange = this.handleNameChange.bind(this);
	}
	
	handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}
	
	render() {
		return (
			<div className="Playlist">
				<input onChange={this.handleNameChange} value={this.props.Name}/>
				<TrackList Tracks={this.props.Tracks} isRemoval={true} onRemove={this.props.onRemove}/>
				<a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

export default Playlist;
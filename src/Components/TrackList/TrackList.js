import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends Component {
	constructor(params) {
		super(params);
		this.state = {};
	}
	
	render() {
		if(!this.props.Tracks)
			return "";
		
		return (
			<div className="TrackList">
			{
				this.props.Tracks.map(track => <Track key={track.id} Track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>)
			}
			</div>
		);
	}
}

export default TrackList;
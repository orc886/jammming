import React, { Component } from 'react';
import './Track.css';


class Track extends Component {
	constructor(params) {
		super(params);
		this.state = {};
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}
	
	renderAction(isRemoval) {
		if (isRemoval)
			return (
				<a className="Track-action" onClick={this.removeTrack}>-</a>
			);
		else
			return (
				<a className="Track-action" onClick={this.addTrack}>+</a>
		);
	}
	
	addTrack() {
		this.props.onAdd(this.props.Track);
	}
	
	removeTrack() {
		this.props.onRemove(this.props.Track);
	}
	
	render() {
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{this.props.Track.name}</h3>
					<p>{this.props.Track.artist} | {this.props.Track.album}</p>
				</div>
				{this.renderAction(this.props.isRemoval)}
			</div>
		);
	}
}

export default Track;
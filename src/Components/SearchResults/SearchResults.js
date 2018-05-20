import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';


class SearchResults extends Component {
	constructor(params) {
		super(params);
		this.state = {};
	}
	
	render() {
		return (
			<div className="SearchResults">
			  <h2>Results</h2>
			  <TrackList Tracks={this.props.Results} onAdd={this.props.onAdd} isRemoval={false}/>
			</div>
		);
	}
}

export default SearchResults;
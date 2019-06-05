import React, { Component } from 'react';
import Movie from './Movie';

export default class Home extends Component {
	constructor() {
		super();

		this.state = {
			searchTerm: ''
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		const filteredMovies = this.props.movies.filter(movie => {
			return movie.title.toLowerCase().includes(this.state.searchTerm.toLowerCase());
		});

		return (
			<div className='content'>
				<div className='header'>
					<h1>TMDB Graphic</h1>
				</div>
				<div className='search-container'>
					<input 
						className='search' 
						placeholder='Search' 
						type='text' 
						value={this.state.searchTerm}
						onChange={this.handleChange}
					/>
					<i className='material-icons search-icon'>
						search
					</i>
				</div>
				<div className='pop-title'>
					<h1>Popular Movies</h1>
				</div>
				<div className='movie-container'>
					{filteredMovies.map(movie => 
						<Movie movie={movie} key={movie.id}	/>
					)}
				</div>
			</div>
		)
	}
}
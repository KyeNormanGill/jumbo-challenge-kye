import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Functions from '../functions/Movies';
import MovieInfo from './MovieInfo';
import Home from './Home';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			movies: []
		}
	}

	async componentDidMount() {
		const movies = await Functions.getPopular();

		this.setState({ movies: movies });
	}
	
	render() {
		return (
			<BrowserRouter>

				<Route
					exact
					path='/'
					render={() => <Home movies={this.state.movies} />}
				/>

				<Route 
					path='/movie/:id'
					component={MovieInfo}
				/>

			</BrowserRouter>
		)
	}
}

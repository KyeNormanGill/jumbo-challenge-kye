import React, { Component } from 'react';
import Functions from '../functions/Movies';

export default class MovieInfo extends Component {
	constructor() {
		super();
		this.state = {
			info: {
				title: null,
				length: null,
				date: null,
				url: null,
				overview: null,
				vote: null,
				backdropUrl: null
			}
		}

		this.goBack = this.goBack.bind(this);
	}

	async componentDidMount() {
		const info = await Functions.getMovie(this.props.location.pathname.replace('/movie/', ''));

		this.setState({ info });
	}

	goBack() {
		this.props.history.goBack();
	}

	render() {
		const { info } = this.state;

		return (
			<div className='info-content'>
				<div style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${info.backdropUrl})`,
					height: '300px',
					backgroundSize: 'cover'
				}} />
				<div className='info-container'>
					<div className='info-image-container'>
						<img className='info-image' alt={info.title} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${info.url}`} />
					</div>
					<div className='info-header'>
						<div></div>
						<div className='info-title'>
							<h1>{info.title}</h1>
						</div>
						<div className='info-data'>
							<p>{info.date} * {info.vote} User Score</p>
							<p>{info.length}</p>
						</div>
					</div>
				</div>
				<hr/>
				<div className='overview-title'>
					<h2>Overview</h2>
				</div>
				<div className='overview'>
					<p>{info.overview}</p>
				</div>
				
				<div onClick={this.goBack} className='back-button'>
					<i className='material-icons'>
						keyboard_backspace
					</i>
				</div>
			</div>
		)
	}
}
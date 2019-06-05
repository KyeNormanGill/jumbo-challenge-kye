import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ movie }) => (
	<Link className='movie'	to={`/movie/${movie.id}`}>
		<div>
			<div className='image-container'>
				<div className={`vote ${movie.vote < 70 ? movie.vote < 40 ? 'alright' : 'ehh' : 'good' }`}>{movie.vote}%</div>	
				<img className='movie-image' alt={movie.title} src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.url}`}/ >
			</div>
			<h1 className='title'>{movie.title}</h1>
			<h2 className='date'>{movie.date}</h2>
		</div>
	</Link>
);

export default Home;
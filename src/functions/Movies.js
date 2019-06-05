import { apiKey } from '../config';
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const cache = {};

const Functions = {
	get: async(url) => {
		const response = await fetch(url).catch(e => console.error(e));
		return response.json();
	},
	getPopular: async() => {
		if (!cache.movies) {
			const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

			const response = await Functions.get(url);

			cache.movies = response.results.map(res => {
				const releaseDate = new Date(res.release_date);
				console.log(String(res.vote_average).replace('.', ''));
				
				return {
					id: res.id,
					title: res.title,
					date: `${monthNames[releaseDate.getMonth()]} ${releaseDate.getFullYear()}`,
					vote: parseVote(String(res.vote_average).replace('.', '')),
					url: res.poster_path
				}
			});
		}

		return cache.movies;
	},
	getMovie: async(id) => {
		if (!cache[id]) {
			const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

			const response = await Functions.get(url);
			
			cache[id] = {
				title: response.original_title,
				date: new Date(response.release_date).getFullYear(),
				vote: parseVote(String(response.vote_average).replace('.', '')),
				length: convertMinutes(response.runtime),
				url: response.poster_path,
				backdropUrl: response.backdrop_path,
				overview: response.overview
			}
		}

		return cache[id];
	}
}

function convertMinutes(num) { 
	if (!num) return 'Runtime not known'

	const hours = Math.floor(num / 60);  
	const minutes = num % 60;

	return `${hours}h ${minutes} min`;         
}

function parseVote(vote) {
	if (vote.length === 1) {
		return vote += '0';
	}
	
	return vote;
}

export default Functions;
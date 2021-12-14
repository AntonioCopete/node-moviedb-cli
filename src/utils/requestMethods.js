function getPaginatedOptions(path, page, apiKey) {
	return {
		href: 'https://api.themoviedb.org',
		protocol: 'https:',
		hostname: 'api.themoviedb.org',
		path: `/3/${path}?page=${page}`,
		port: 443,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
	}
}

function getPersonOptions(path, personId, apiKey) {
	return {
		href: 'https://api.themoviedb.org',
		protocol: 'https:',
		hostname: 'api.themoviedb.org',
		path: `/3/${path}/${personId}`,
		port: 443,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
	}
}

function getReviewOptions(path, id, apiKey, rew) {
	return {
		href: 'https://api.themoviedb.org',
		protocol: 'https:',
		hostname: 'api.themoviedb.org',
		path: `/3/${path}/${id}/${rew}`,

		port: 443,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
	}
}

function getIdOptions(path, id, apiKey) {
	return {
		href: 'https://api.themoviedb.org',
		protocol: 'https:',
		hostname: 'api.themoviedb.org',
		path: `/3/${path}/${id}`,
		port: 443,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
	}
}

module.exports = {
	getPaginatedOptions,
	getIdOptions,
	getReviewOptions,
	getPersonOptions,
}

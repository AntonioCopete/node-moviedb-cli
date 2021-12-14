const https = require('https')
const dotenv = require('dotenv')
dotenv.config({
	path: 'src/variables.env',
})
const API = process.env.API_KEY
const styles = require('./utils/styleData')
const ora = require('ora')

const requestMethods = require('./utils/requestMethods')

const { Command } = require('commander')

const program = new Command()
program.version('0.0.1')

program
	.command('get-persons')
	.description('Make a network request to fetch the most popular persons')
	.requiredOption('-p, --popular', 'fetch popular people')
	.requiredOption(
		'--page <number>',
		'The page of persons data results to fetch'
	)
	.action((programOptions) => {
		const reqOptions = requestMethods.getPaginatedOptions(
			'person/popular',
			programOptions.page,
			API
		)

		const req = https.request(reqOptions, (res) => {
			console.log(`statusCode: ${res.statusCode}`)
			let body = ''
			const spinner = ora('Loading people')

			res
				.on('data', (data) => {
					spinner.start()
					body += data
				})
				.on('end', () => {
					spinner.succeed('Person fetched successfuly')
					let jsonResponse = JSON.parse(body)
					const dataResults = jsonResponse.results
					styles.styleData(dataResults)
				})
		})

		req.on('error', () => {
			spinner.fail('Fetching error')
		})

		req.end()
	})

program
	.command('get-movie')
	.description(' Make a network request to fetch the data of a single movie')
	.requiredOption('--id <number>', 'The id of the movie')
	.option('-r, --reviews <boolean>', 'Fetch the reviews of the movie', 'false')
	.action((actions) => {
		if (actions.reviews == 'true') {
			const reviews = requestMethods.getReviewOptions(
				'movie',
				actions.id,
				API,
				'reviews'
			)
			const req = https.request(reviews, (res) => {
				console.log(`statusCode: ${res.statusCode}`)
				let body = ''
				const spinner = ora('Loading movie review details').start()

				res
					.on('data', (data) => {
						body += data
					})
					.on('end', () => {
						spinner.succeed('Fetched movie review succeed')
						let jsonResponse = JSON.parse(body)
						const dataResults = jsonResponse.results
						styles.styleReview(dataResults[0])
					})
			})

			req.on('error', (error) => {
				spinner.fail('Fetched movie review failed')
				console.error(error)
			})

			req.end()
		} else if (actions.reviews == 'false') {
			const movie = requestMethods.getIdOptions('movie', actions.id, API)
			const req = https.request(movie, (res) => {
				console.log(`statusCode: ${res.statusCode}`)
				let body = ''
				const spinner = ora('Loading movie details').start()

				res
					.on('data', (data) => {
						body += data
					})
					.on('end', () => {
						spinner.succeed('Movie fetching succeed')
						let jsonResponse = JSON.parse(body)
						const dataResults = jsonResponse
						styles.styleMovie(dataResults)
					})
			})

			req.on('error', (error) => {
				spinner.fail('Movie fetching fail')
				console.error(error)
			})

			req.end()
		}
	})

program
	.command('get-person')
	.description('Make a network request to fetch the data of a single person')
	.requiredOption('-i, --id <number>', 'The id of the person')
	.action((param) => {
		const personId = param.id
		const reqOptions = requestMethods.getPersonOptions('person', personId, API)
		let body = ''
		const req = https.request(reqOptions, (res) => {
			const spinner = ora('Fetching the person data...').start()

			res
				.on('data', (data) => {
					body += data
				})
				.on('end', () => {
					const jsonResponse = JSON.parse(body)
					styles.stylePerson(jsonResponse)

					spinner.succeed('Person data loaded')
				})
		})
		req.on('error', () => {
			spinner.fail('Person load failed')
		})
		req.end()
	})

program
	.command('get-movies')
	.description('Make a network request to fetch movies')
	.requiredOption('--page <number>', 'The page of movies data results to fetch')
	.option('-p, --popular', 'Fetch the popular movies')
	.option('-n, --now-playing', 'Fetch the movies that are playing now')
	.action((programOptions) => {
		console.log(programOptions.page)

		let requestPath = 'movie/'

		if (programOptions.popular) {
			requestPath += 'popular'
		} else if (programOptions.nowPlaying) {
			requestPath += 'now_playing'
		} else if (!programOptions.nowPlaying && !programOptions.popular) {
			requestPath += 'popular'
		}

		const reqOptions = requestMethods.getPaginatedOptions(
			requestPath,
			programOptions.page,
			API
		)

		const req = https.request(reqOptions, (res) => {
			let body = []
			const spinner = ora('Fetching the movies data')
			// .start()

			res
				.on('data', (data) => {
					spinner.succeed('person data loaded')
					body += data
				})
				.on('end', () => {
					// setTimeout(() => {
					//   spinner.stop()
					// }, 2000)
					let jsonResponse = JSON.parse(body)
					const dataResults = jsonResponse.results
					styles.styleMovies(dataResults)
				})
		})
		req.on('error', () => {
			spinner.fail('person load failed')
		})
		req.end()
	})
// if (programOptions.save) {
//   fsMethods.storePersonsData(jsonResponse);
// }

program.parse(process.argv)

const chalk = require('chalk')
const log = console.log

function styleData(dataRes) {
	dataRes.forEach((actor) => {
		log(chalk.white('Person:'))
		log(`Id: ${chalk.white(actor.id)}`)
		log(`Name: ${chalk.blue(actor.name)}`)
		log(`Department: ${chalk.magenta(actor.known_for_department)}`)

		const films = actor.known_for
		films.forEach((film) => {
			if (film.title) {
				log('\n')
				log(chalk.white('\tMovie'))
				log(chalk.white(`\tId: ${film.id}`))
				log(chalk.white(`\tRelease date: ${film.release_date}`))
				log(chalk.white(`\tTitle: ${film.title}`))
				log('\n')
			} else if (films === undefined) {
				log(chalk.green(`${actor.name} doesn't appear in any movie\n`))
			}
		})
		log(chalk.white('---------------------------------------------'))
	})
}

function styleMovie(dataRes) {
	console.group('Movie:')
	log(chalk.white('******************'))
	log(`ID: ${chalk.white(dataRes.id)}`)
	log(`Title: ${chalk.magenta(dataRes.title)}`)
	log(`Release Date: ${chalk.white.bgBlue(dataRes.release_date)}`)
	log(`Runtime: ${chalk.white(dataRes.runtime)}`)
	log(`Vote Count: ${chalk.white(dataRes.vote_count)}`)
	log(chalk.white('--------------------'))
	console.group('Overview:')
	log(`${chalk.white(dataRes.overview)}`)
	console.groupEnd('Overview:')
	console.groupEnd('Movie')
	log(`Genres: ${chalk.white(dataRes.genres)}`)
	log(`Language: ${chalk.white(dataRes.original_language)}`)
}

function styleReview(dataRes) {
	console.group('Review:')
	log(chalk.white('******************'))
	log(`Author: ${chalk.magenta(dataRes.author)}`)
	console.group('Content:')
	log(`${chalk.white(dataRes.content)}`)
	console.groupEnd('Content')
	log(chalk.white('-------------------'))
	console.groupEnd('Review')
}

function stylePerson(person) {
	log(chalk.white('\n----------------------------------------'))
	log(chalk.white('Person:\n'))
	log(`ID: ${chalk.white(person.id)}`)
	log(`Name: ${chalk.bold.blue(person.name)}`)
	log(
		`Birthday: ${chalk.white(
			person.birthday + chalk.gray(' | ') + person.place_of_birth
		)}`
	)

	if (person.known_for_department == 'Acting') {
		log(`Department: ${chalk.magenta(person.known_for_department)}`)
	}
	log(`Biography: ${chalk.bold.blue(person.biography)}`)

	if (person.also_known_as && person.also_known_as.length > 0) {
		log(chalk('\n'))
		log(chalk.white('Also known as:\n'))

		log(chalk(person.also_known_as.join('\n')))
	} else {
		log(chalk('\n'))
		log(chalk.yellow(`${person.name} doesn’t have any alternate names`))
	}
}

function styleMovies(dataRes) {
	dataRes.forEach((movie) => {
		log(chalk.italic.white('----------------------'))
		log(chalk.white(''))
		log(`\t${chalk.white(`Movie:\n`)}`)
		log(`\tId: ${chalk.bold.white(movie.id)}`)
		log(`\tTitle: ${chalk.bold.blue(movie.title)}`)
		log(`\tRelease Date: ${chalk.bold.blue(movie.release_date)}`)
		log(chalk.white('\n'))
	})
}

module.exports = {
	styleData,
	styleMovies,
	stylePerson,
	styleMovie,
	styleReview,
}

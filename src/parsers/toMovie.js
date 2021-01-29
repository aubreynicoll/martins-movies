const toMovie = (object) => {
  return {
    id: object.id,
    title: object.title,
    genres: object.genres.map(genre => genre.name),
    overview: object.overview,
    voteAverage: object.vote_average,
    imdbId: object.imdb_id,
    image: object.poster_path,
    releaseYear: object.release_date.substring(0, 4),
    languages: object.spoken_languages.map(language => language.name),
  }
}

export default toMovie
const toMovie = (object) => {
  const languageName = new Intl.DisplayNames(['en'], { type: 'language', fallback: 'none' })
  
  return {
    id: object.id,
    title: object.title,
    genres: object.genres.map(genre => genre.name),
    overview: object.overview,
    voteAverage: object.vote_average,
    imdbId: object.imdb_id,
    image: object.poster_path,
    releaseYear: object.release_date.substring(0, 4),
    language: languageName.of(object.original_language) ?? 'Unknown',
    video: object.videos.results.filter(r => r.type === 'Trailer')[0]
  }
}

export default toMovie
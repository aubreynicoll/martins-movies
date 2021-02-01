const toMovie = (object) => {
  const languageName = new Intl.DisplayNames(['en'], { type: 'language', fallback: 'none' })
  
  return {
    id: object.id,
    title: object.title,
    genres: object.genres.map(genre => genre.name),
    overview: object.overview,
    voteAverage: object.vote_average,
    imdbLink: object.imdb_id ? `https://www.imdb.com/title/${object.imdb_id}/` : null,
    image: object.poster_path ? `http://image.tmdb.org/t/p/w342/${object.poster_path}` : null,
    releaseYear: object.release_date.substring(0, 4),
    language: languageName.of(object.original_language) ?? 'Unknown',
    youtubeUrl: object.videos.results.filter(r => r.type === 'Trailer' && r.site === 'YouTube')[0]?.key
  }
}

export default toMovie
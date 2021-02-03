const toMovie = (object, genreMap) => {
  const languageName = new Intl.DisplayNames(['en'], { type: 'language', fallback: 'none' })
  
  return {
    id: object.id,
    title: object.title,
    genres: object.genre_ids.map(id => genreMap.genres.find(genre => id === genre.id).name),
    overview: object.overview,
    voteAverage: object.vote_average,
    image: object.backdrop_path ? `http://image.tmdb.org/t/p/w300/${object.backdrop_path}` : null,
    releaseYear: object.release_date.substring(0, 4),
    language: languageName.of(object.original_language) ?? 'Unknown'
  }
}

export default toMovie
import ISO6391 from 'iso-639-1'

const toMovie = (object, genreMap) => {
  
  return {
    id: object.id,
    hasDetails: false,
    title: object.title,
    genres: object.genre_ids.map(id => genreMap.find(genre => id === genre.id).name),
    overview: object.overview,
    voteAverage: object.vote_average,
    image: object.backdrop_path ? `http://image.tmdb.org/t/p/w300/${object.backdrop_path}` : null,
    releaseYear: object.release_date.substring(0, 4),
    language: ISO6391.getName(object.original_language) ?? 'Unknown'
  }
}

export default toMovie
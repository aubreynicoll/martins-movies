const toMovieDetails = (object) => {
  
  return {
    id: object.id,
    imdbLink: object.imdb_id ? `https://www.imdb.com/title/${object.imdb_id}/` : null,
    youtubeId: object.videos.results.filter(r => r.type === 'Trailer' && r.site === 'YouTube')[0]?.key
  }
}

export default toMovieDetails
import React, { useState, useEffect } from 'react'
import { MovieCard } from '.'
import { moviesService } from '../services'

const MovieListView = () => {
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    const awaitMovieData = async () => {
      const movieData = await moviesService.getAll()
      setMoviesList(movieData)
    }
    awaitMovieData()
  }, [])

  return (
    <div>
      <MovieCard />
    </div>
  )
}

export default MovieListView
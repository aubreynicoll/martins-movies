import React, { useState, useEffect } from 'react'
import { MovieCard } from '.'
import { moviesService } from '../services'
import { localStorageWithTTL } from '../utils'

const MovieListView = () => {
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    const awaitMovieData = async () => {
      const movieData = await moviesService.getAll()
      setMoviesList(movieData)
      localStorageWithTTL.setItem('moviesList', movieData, 1)
    }

    const cachedMovieData = localStorageWithTTL.getItem('moviesList')

    if (cachedMovieData) {
      setMoviesList(cachedMovieData)
    } else {
      awaitMovieData()
    }    
  }, [])

  return (
    <div className="MovieListView-root">
      <MovieCard />
    </div>
  )
}

export default MovieListView
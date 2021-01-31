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

      const HoursToLive = 1
      localStorageWithTTL.setItem('moviesList', movieData, HoursToLive)
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
      <div className="MovieListView-container">
        {moviesList.map(movie => (
          <MovieCard className="MovieListView-item" />
        ))}
      </div>
    </div>
  )
}

export default MovieListView
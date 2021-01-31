import React, { useState, useEffect } from 'react'
import { MovieCard } from '.'
import { moviesService } from '../services'
import { localStorageWithTTL } from '../utils'

const MovieListView = ({ searchQuery }) => {
  const [moviesList, setMoviesList] = useState([])
  const [watchedMoviesList, setWatchedMoviesList] = useState([])

  // initialize state...
  useEffect(() => {
    const awaitMovieData = async () => {
      const movieData = await moviesService.getAll()
      setMoviesList(movieData)

      const HoursToLive = 1
      localStorageWithTTL.setItem('moviesList', movieData, HoursToLive)
    }

    // initialize moviesList from localStorage...
    const cachedMovieData = localStorageWithTTL.getItem('moviesList')
    if (cachedMovieData) {
      setMoviesList(cachedMovieData)
    } else {
      awaitMovieData()
    }

    // initialize watchedMoviesList from localStorage...
    const cachedWatchedMoviesList = JSON.parse(localStorage.getItem('watchedMoviesList'))
    if (cachedWatchedMoviesList) {
      setWatchedMoviesList(cachedWatchedMoviesList)
    }
  }, [])

  // add or remove movie id...
  const handleWatchedButtonClick = (movie) => {
    if (watchedMoviesList.includes(movie.id)) {
      setWatchedMoviesList(watchedMoviesList.filter(id => id !== movie.id))
    } else {
      setWatchedMoviesList([...watchedMoviesList, movie.id])
    }
  }

  // then save watchedMoviesList to localStorage...
  useEffect(() => {
    localStorage.setItem('watchedMoviesList', JSON.stringify(watchedMoviesList))
  }, [watchedMoviesList])

  // filter movies by searchQuery...
  const moviesBySearch = searchQuery
    ? moviesList.filter(movie => (
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        || movie.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
        || movie.language.toLowerCase().includes(searchQuery.toLowerCase())
        || movie.releaseYear.includes(searchQuery)
      ))
    : moviesList

  return (
    <div className="MovieListView-root">
      <div className="MovieListView-container">
        {moviesBySearch.map(movie => (          
          <MovieCard 
            key={movie.id} 
            movie={movie}
            isWatched={watchedMoviesList.includes(movie.id)}
            handleWatchedButtonClick={() => handleWatchedButtonClick(movie)}
            className="MovieListView-item" 
          />
        ))}
      </div>
    </div>
  )
}

export default MovieListView
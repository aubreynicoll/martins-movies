import React, { useState, useEffect } from 'react'
import { MovieCard, Pagination, SplashScreen } from '.'
import { moviesService } from '../services'
import { localStorageWithTTL } from '../utils'

const MovieListView = ({ searchQuery }) => {
  const [moviesList, setMoviesList] = useState([])
  const [pageOfMovies, setPageOfMovies] = useState([])
  const [watchedMoviesList, setWatchedMoviesList] = useState([])
  const [showSplash, setShowSplash] = useState(true)

  // initialize state...
  useEffect(() => {
    const awaitMovieData = async () => {
      try {
        const movieData = await moviesService.getAll()
        setMoviesList(movieData)
        setShowSplash(false)

        const HoursToLive = 0
        localStorageWithTTL.setItem('moviesList', movieData, HoursToLive)
      } catch (error) {
        console.error(error)
      }      
    }

    // initialize moviesList from localStorage, else from server...
    const cachedMovieData = localStorageWithTTL.getItem('moviesList')
    if (cachedMovieData) {
      setMoviesList(cachedMovieData)
      setShowSplash(false)
    } else {
      awaitMovieData()
    }

    // initialize watchedMoviesList from localStorage...
    const cachedWatchedMoviesList = JSON.parse(localStorage.getItem('watchedMoviesList'))
    if (cachedWatchedMoviesList) {
      setWatchedMoviesList(cachedWatchedMoviesList)
    }
  }, [])

  // add or remove movie id from array...
  const handleWatchedButtonClick = (movie) => {
    if (watchedMoviesList.includes(movie.id)) {
      setWatchedMoviesList(watchedMoviesList.filter(id => id !== movie.id))
    } else {
      setWatchedMoviesList([...watchedMoviesList, movie.id])
    }
  }

  // save watchedMoviesList to localStorage...
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

  // update pageOfMovies when page is changed
  const onChangePage = (pageOfItems) => {
    setPageOfMovies(pageOfItems)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pageOfMovies])

  if (showSplash) return <SplashScreen />

  return (
    <div className="MovieListView-root">
      <div className="MovieListView-container">
        {pageOfMovies.map(movie => (          
          <MovieCard 
            key={movie.id} 
            movie={movie}
            isWatched={watchedMoviesList.includes(movie.id)}
            handleWatchedButtonClick={() => handleWatchedButtonClick(movie)}
            className="MovieListView-item" 
          />
        ))}
      </div>
      <div className="MovieListView-pagination-container">
        <Pagination items={moviesBySearch} onChangePage={onChangePage} pageSize={6} searchQuery={searchQuery} moviesList={moviesList} />
      </div>
    </div>
  )
}

export default MovieListView
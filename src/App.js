import React, { useState, useEffect } from 'react'
import moviesService from './services/moviesService'

const App = () => {
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    const awaitMovieData = async () => {
      const movieData = await moviesService.getAll()
      setMoviesList(movieData)
    }
    awaitMovieData()
  }, [])

  console.log(moviesList)

  return (
    <div>
      <h1>Hello World!</h1>
      <ul>
        {moviesList.map((movie => (
          <li key={movie.id}>
            {movie.title}
          </li>
        )))}
      </ul>
    </div>
  )
}

export default App
import axios from 'axios'
import { toMovie } from '../parsers'

const baseUrl = 'https://api.themoviedb.org/3/movie'
const api_key = process.env.REACT_APP_API_KEY

const getAll = async () => {
  // for fun, we pull a random number of movies from the top_rated endpoint...
  const maxMovies = 8310
  const moviesPerPage = 20
  const nMovies = 8310 // Math.floor(Math.random() * maxMovies)
  const nPages = Math.ceil(nMovies / moviesPerPage)

  // get array of top_rated movie ids...
  let promisesArray = []
  for (let i = 1; i <= nPages; i++) {
    promisesArray.push(axios.get(`${baseUrl}/top_rated`, { params: { api_key, page: i } }))
  }
  let responsesArray = await axios.all(promisesArray)
  const idArray = responsesArray.map(response => (
    response.data.results.map(result => (
      result.id
    ))
  ))

  // use movie ids to get detailed data...
  promisesArray = idArray.map(id => axios.get(`${baseUrl}/${id}`, { params: { api_key, append_to_response: 'videos' } }))
  responsesArray = await axios.all(promisesArray)

  const movieObjArray = responsesArray.map(response => response.data).flat()
  return movieObjArray.map(movieObj => toMovie(movieObj)) // return formatted data
}

const moviesService = {
  getAll,
}

export default moviesService
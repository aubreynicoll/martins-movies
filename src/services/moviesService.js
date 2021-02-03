import axios from 'axios'
import { toMovie, toMovieDetails } from '../parsers'

const baseUrl = 'https://api.themoviedb.org/3'
const api_key = process.env.REACT_APP_API_KEY

const getAll = async () => {
  try {
    // programmatically get number of pages...
    const { data: { total_pages: nPages } } = await axios.get(`${baseUrl}/movie/top_rated`, { params: { api_key } })

    // get array of top_rated movie ids...
    let promisesArray = []
    for (let i = 1; i <= nPages; i++) {
      promisesArray.push(axios.get(`${baseUrl}/movie/top_rated`, { params: { api_key, page: i } }))
    }
    let responsesArray = await axios.all(promisesArray)
    const movieObjArray = responsesArray.flatMap(response => (
      response.data.results
      )
    )

    // fetch genreMap for toMovie parser...
    const genreMap = await getGenreMap()

    return movieObjArray.map(movieObj => toMovie(movieObj, genreMap)) // return formatted data
  } catch (error) {
    console.error(error)
  }
}

const getDetailsByIds = async (ids) => {
  try {
    const promisesArray = ids.map(id => getDetailsById(id))
    const movieDetailsArray = Promise.all(promisesArray)
    return movieDetailsArray
  } catch (error) {
    console.error(error)
  }
}

const getDetailsById = async (id) => {
  try {
    const { data: movieDetailsObj } = await axios.get(`${baseUrl}/movie/${id}`, { params: { api_key, append_to_response: 'videos' } })
    return toMovieDetails(movieDetailsObj) // return formatted data
  } catch (error) {
    console.error(error)
  }
}

const getGenreMap = async () => {
  try {
    const { data: { genres: genreMap } } = await axios.get(`${baseUrl}/genre/movie/list`, { params: { api_key } })
    return genreMap
  } catch (error) {
    console.error(error)
  }
}

const moviesService = {
  getAll,
  getDetailsByIds,
  getDetailsById,
  getGenreMap
}

export default moviesService
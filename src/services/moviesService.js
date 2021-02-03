import axios from 'axios'
import rateLimit from 'axios-rate-limit'
import { toMovie } from '../parsers'

const baseUrl = 'https://api.themoviedb.org/3/movie'
const api_key = process.env.REACT_APP_API_KEY

const getAll = async () => {
  try {
    // programmatically get number of pages...
    const{ data: { total_pages: nPages } } = await axios.get(`${baseUrl}/top_rated`, { params: { api_key } })

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
    )).flat()

    // enforce rate limiting...
    const axiosRateLimit = rateLimit(axios.create(), { maxRequests: 200, perMilliseconds: 1 })
    axiosRateLimit.getMaxRPS()

    // use movie ids to get detailed data...
    promisesArray = idArray.map(id => axiosRateLimit.get(`${baseUrl}/${id}`, { params: { api_key, append_to_response: 'videos' } }))
    responsesArray = await axios.all(promisesArray)

    const movieObjArray = responsesArray.map(response => response.data).flat()
    return movieObjArray.map(movieObj => toMovie(movieObj)) // return formatted data
  } catch (error) {
    console.error(error)
  }
}

const moviesService = {
  getAll,
}

export default moviesService
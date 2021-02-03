import axios from 'axios'
import { toMovie } from '../parsers'

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

const getGenreMap = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/genre/movie/list`, { params: { api_key } })
    return data
  } catch (error) {
    console.error(error)
  }
}

const moviesService = {
  getAll,
}

export default moviesService
import { moviesService } from './services'
const fs = require('fs')

let moviesArray = []
moviesService.getAll().then(response => {
  moviesArray = response
})

let data = JSON.stringify(moviesArray)

fs.writeFile('movie.json', data, (err) => console.error(err))
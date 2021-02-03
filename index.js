const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))

app.get('/health', (req, res) => {
  res.send('OK')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
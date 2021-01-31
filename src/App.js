import React, { useState } from 'react'
import { MovieListView, Header, Footer } from './components';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchFieldChange = (value) => {
    setSearchQuery(value)
  }

  console.log(searchQuery)

  return (
    <div>
      <Header searchQuery={searchQuery} handleSearchFieldChange={handleSearchFieldChange} />
      <main>
        <MovieListView searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  )
}

export default App
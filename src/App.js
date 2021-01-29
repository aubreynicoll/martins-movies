import React, { useState, useEffect } from 'react'
import { MovieListView, Header, Footer } from './components';
import { moviesService } from './services'

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <MovieListView />
      </main>
      <Footer />
    </div>
  )
}

export default App
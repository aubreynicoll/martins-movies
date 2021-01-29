import React from 'react'
import { MovieListView, Header, Footer } from './components';

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
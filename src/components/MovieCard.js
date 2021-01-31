import React from 'react'
import Button from 'react-bootstrap/Button'
import checkIcon from '../assets/icons/check.svg'
import starIcon from '../assets/icons/star.png'
import playIcon from '../assets/icons/play.png'

const MovieCard = ({ movie, isWatched, handleWatchedButtonClick }) => {
  const imdbLink = movie.imdbId ? `https://www.imdb.com/title/${movie.imdbId}/` : null
  const imgSrc = `http://image.tmdb.org/t/p/w342/${movie.image}`
  const trailerLink = movie.video?.site === 'YouTube'
    ? `http://www.youtube.com/watch?v=${movie.video.key}`
    : null

  return (
    <div className="MovieCard-root">
      <div className="MovieCard-img-container">
        <img className="MovieCard-img" src={imgSrc} alt="" />
      </div>

      {trailerLink
        && <a href={trailerLink} target="_blank" rel="noopener noreferrer">
          <div className="MovieCard-play-button">
            <img src={playIcon} alt="" />
          </div>
        </a>
      }

      <div className="MovieCard-details-container">
        <h3>{movie.title}</h3>
        <div className="MovieCard-flex-row">
          <span>
            {movie.language}
            {', '}
            {movie.releaseYear}
          </span>
        </div>
        
        <div className="MovieCard-flex-row">
          <span>
            <img src={starIcon} alt="" width="16" />
            {movie.voteAverage}/10
          </span>
          {' '}
          <span>{movie.genres.slice(0,3).join(', ')}</span>
        </div>

        <p className="MovieCard-overview">
          {movie.overview}
        </p>

        <div className="MovieCard-flex-row">
          <span>
            {imdbLink 
              && <Button href={imdbLink} target="_blank" rel="noopener noreferrer">Read More</Button>
            }
          </span>
          <span>
            <Button 
              variant={isWatched ? 'success' : 'secondary'}
              onClick={handleWatchedButtonClick}
            >
              {isWatched ? <><img src={checkIcon} alt="" width="18" /> Watched</> : 'Watched'}
            </Button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
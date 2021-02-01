import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import checkIcon from '../assets/icons/check.svg'
import starIcon from '../assets/icons/star.png'
import playIcon from '../assets/icons/play.png'
import { TrailerModal } from '.'

const MovieCard = ({ movie, isWatched, handleWatchedButtonClick }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="MovieCard-root">
      <div className="MovieCard-img-container">
        <img className="MovieCard-img" src={movie.image} alt="" />
      </div>

      {movie.youtubeId &&
      <div>
        <div onClick={() => setShowModal(true)} className="MovieCard-play-button">
          <img src={playIcon} alt="" />
        </div>
        <TrailerModal show={showModal} onHide={() => setShowModal(false)} youtubeId={movie.youtubeId} />
      </div>
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
          <span>
            {movie.genres.slice(0,3).join(', ')}
          </span>
        </div>

        <p className="MovieCard-overview">
          {movie.overview}
        </p>

        <div className="MovieCard-flex-row">
          <span>
            {movie.imdbLink 
              && <Button href={movie.imdbLink} target="_blank" rel="noopener noreferrer">Read More</Button>
            }
          </span>
          <span>
            <Button 
              variant={isWatched ? 'success' : 'secondary'}
              onClick={handleWatchedButtonClick}
            >
              {isWatched 
                ? <><img src={checkIcon} alt="" width="18" /> Watched</> 
                : 'Watched'
              }
            </Button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
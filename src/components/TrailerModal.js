import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const TrailerModal = ({ show, onHide, youtubeId }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="TrailerModal-body">
        <iframe 
          title={youtubeId} 
          width="720" 
          height="405" 
          src={`https://www.youtube.com/embed/${youtubeId}`} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        >
        </iframe>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default TrailerModal
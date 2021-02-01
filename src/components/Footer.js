import React from 'react'

const Footer = () => {
  return (
    <footer className="Footer-root">
      <div className="Footer-flex-container">
        <div className="Footer-flex-item">
          <h3>Martin's Movies</h3>
          <p>
            Lorem ipsum dolor sit amet, 
            consectetur adipisicing elit. 
            Itaque, ducimus, atque. 
            Praesentium suscipit provident explicabo 
            dignissimos nostrum numquam deserunt 
            earum accusantium et fugit.
          </p>
        </div>

        <div className="Footer-flex-item">
          <h3>Twitter Feed</h3>
          <p>
            Check us out at <a href="#">@your-twitter-here</a>!
          </p>
        </div>

        <div className="Footer-flex-item">
          <h3>Useful Links</h3>
          <p>
            <a href="#">About Martin's Movies</a>
          </p>
          <p>
            <a href="#">Blog</a>
          </p>
          <p>
            <a href="#">Contact Us</a>
          </p>
          <p>
            <a href="#">Testimonials</a>
          </p>
        </div>

        <div className="Footer-flex-item">
          <h3>Instagram</h3>
          <p>
            Follow us for the latest updates!
          </p>
        </div>
      </div>

      <hr />

      <div className="Footer-links-container">
        <span className="Footer-links-item">
          <a href="#">Privacy &amp; Cookies</a>
          {' '}
          <a href="#">Terms &amp; Conditions</a>
          {' '}
          <a href="#">Legal Disclaimer</a>
          {' '}
          <a href="#">Community</a>
        </span>
        
        <span className="Footer-links-item">
          &copy; Martin's Movies 2021. All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
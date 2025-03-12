import React from 'react';
import './PlacementPage.css';
import Footer from '../../Footer';

const PlacementPage = () => {
  return (
    <div className="placement-page">
      {/* Intro Section */}
      <div className="intro">
        <h1>Our Placement Program</h1>
        <p>
          We are committed to providing career opportunities for our students through strong industry connections and placement drives.
          Here is an overview of our recent placement success and statistics.
        </p>
      </div>

      {/* Placement Statistics */}
      <div className="placement-statistics">
        <div className="stat">
          <img src="/images/placement-success.jpg" alt="Placement Success" />
          <h3>Placement Success Rate</h3>
          <p>95% of our students are successfully placed within 6 months of graduation.</p>
        </div>
        <div className="stat">
          <img src="/images/top-companies.jpg" alt="Top Companies" />
          <h3>Top Hiring Companies</h3>
          <p>Top recruiters like Google, Microsoft, and Amazon are hiring from our institution.</p>
        </div>
      </div>

      {/* Recent Placements */}
      <div className="recent-placements">
        <h2>Recent Placements</h2>
        <div className="placement-details">
          <img src="/images/recent-graduate1.jpg" alt="Recent Graduate" />
          <div>
            <h3>John Doe - Software Engineer</h3>
            <p>Placed in Google with an annual package of $100,000.</p>
          </div>
        </div>
        <div className="placement-details">
          <img src="/images/recent-graduate1.jpg" alt="Recent Graduate" />
          <div>
            <h3>Jane Smith - Data Scientist</h3>
            <p>Placed in Amazon with an annual package of $95,000.</p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="contact-info">
        <h2>Contact Placement Office</h2>
        <p>If you have any questions about placements or upcoming drives, feel free to reach out.</p>
        <p>Email: <a href="mailto:placement@institution.com">placement@institution.com</a></p>
      </div>
      <Footer/>
    </div>
  );
};

export default PlacementPage;

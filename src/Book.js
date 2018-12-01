import React from 'react';
import PropTypes from 'prop-types';
import './Book.css';

export default function Book({ title, authors, images }) {
  return (
    <article className='Book'>
      <div className='Book__Cover'
          style={{ backgroundImage: `url(${images.smallThumbnail})` }}>
        {!images.smallThumbnail && <p>No thumbnail</p>}
      </div>

      {/* TODO: Display more info about the book */}
      <h3 className='Book__Title'>{title}</h3>
      <div className='Book__Authors'>{authors.join(', ')}</div>
    </article>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  images: PropTypes.object.isRequired
};

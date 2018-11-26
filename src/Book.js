import React from 'react';
import PropTypes from 'prop-types';
import './Book.css';

export default function Book({ title, authors, images }) {
  return (
    <div className='book'>
      <div
        className='book__cover'
        style={{ backgroundImage: `url(${images.smallThumbnail})` }} />

      {/* TODO: Display more info about the book */}
      {/* TODO: H3? */}
      <div className='book__title'>{title}</div>
      <div className='book__authors'>{authors.join(', ')}</div>
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  images: PropTypes.object.isRequired
};

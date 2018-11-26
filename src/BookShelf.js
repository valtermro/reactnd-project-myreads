import React from 'react';
import PropTypes from 'prop-types';
import BookGrid from './BookGrid';
import './BookShelf.css';

export default function BookShelf({ title, books, onChangeShelf }) {
  return (
    <section className='bookshelf'>
      <h2 className='bookshelf__title'>{ title }</h2>
      <div className='bookshelf__books'>
        <BookGrid books={books} onChangeShelf={onChangeShelf} />
      </div>
    </section>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

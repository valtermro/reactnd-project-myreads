import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import ShelfChanger from './ShelfChanger';
import './BookGrid.css';

export default function BookGrid({ books, onChangeShelf }) {
  return (
    <ol className='book-grid'>
      {books.map(book => (
        // TODO: <article> ??
        <li key={book.id} className='book-grid__book-wrapper'>
          <Book
            title={book.title}
            authors={book.authors || []}
            images={book.imageLinks || {}} />

          <ShelfChanger
            current={book.shelf}
            onChange={newShelf => onChangeShelf(newShelf, book)} />
        </li>
      ))}
    </ol>
  );
}

BookGrid.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

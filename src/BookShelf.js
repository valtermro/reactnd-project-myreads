import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import ShelfChanger from './ShelfChanger';
import './BookShelf.css';

export default function BookShelf({ id, title, books, onMoveBook }) {
  return (
    <section className='bookshelf'>
      <h2 className='bookshelf__title'>{ title }</h2>
      <div className='bookshelf__books'>
        <ol className='books-grid'>
          {books.map(book => (
            // TODO: <article> ??
            <li key={book.id} className='bookshelf__book-wrapper'>
              <Book
                title={book.title}
                authors={book.authors}
                images={book.imageLinks} />

              <ShelfChanger
                current={id}
                onChange={newShelf => onMoveBook(newShelf, book.id)} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

BookShelf.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired
};

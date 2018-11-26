import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import './HomePage.css';

export default function HomePage({ booksInShelf, onChangeShelf }) {
  return (
    <div className='home-page'>
      <header className='home-page__header'>
        <h1 className='home-page__title'>MyReads</h1>
      </header>

      <main className='home-page__content'>
        <BookShelf
          title='Currently Reading'
          books={booksInShelf.filter(b => b.shelf === 'currentlyReading')}
          onChangeShelf={onChangeShelf} />

        <BookShelf
          title='Want to Read'
          books={booksInShelf.filter(b => b.shelf === 'wantToRead')}
          onChangeShelf={onChangeShelf} />

        <BookShelf
          title='Read'
          books={booksInShelf.filter(b => b.shelf === 'read')}
          onChangeShelf={onChangeShelf} />
      </main>

      <div className='home-page__search-button-wrapper'>
        <Link to='/search' className='home-page__search-button'>
          Add a book
        </Link>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  booksInShelf: PropTypes.array.isRequired
};

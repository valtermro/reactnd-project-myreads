import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import './HomePage.css';

export default function HomePage(props) {
  const { booksInShelf, onMoveBook, loadingBooks } = props;

  return (
    <div className='HomePage'>
      <header className='HomePage__Header'>
        <h1 className='HomePage__Title'>MyReads</h1>
      </header>

      <main className='HomePage__Content'>
        <BookShelf
          title='Currently Reading'
          loading={loadingBooks}
          books={booksInShelf.filter(b => b.shelf === 'currentlyReading')}
          onMoveBook={onMoveBook} />

        <BookShelf
          title='Want to Read'
          loading={loadingBooks}
          books={booksInShelf.filter(b => b.shelf === 'wantToRead')}
          onMoveBook={onMoveBook} />

        <BookShelf
          title='Read'
          loading={loadingBooks}
          books={booksInShelf.filter(b => b.shelf === 'read')}
          onMoveBook={onMoveBook} />
      </main>

      <div className='HomePage__SearchButtonWrapper'>
        <Link to='/search' className='action-button HomePage__SearchButton'>
          Add a book
        </Link>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  onMoveBook: PropTypes.func.isRequired,
  loadingBooks: PropTypes.bool.isRequired,
  booksInShelf: PropTypes.array.isRequired
};

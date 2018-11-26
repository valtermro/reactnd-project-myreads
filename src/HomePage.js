import React from 'react';
import BookShelf from './BookShelf';
import * as API from './BooksAPI';
import './HomePage.css';

export default class HomePage extends React.Component {
  state = {
    books: []
  }

  componentDidMount = async () => {
    // TODO: error handling
    const books = await API.getAll();
    this.setState({ books });
  }

  removeBook = (bookId) => {
    this.setState(currentState => ({
      books: currentState.books.filter(b => b.id !== bookId)
    }));
  }

  moveBook = (newShelf, bookId) => {
    const movedBook = this.state.books.find(b => b.id === bookId);
    movedBook.shelf = newShelf;

    this.setState(currentState => ({
      books: currentState.books
        .filter(b => b.id !== bookId)
        .concat(movedBook)
    }));
  }

  onMoveBook = (newShelf, bookId) => {
    if (newShelf === 'none') {
      this.removeBook(bookId);
    } else {
      this.moveBook(newShelf, bookId);
    }
  }

  render() {
    return (
      <main className='home-page'>
        <header className='home-page__header'>
          <h1 className='home-page__title'>MyReads</h1>
        </header>

        <div className='home-page__content'>
          <BookShelf
            id='currentlyReading'
            title='Currently Reading'
            books={this.state.books.filter(b => b.shelf === 'currentlyReading')}
            onMoveBook={this.onMoveBook} />

          <BookShelf
            id='wantToRead'
            title='Want to Read'
            books={this.state.books.filter(b => b.shelf === 'wantToRead')}
            onMoveBook={this.onMoveBook} />

          <BookShelf
            id='read'
            title='Read'
            books={this.state.books.filter(b => b.shelf === 'read')}
            onMoveBook={this.onMoveBook} />
        </div>

        <div className='home-page__search-button-wrapper'>
          <button className='home-page__search-button'>
            Add a book
          </button>
        </div>
      </main>
    );
  }
}

import React from 'react';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';
import * as api from './BooksAPI';
import './App.css';

export default class BooksApp extends React.Component {
  state = {
    booksInShelf: []
  }

  componentDidMount = async () => {
    // TODO: error handling
    const books = await api.getAll();
    this.setState({ booksInShelf: books });
  }

  removeBook = book => {
    book.shelf = null;

    this.setState(currentState => ({
      booksInShelf: currentState.booksInShelf.filter(b => b.id !== book.id)
    }));
  }

  moveBook = (newShelf, book) => {
    const movedBook = this.state.booksInShelf.find(b => b.id === book.id) || book;
    movedBook.shelf = newShelf;

    this.setState(currentState => ({
      booksInShelf: currentState.booksInShelf
        .filter(b => b.id !== movedBook.id)
        .concat(movedBook)
    }));
  }

  onChangeShelf = (newShelf, book) => {
    if (newShelf === 'none') {
      this.removeBook(book);
    } else {
      this.moveBook(newShelf, book);
    }
  }

  render() {
    const { booksInShelf } = this.state;

    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <HomePage booksInShelf={booksInShelf} onChangeShelf={this.onChangeShelf} />
        )} />

        <Route path='/search' render={() => (
          <SearchPage booksInShelf={booksInShelf} onChangeShelf={this.onChangeShelf} />
        )} />
      </div>
    );
  }
}

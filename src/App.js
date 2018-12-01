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

  moveBook = (book, newShelf) => {
    this.setState(currentState => ({
      booksInShelf: currentState.booksInShelf
        .filter(b => b.id !== book.id)
        .concat({ ...book, shelf: newShelf })
    }));
  }

  render() {
    const { booksInShelf } = this.state;

    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <HomePage booksInShelf={booksInShelf} onMoveBook={this.moveBook} />
        )} />

        <Route path='/search' render={() => (
          <SearchPage booksInShelf={booksInShelf} onMoveBook={this.moveBook} />
        )} />
      </div>
    );
  }
}

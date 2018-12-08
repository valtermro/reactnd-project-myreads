import React from 'react';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import ErrorDisplay from './ErrorDisplay';
import { Route } from 'react-router-dom';
import * as api from './BooksAPI';
import './App.css';

function createMessage(message) {
  if (!createMessage._id) createMessage._id = 0;

  return {
    id: ++createMessage._id,
    message: message
  };
}

export default class BooksApp extends React.Component {
  state = {
    booksInShelf: [],
    errorMessages: []
  }

  componentDidMount = async () => {
    // TODO: error handling
    const books = await api.getAll();
    this.setState({ booksInShelf: books });
  }

  moveBook = async (book, newShelf) => {
    try {
      await api.update(book, newShelf);

      this.setState(currentState => ({
        booksInShelf: [
          ...currentState.booksInShelf.filter(b => b.id !== book.id),
          { ...book, shelf: newShelf }
        ]
      }));
    } catch (error) {
      this.setState(currentState => ({
        errorMessages: [
          ...currentState.errorMessages,
          createMessage(`Could not move "${book.title}" to "${newShelf}"`)
        ],
      }));
    }
  }

  closeErrorMessage = id => {
    this.setState(currentState => ({
      errorMessages: currentState.errorMessages.filter(m => m.id !== id)
    }));
  }

  render() {
    const { booksInShelf, errorMessages } = this.state;

    return (
      <div className='app'>
        {errorMessages.length > 0 && (
          <ErrorDisplay messages={errorMessages} onCloseMessage={this.closeErrorMessage} />
        )}

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

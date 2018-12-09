import React from 'react';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import ErrorDisplay from './ErrorDisplay';
import LoadingOverlay from './LoadingOverlay';
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
    loadingBooks: true,
    updatingBooks: false,
    booksInShelf: [],
    errorMessages: []
  }

  componentDidMount = async () => {
    try {
      const books = await api.getAll();

      this.setState({
        loadingBooks: false,
        booksInShelf: books
      });
    } catch (_) {
      // NOTE: This error will also be displayed if the app is started at the
      // search page. In that case the message may not make much sense for the
      // user since the page is not supposed to display the books in the shelves
      // anyway but it should serve as a tip of why a book that is already in a
      // shelf didn't show up as such in the list of books resulting from the search.
      this.setState(currentState => ({
        loadingBooks: false,
        errorMessages: [
          ...currentState.errorMessages,
          createMessage('Something went wrong while loading your books')
        ]
      }));
    }
  }

  moveBook = async (book, newShelf) => {
    try {
      this.setState({ updatingBooks: true });

      await api.update(book, newShelf);

      this.setState(currentState => ({
        updatingBooks: false,
        booksInShelf: [
          ...currentState.booksInShelf.filter(b => b.id !== book.id),
          { ...book, shelf: newShelf }
        ]
      }));
    } catch (_) {
      this.setState(currentState => ({
        updatingBooks: false,
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
    const { loadingBooks, updatingBooks, booksInShelf, errorMessages } = this.state;

    return (
      <div className='app'>
        {errorMessages.length > 0 && (
          <ErrorDisplay messages={errorMessages} onCloseMessage={this.closeErrorMessage} />
        )}

        {updatingBooks && <LoadingOverlay />}

        <Route exact path='/' render={() => (
          <HomePage
            loadingBooks={loadingBooks}
            booksInShelf={booksInShelf}
            onMoveBook={this.moveBook} />
        )} />

        <Route path='/search' render={() => (
          <SearchPage
            booksInShelf={booksInShelf}
            onMoveBook={this.moveBook} />
        )} />
      </div>
    );
  }
}

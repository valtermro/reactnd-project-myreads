import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import BookDisplay from './BookDisplay';
import LoadingOverlay from './LoadingOverlay';
import * as api from './BooksAPI';
import './SearchPage.css';

export default class SearchPage extends React.Component {
  static propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    booksInShelf: PropTypes.array.isRequired
  }

  state = {
    // The current value of the search input.
    query: '',

    // The last query sent to the api server. Set after the request is complete.
    requestedQuery: '',

    requestingBooks: false,
    resultBooks: [],
    errorMessage: ''
  }

  resolveBooks = books => {
    return books.map(book => {
      const inShelf = this.props.booksInShelf.find(b => b.id === book.id);
      return inShelf || book;
    });
  }

  search = event => {
    this.doSearch(event.target.value);
    this.setState({ query: event.target.value });
  }

  onMoveBook = async (book, newShelf) => {
    await this.props.onMoveBook(book, newShelf);

    this.setState(currentState => ({
      resultBooks: this.resolveBooks(currentState.resultBooks)
    }));
  }

  doSearch = debounce(async query => {
    if (!query) {
      return this.setState({
        query: '',
        requestedQuery: '',
        resultBooks: []
      });
    }

    try {
      this.setState({ requestingBooks: true });

      const result = await api.search(query);

      if (result.error) {
        this.setState({
          requestingBooks: false,
          requestedQuery: query,
          resultBooks: []
        });
      } else {
        this.setState({
          requestingBooks: false,
          requestedQuery: query,
          resultBooks: this.resolveBooks(result)
        });
      }
    } catch (_) {
      this.setState({
        requestingBooks: false,
        errorMessage: `Something went wrong while seaching for "${query}"`
      });
    }
  }, 500)

  componentWillUnmount = () => {
    this.doSearch.cancel();
  }

  render() {
    const { query, requestedQuery, requestingBooks, errorMessage, resultBooks } = this.state;

    return (
      <div className='SearchPage'>
        <header className='SearchPage__Topbar'>
          <h1 className='visually-hidden'>Book search</h1>

          <Link to='/' className='SearchPage__CloseButton'>
            Close
          </Link>

          <div className='SearchPage__InputWrapper'>
            <input type='text'
              className='SearchPage__Input'
              value={query}
              onChange={this.search}
              placeholder='Search by title or author' />
          </div>
        </header>

        <main className='SearchPage__Results'>
          <h2 className='visually-hidden'>Search results</h2>

          {requestingBooks && <LoadingOverlay />}

          {errorMessage
            ? <div className='SearchPage__ErrorMessage'>{errorMessage}</div>

            : resultBooks.length > 0
            ? <BookDisplay shelf='none' books={resultBooks} onMoveBook={this.onMoveBook} />

            : !requestedQuery
            ? <div className="SearchPage__EmptyState">Search something.</div>

            : <div className="SearchPage__EmptyState">Nothing to see here.</div>
          }
        </main>
      </div>
    );
  }
}

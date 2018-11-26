import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import BookGrid from './BookGrid';
import * as api from './BooksAPI';
import './SearchPage.css';

export default class SearchPage extends React.Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksInShelf: PropTypes.array.isRequired
  }

  state = {
    // The current value of the search input.
    query: '',

    // The last query sent to the api server. Set after the request is complete.
    requestedQuery: '',

    requestingBooks: false,
    resultBooks: []
  }

  search = event => {
    this.doSearch(event.target.value);
    this.setState({ query: event.target.value });
  }

  doSearch = debounce(async query => {
    if (!query) {
      return this.setState({
        query: '',
        requestedQuery: '',
        resultBooks: []
      });
    }

    this.setState({ requestingBooks: true });

    // TODO: Error handling
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
        resultBooks: result.map(book => {
          const inShelf = this.props.booksInShelf.find(b => b.id === book.id);
          return inShelf || book;
        })
      });
    }
  }, 500)

  componentWillUnmount = () => {
    this.doSearch.cancel();
  }

  render() {
    const { onChangeShelf } = this.props;
    const { resultBooks, query, requestedQuery, requestingBooks } = this.state;

    return (
      <div className='search-page'>
        <header className='search-page__topbar'>
          <h1 className='visually-hidden'>Book search</h1>

          <Link to='/' className='search-page__close-button'>Close</Link>

          <div className='search-page__input-wrapper'>
            <input
              type='text'
              className='search-page__bar__input'
              value={query}
              onChange={this.search}
              placeholder='Search by title or author' />
          </div>
        </header>

        <main className='search-page__results'>
          <h2 className='visually-hidden'>Search results</h2>

          {requestingBooks && (
            <div className='search-page__loading-overlay'>
              <div className='search-page__loading-icon'></div>
            </div>
          )}

          {resultBooks.length > 0
            ? <BookGrid books={resultBooks} onChangeShelf={onChangeShelf} />

            : !requestedQuery
            ? <div className="search-page__empty-state">Search something.</div>

            : <div className="search-page__empty-state">Nothing to see here.</div>
          }
        </main>
      </div>
    );
  }
}

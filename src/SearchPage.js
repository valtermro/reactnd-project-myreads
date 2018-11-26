import React from 'react';
import './SearchPage.css';

export default class SearchPage extends React.Component {
  render() {
    return (
        <div className='search-page'>
        <div className='search-page__bar'>
          <button className='search-page__close-button' onClick={() => this.setState({ showSearchPage: false })}>Close</button>
          <div className='search-page__input-wrapper'>
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type='text' placeholder='Search by title or author'/>
          </div>
        </div>

        <div className='search-page__results'>
          <ol className='books-grid'></ol>
        </div>
      </div>
    );
  }
}

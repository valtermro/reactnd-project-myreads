import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import ShelfChanger from './ShelfChanger';
import CheckButton from './elements/CheckButton';
import './BookDisplay.css';

export default class BookDisplay extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
    checkedBooks: [],
  }

  toggleChecked = (book, isChecked) => {
    this.setState(currentState => ({
      checkedBooks: isChecked
        ? currentState.checkedBooks.concat(book)
        : currentState.checkedBooks.filter(b => b.id !== book.id)
    }));
  }

  moveBook = (book, newShelf) => {
    this.props.onMoveBook(book, newShelf);
    this.uncheckAllBooks();
  }

  moveCheckedBooks = newShelf => {
    // NOTE: Moving each book individually has two effects that note mentioning:
    // 1: It will trigger a new render for each moved book; and
    // 2: It will trigger a new api request for each moved book.
    //
    // While #1 is something that may become a performance issue it's something
    // that should be benchmarked before doing any changes.
    //
    // #2, however, is really, really, bad and should be handled now. But, since
    // the api itself should support bulk updates in order to avoid the multiple
    // requests - which it doesn't -, there's nothing we can do about it.
    this.state.checkedBooks.forEach(book => this.moveBook(book, newShelf));
  }

  checkAllBooks = () => {
    this.setState(currentState => ({
      checkedBooks: currentState.checkedBooks.concat(this.props.books)
    }));
  }

  uncheckAllBooks = () => {
    this.setState({ checkedBooks: [] });
  }

  render() {
    const { checkedBooks } = this.state;
    const { books, shelf } = this.props;
    const allChecked = books.every(book => checkedBooks.includes(book));

    return (
      <div className='BookDisplay'>
        {books.length > 0 && <div className='BookDisplay__BulkActions'>
          <div className='BookDisplay__BulkButtonWrapper'>
            <ShelfChanger
                current={shelf}
                className='BookDisplay__BulkShelfChanger'
                label='Move to'
                onChange={shelf => this.moveCheckedBooks(shelf)}>
              <button type='button'
                  className='button BookDisplay__BulkButton'
                  disabled={checkedBooks.length === 0}>
                move all selected
              </button>
            </ShelfChanger>
          </div>

          <div className='BookDisplay__BulkButtonWrapper'>
            <button type='button'
                className='button BookDisplay__BulkButton'
                onClick={allChecked ? this.uncheckAllBooks : this.checkAllBooks}>
              {allChecked ? 'unselect all' : 'select all'}
            </button>
          </div>
        </div>}

        {books.length === 0
          ? <div className='BookDisplay__EmptyState'>Nothing to see here</div>
          : <ul className='BookDisplay__Grid'>
              {books.map(book => (
                <li key={book.id} className='BookDisplay__BookWrapper'>
                  <Book
                    title={book.title}
                    authors={book.authors || []}
                    images={book.imageLinks || {}} />

                  <div className='BookDisplay__BookCheckButton'>
                    <CheckButton
                      checked={!!checkedBooks.find(b => b.id === book.id)}
                      onChange={isChecked => this.toggleChecked(book, isChecked)} />
                  </div>

                  <div className='BookDisplay__ShelfChanger'>
                    <ShelfChanger
                        label={book.shelf ? 'Move to' : 'Add to'}
                        current={book.shelf || 'none'}
                        onChange={shelf => this.moveBook(book, shelf)}>
                      <button type='button'
                          className='action-button BookDisplay__ShelfChanger__Toggler'>
                        {book.shelf ? 'Move to' : 'Add to'}
                      </button>
                    </ShelfChanger>
                  </div>
                </li>
              ))}
          </ul>
        }
      </div>
    );
  }
}

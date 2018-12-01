import React from 'react';
import PropTypes from 'prop-types';
import BookDisplay from './BookDisplay';
import './BookShelf.css';

export default class BookShelf extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
    collapsed: false
  }

  toggleCollapse = () => {
    this.setState(currentState => ({ collapsed: !currentState.collapsed }));
  }

  render() {
    const { title, books, onMoveBook } = this.props;
    const { collapsed } = this.state;

    return (
      <section className='BookShelf' data-collapsed={collapsed}>
        <header className='BookShelf__Header'>
          <h2 className='BookShelf__Title'>
            {title}
          </h2>
          <button type='button'
              className='button BookShelf__CollapseButton'
              onClick={this.toggleCollapse}>
            {collapsed ? 'expand' : 'collapse'}
          </button>
        </header>

        <div className='BookShelf__Display'>
          {/* TODO: "loading" state */}
          <BookDisplay
            shelf={books.length > 0 ? books[0].shelf : 'none'}
            books={books}
            onMoveBook={onMoveBook} />
        </div>
      </section>
    );
  }
}

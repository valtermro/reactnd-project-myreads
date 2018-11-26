import React from 'react';
import HomePage from './HomePage';
import './App.css';

export default class BooksApp extends React.Component {
  render() {
    return (
      <div className='app'>
        <HomePage />
      </div>
    );
  }
}

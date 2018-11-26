import React from 'react';
import PropTypes from 'prop-types';
import './ShelfChanger.css';

export default function ShelfChanger({ current, onChange }) {
  return (
    <div className='shelf-changer'>
      <select
          defaultValue={current || 'none'}
          className='shelf-changer__select'
          onChange={event => onChange(event.target.value)}>
        <option value='' disabled>
          {current ? 'Move to...' : 'Add to...'}
        </option> :

        <option value='currentlyReading'>Currently Reading</option>
        <option value='wantToRead'>Want to Read</option>
        <option value='read'>Read</option>

        <option value='none'>None</option>
      </select>
    </div>
  );
}

ShelfChanger.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

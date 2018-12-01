import React from 'react';
import PropTypes from 'prop-types';
import './CheckButton.css';

export default function CheckButton(props) {
  const { checked, onChange } = props;

  return (
    <div className='CheckButton'
        data-checked={checked}
        onClick={() => onChange(!checked)}>
      {checked && <span className='CheckButton__Check' />}
    </div>
  );
}

CheckButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

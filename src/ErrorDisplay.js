import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import './ErrorDisplay.css';

export default function ErrorDisplay(props) {
  const { messages, onCloseMessage } = props;

  return (
    <div className='ErrorDisplay'>
      {messages.map(message => (
        <ErrorMessage
            key={message.id}
            text={message.message}
            onClose={() => onCloseMessage(message.id)} />
      ))}
    </div>
  );
}

ErrorDisplay.propTypes = {
  messages: PropTypes.array.isRequired,
  onCloseMessage: PropTypes.func.isRequired
};

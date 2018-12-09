import React from 'react';
import PropTypes from 'prop-types';
import './ErrorDisplayMessage.css';

export default class ErrorDisplayMessage extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
  }

  timeoutId = null

  state = {
    fade: false
  }

  rootRef = React.createRef()

  componentDidMount = () => {
    this.timeoutId = setTimeout(this.props.onClose, 8000);
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeoutId);
  }

  onClose = () => {
    this.setState({ fade: true });
    this.rootRef.current.addEventListener('transitionend', this.props.onClose);
  }

  render() {
    const { text } = this.props;
    const { fade } = this.state;

    return (
      <div ref={this.rootRef} className='ErrorDisplayMessage' data-fading={fade}>
        <div className='ErrorDisplayMessage__Text'>
          {text}
        </div>
        <button type='button'
            className='button ErrorDisplayMessage__CloseButton'
            onClick={this.onClose}>
          close
        </button>
      </div>
    );
  }
}

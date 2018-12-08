import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

export default class ErrorMessage extends React.Component {
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
      <div ref={this.rootRef} className='ErrorMessage' data-fading={fade}>
        <div className='ErrorMessage__Text'>
          {text}
        </div>
        <button type='button'
            className='button ErrorMessage__CloseButton'
            onClick={this.onClose}>
          close
        </button>
      </div>
    );
  }
}

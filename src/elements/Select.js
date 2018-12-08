import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';

export default class Select extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  state = {
    selectedOptionIndex: 0,
    options: []
  }

  // Using "componentWillReceiveProps" in order to keep the "current" in sync with
  // the "defaultValue" prop which may change after the component has been mounted.
  componentWillReceiveProps = () => {
    const { options, defaultValue } = this.props;

    this.setState({
      selectedOptionIndex: options.findIndex(option => option.value === defaultValue),
      options: options.map(option => ({
        ...option,
        current: defaultValue === option.value,
        selected: false,
      }))
    });
  }

  dispatch = selectedOption => {
    if (selectedOption.current) return;
    this.props.onChange(selectedOption.value);
  }

  selectNextOption = () => {
    if (this.state.selectedOptionIndex + 1 >= this.state.options.length) {
      return;
    }

    this.setState(currentState => ({
      selectedOptionIndex: currentState.selectedOptionIndex + 1,
      options: currentState.options.map((option, index) => ({
        ...option,
        selected: index === currentState.selectedOptionIndex + 1
      }))
    }));
  }

  selectPreviousOption = () => {
    if (this.state.selectedOptionIndex <= 0) {
      return;
    }
    this.setState(currentState => ({
      selectedOptionIndex: currentState.selectedOptionIndex - 1,
      options: currentState.options.map((option, index) => ({
        ...option,
        selected: index === currentState.selectedOptionIndex - 1
      }))
    }));
  }

  onKeyDown = event => {
    switch (event.key) {
      case 'ArrowDown': {
        this.selectNextOption();
        event.preventDefault();
        break;
      }
      case 'ArrowUp': {
        this.selectPreviousOption();
        event.preventDefault();
        break;
      }
      case 'Enter': {
        const { options, selectedOptionIndex } = this.state;
        this.dispatch(options.find((_, index) => index === selectedOptionIndex));
        event.preventDefault();
        break;
      }
      default: {
        return;
      }
    }
  }

  render() {
    const { options } = this.state;
    const { label, className, onChange, options: _, ...rest } = this.props;

    return (
      <div ref='root'
          tabIndex='-1'
          className={`Select ${className || ''}`}
          {...rest}
          onKeyDown={this.onKeyDown}>
        <span className='Select__Label'>
          {label}
        </span>

        {options.map(option => (
          <span key={option.value}
              className='Select__Option'
              data-current={option.current}
              data-selected={option.selected}
              onClick={() => this.dispatch(option)}>
            {option.label}
          </span>
        ))}
      </div>
    );
  }
}

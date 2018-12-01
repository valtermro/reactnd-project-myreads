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

  componentDidMount = () => {
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

    this.setState(
      currentState => ({
        options: currentState.options.map(option => ({
          ...option,
          current: option.value === selectedOption.value,
          selected: false
        }))
      }),
      () => this.props.onChange(selectedOption.value)
    );
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

    // need to destructure "options" so it won't be part o "rest" ending up
    // in the rendered DOM element
    const {
      options: _, label, className, onChange, ...rest
    } = this.props;

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

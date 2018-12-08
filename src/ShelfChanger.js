import React from 'react';
import PropTypes from 'prop-types';
import Select from './elements/Select';
import './ShelfChanger.css';

export default class ShelfChanger extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    current: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  state = {
    selectIsOpen: false,
    selectPositionY: 'top',
  }

  onChange = value => {
    this.props.onChange(value);
    this.closeSelect();
  }

  openSelect = () => {
    const select = this.refs.select.refs.root;
    const selectHeight = select.offsetHeight;
    const selectTop = select.getBoundingClientRect().top;
    const selectMarginBottom = 20;

    // decide if the Select should slide up-to-bottom or bottom-to-up
    if (selectTop + selectHeight > window.innerHeight - selectMarginBottom) {
      this.setState({ selectIsOpen: true, selectPositionY: 'bottom' });
    } else {
      this.setState({ selectIsOpen: true, selectPositionY: 'top' });
    }
    select.focus();
  }

  closeSelect = () => {
    this.setState({ selectIsOpen: false });
  }

  render() {
    const { selectIsOpen, selectPositionY } = this.state;
    const { current, label, className, children } = this.props;

    return (
      <div className='ShelfChanger' data-is-open={selectIsOpen}>
        {/* TODO: find a better way to "ref" the rendered DOM element */}
        <div onClick={this.openSelect}>
          {children}
        </div>

        <Select ref='select'
          // These properties are passed directly to the Select's root DOM
          // element and used in the styles ShelfChanger to define special
          // style/behavior on the renderered Select.
          className={`ShelfChanger__Select ${className || ''}`}
          data-position-y={selectPositionY}

          label={label}
          defaultValue={current}
          onChange={this.onChange}
          onBlur={this.closeSelect}
          options={[
            { value: 'currentlyReading', label: 'Currently Reading' },
            { value: 'wantToRead', label: 'Want to Read'  },
            { value: 'read', label: 'Read' },
            { value: 'none', label: 'None' }
          ]} />
      </div>
    );
  }
}

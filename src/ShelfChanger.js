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
    isOpen: false,
    top: null,
    bottom: null,
    transformOrigin: null
  }

  selectRef = React.createRef()

  onChange = value => {
    this.props.onChange(value);
    this.closeSelect();
  }

  openSelect = () => {
    const select = this.selectRef.current.refs.root;
    const selectHeight = select.offsetHeight;
    const selectTop = select.getBoundingClientRect().top;
    const selectMarginBottom = 20;

    const expandFrom = selectTop + selectHeight > window.innerHeight - selectMarginBottom
      ? 'bottom'
      : 'top';

    this.setState({
      isOpen: true,
      top: expandFrom === 'bottom' ? null : 0,
      bottom: expandFrom === 'bottom' ? 0 : null,
      transformOrigin: `${expandFrom} left`,
    });

    select.focus();
  }

  closeSelect = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen, top, bottom, transformOrigin } = this.state;
    const { current, label, className, children } = this.props;

    return (
      <div className='ShelfChanger' data-is-open={isOpen}>
        <div onClick={this.openSelect}>
          {children}
        </div>

        <Select ref={this.selectRef}
          // These properties are passed directly to the Select's root DOM
          // element and used in the styles ShelfChanger to define special
          // style/behavior on the renderered Select.
          className={`ShelfChanger__Select ${className || ''}`}
          style={{ top, bottom, transformOrigin }}

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

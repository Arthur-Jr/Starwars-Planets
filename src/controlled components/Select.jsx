import React from 'react';
import PropTypes from 'prop-types';

function Select({ name, testId, handleChange, options, text }) {
  return (
    <label htmlFor={ name }>
      {`${text}: `}
      <select name={ name } id={ name } data-testid={ testId } onChange={ handleChange }>
        {options.map((option, index) => (
          <option key={ index } value={ option }>{ option }</option>
        ))}
      </select>
    </label>
  );
}

Select.defaultProps = {
  testId: '',
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  testId: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;

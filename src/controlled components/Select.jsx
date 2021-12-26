import React from 'react';
import PropTypes from 'prop-types';
import removeUnderline from '../globalFuncs/RemoveUnderline';

function Select({ name, testId, handleChange, options, text, value }) {
  return (
    <label htmlFor={ name }>
      {`${text}: `}
      <select
        value={ value }
        name={ name }
        id={ name }
        data-testid={ testId }
        onChange={ handleChange }
      >
        {options.map((option, index) => (
          <option key={ index } value={ option }>{ removeUnderline(option) }</option>
        ))}
      </select>
    </label>
  );
}

Select.defaultProps = {
  testId: '',
  options: [],
  value: '',
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  testId: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Select;

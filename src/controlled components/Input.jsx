import React from 'react';
import PropTypes from 'prop-types';

function Input({ placeHolder, type, handleChange, name, testId, min, value, id, text }) {
  return (
    <label htmlFor={ id }>
      {text}
      <input
        type={ type }
        onChange={ handleChange }
        name={ name }
        id={ id }
        data-testid={ testId }
        placeholder={ placeHolder }
        min={ min }
        value={ value }
      />
    </label>
  );
}

Input.defaultProps = {
  testId: '',
  min: 0,
  text: '',
  placeHolder: '',
};

Input.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string,
  min: PropTypes.number,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
};

export default Input;

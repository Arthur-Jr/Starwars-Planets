import React from 'react';
import PropTypes from 'prop-types';

function Input({ placeHolder, type,
  handleChange, name, testId, min, value, id, text, max }) {
  return (
    <label htmlFor={ id }>
      <input
        type={ type }
        onChange={ handleChange }
        name={ name }
        id={ id }
        data-testid={ testId }
        placeholder={ placeHolder }
        min={ min }
        value={ value }
        max={ max }
      />
      {text}
    </label>
  );
}

Input.defaultProps = {
  testId: '',
  min: 0,
  text: '',
  placeHolder: '',
  max: 0,
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
  max: PropTypes.number,
};

export default Input;

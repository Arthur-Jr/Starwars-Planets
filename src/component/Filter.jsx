import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import Input from '../controlled components/Input';
import Select from '../controlled components/Select';
import Sort from './Sort';

function Filter() {
  const {
    filters, setFilter, columnOptions, modifyColumnOptions } = useContext(PlanetContext);
  const { filterByNumericValues, filterByName: { name: inputName } } = filters;
  const [comparisonOptions] = useState(['Greater', 'Equal', 'Lesser']);
  const [columnFilter, setColumnFilter] = useState({
    column: 'population',
    comparison: 'Greater',
    value: '',
  });

  const handleChange = ({ target: { value, name } }) => {
    setColumnFilter({
      ...columnFilter,
      [name]: value,
    });
  };

  const handleNameFilter = ({ target: { value } }) => {
    setFilter({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const removeColumnOptions = () => {
    const newColumns = [...columnOptions];
    newColumns.splice(newColumns.indexOf(columnFilter.column), 1);
    modifyColumnOptions(newColumns);
    setColumnFilter({ ...columnFilter, column: newColumns[0], value: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        columnFilter,
      ],
    });
    removeColumnOptions();
  };

  return (
    <header>
      <Input
        placeHolder="Search"
        type="text"
        name="search-name"
        id="search-name"
        testId="name-filter"
        handleChange={ handleNameFilter }
        value={ inputName }
      />
      <form onSubmit={ handleSubmit }>
        <Select
          name="column"
          testId="column-filter"
          options={ columnOptions }
          text="Column Filter"
          handleChange={ handleChange }
        />
        <Select
          name="comparison"
          testId="comparison-filter"
          options={ comparisonOptions }
          text="Comparison Filter"
          handleChange={ handleChange }
        />
        <Input
          placeHolder="Set a value"
          type="number"
          name="value"
          id="value"
          testId="value-filter"
          handleChange={ handleChange }
          value={ columnFilter.value }
        />
        <button
          type="submit"
          data-testid="button-filter"
          disabled={ columnOptions.length === 0 }
        >
          Search
        </button>
      </form>
      <div>
        <Sort />
      </div>
    </header>
  );
}

export default Filter;

import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import Input from '../controlled components/Input';
import Select from '../controlled components/Select';
import { sortOptions } from '../globalFuncs/SortFunc';

function Sort() {
  const [selectedSort, setSort] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const {
    filters,
    setFilter,
  } = useContext(PlanetContext);

  const handleChange = ({ target: { name, value } }) => {
    setSort({
      ...selectedSort,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter({
      ...filters,
      order: selectedSort,
    });
  };

  const { string, number } = sortOptions;

  return (
    <form onSubmit={ handleSubmit } className="sort-form">
      <Select
        name="column"
        testId="column-sort"
        options={ [...string, ...number] }
        text="Sort Options"
        handleChange={ handleChange }
        value={ selectedSort.column }
      />
      <section className="radio-section">
        <Input
          text="Asc"
          type="radio"
          name="sort"
          testId="column-sort-input-asc"
          value="ASC"
          id="asc"
          handleChange={ handleChange }
        />
        <Input
          text="Desc"
          type="radio"
          name="sort"
          testId="column-sort-input-desc"
          value="DESC"
          id="des"
          handleChange={ handleChange }
        />
      </section>
      <button
        type="submit"
        data-testid="column-sort-button"
        className="form-button"
      >
        Sort
      </button>
    </form>
  );
}

export default Sort;

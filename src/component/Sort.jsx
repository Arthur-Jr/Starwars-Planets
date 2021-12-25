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
    <form onSubmit={ handleSubmit }>
      <Select
        name="column"
        testId="column-sort"
        options={ [...string, ...number] }
        text="Sort Options"
        handleChange={ handleChange }
      />
      <Input
        text="Ascendant"
        type="radio"
        name="sort"
        testId="column-sort-input-asc"
        value="ASC"
        id="asc"
        handleChange={ handleChange }
      />
      <Input
        text="Descendant"
        type="radio"
        name="sort"
        testId="column-sort-input-desc"
        value="DESC"
        id="des"
        handleChange={ handleChange }
      />
      <button type="submit" data-testid="column-sort-button">Sort</button>
    </form>
  );
}

export default Sort;

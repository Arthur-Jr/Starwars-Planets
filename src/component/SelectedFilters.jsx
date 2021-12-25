import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function SelectedFilters() {
  const {
    filters,
    filters: { filterByNumericValues },
    setFilter,
    columnOptions,
    modifyColumnOptions,
  } = useContext(PlanetContext);

  const handleClick = (column) => {
    const newFiltredArray = filterByNumericValues
      .filter((filter) => filter.column !== column);
    setFilter({
      ...filters,
      filterByNumericValues: newFiltredArray,
    });
    modifyColumnOptions([...columnOptions, column]);
  };

  return (
    <div>
      {filterByNumericValues.map(({ column }, index) => (
        <div key={ index } data-testid="filter">
          <span>{ column }</span>
          <button type="button" onClick={ () => handleClick(column) }>X</button>
        </div>
      ))}
    </div>
  );
}

export default SelectedFilters;

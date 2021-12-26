import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import removeUnderline from '../globalFuncs/RemoveUnderline';

function SelectedFilters() {
  const {
    filters,
    filters: { filterByNumericValues },
    setFilter,
    columnOptions,
    modifyColumnOptions,
    columnFilter,
    setColumnFilter,
  } = useContext(PlanetContext);

  const handleClick = (column) => {
    const newFiltredArray = filterByNumericValues
      .filter((filter) => filter.column !== column);
    setFilter({
      ...filters,
      filterByNumericValues: newFiltredArray,
    });
    if (columnOptions.length === 0) {
      setColumnFilter({
        ...columnFilter,
        column,
      });
    }
    modifyColumnOptions([...columnOptions, column]);
  };

  return (
    <div className="selectedFilters-section">
      {filterByNumericValues.map(({ column }, index) => (
        <div key={ index } data-testid="filter" className="filter-container">
          <span>{ removeUnderline(column) }</span>
          <button type="button" onClick={ () => handleClick(column) }>X</button>
        </div>
      ))}
    </div>
  );
}

export default SelectedFilters;

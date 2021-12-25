import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import sortFunc from '../globalFuncs/SortFunc';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });
  const [columnOptions, modifyColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [filtredData, setFiltredData] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    let filtredPlanets = [...data];
    filters.filterByNumericValues.forEach(({ comparison, column, value }) => {
      switch (comparison) {
      case 'Greater':
        filtredPlanets = [...filtredPlanets
          .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10))];
        break;
      case 'Equal':
        filtredPlanets = [...filtredPlanets
          .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10))];
        break;
      case 'Lesser':
        filtredPlanets = [...filtredPlanets
          .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10))];
        break;
      default:
        return null;
      }
    });
    setFiltredData(filtredPlanets);
  }, [filters.filterByNumericValues, data]);

  useEffect(() => {
    setPlanets(sortFunc(filtredData, filters.order));
    setPlanets(filtredData
      .filter((planet) => planet.name.toLowerCase()
        .includes(filters.filterByName.name.toLowerCase())));
  }, [filters.filterByName.name, filtredData, filters.order]);

  return (
    <PlanetContext.Provider
      value={
        {
          data,
          setData,
          filters,
          setFilter,
          filtredData,
          setFiltredData,
          planets,
          setPlanets,
          columnOptions,
          modifyColumnOptions }
      }
    >
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetProvider;

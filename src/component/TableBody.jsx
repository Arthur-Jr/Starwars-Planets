import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import capitalizeString from '../globalFuncs/capitalizeString';

function TableBody() {
  const { planets } = useContext(PlanetContext);
  const CLIMATE_INDEX = 4;
  const TERRAIND_INDEX = 6;

  return (
    <tbody>
      {planets.map((planet, index) => {
        delete planet.films;
        delete planet.created;
        delete planet.edited;
        delete planet.url;
        const values = Object.values(planet);
        return (
          <tr key={ index }>
            {values.map((value, index2) => (
              <td
                key={ index2 }
                data-testid={ index2 === 0 ? 'planet-name' : 'infos' }
              >
                { index2 === CLIMATE_INDEX
                || index2 === TERRAIND_INDEX ? capitalizeString(value) : value }
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;

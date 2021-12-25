import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function TableBody() {
  const { planets } = useContext(PlanetContext);

  return (
    <tbody>
      {planets.map((planet, index) => {
        const values = Object.values(planet);
        return (
          <tr key={ index }>
            {values.map((value, index2) => (
              <td
                key={ index2 }
                data-testid={ index2 === 0 && 'planet-name' }
              >
                { value }
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;

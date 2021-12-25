import React from 'react';
import TableBody from './TableBody';

function Table() {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surfacer Water</th>
          <th>Population</th>
        </tr>
      </thead>
      <TableBody />
    </table>
  );
}

export default Table;

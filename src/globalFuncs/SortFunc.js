const NEGATIVE = -1;
export const sortOptions = {
  string: ['name', 'climate', 'gravity', 'terrain'],
  number: [
    'rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population',
  ],
};

function ASC(array, column) {
  if (sortOptions.string.some((option) => option === column)) {
    return array.sort((a, b) => {
      if (a[column] > b[column]) {
        return 1;
      }
      if (a[column] < b[column]) {
        return NEGATIVE;
      }
      return 0;
    });
  }
  if (sortOptions.number.some((option) => option === column)) {
    return array.sort((a, b) => {
      if (parseInt(a[column], 10) > parseInt(b[column], 10)) {
        return 1;
      }
      if (parseInt(a[column], 10) < parseInt(b[column], 10)) {
        return NEGATIVE;
      }
      return 0;
    });
  }
}

function DESC(array, column) {
  if (sortOptions.string.some((option) => option === column)) {
    return array.sort((a, b) => {
      if (b[column] > a[column]) {
        return 1;
      }
      if (b[column] < a[column]) {
        return NEGATIVE;
      }
      return 0;
    });
  }
  if (sortOptions.number.some((option) => option === column)) {
    return array.sort((a, b) => {
      if (parseInt(b[column], 10) > parseInt(a[column], 10)) {
        return 1;
      }
      if (parseInt(b[column], 10) < parseInt(a[column], 10)) {
        return NEGATIVE;
      }
      return 0;
    });
  }
}

function sortFunc(array, order) {
  const { column, sort } = order;
  if (sort === 'ASC') {
    return ASC(array, column);
  }
  return DESC(array, column);
}

export default sortFunc;

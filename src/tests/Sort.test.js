/* eslint-disable max-len */

import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from '../App';
import testData from './testData';
import renderWithRouter from './RenderWithRouter';

const SORT_COLUMN_SELECTOR = 'column-sort';
const SORT_ORDER_ASC_SELECTOR = 'column-sort-input-asc';
const SORT_ORDER_DESC_SELECTOR = 'column-sort-input-desc';
const SORT_APPLY_SELECTOR = 'column-sort-button';
const PLANET_NAME_SELECTOR = 'planet-name';
const END_POINT = ['/planetfinder'];
const DEFAULT_COLUMN_SORT = ['Name', 'Climate', 'Gravity', 'Terrain', 'Rotation period',
  'Orbital period', 'Diameter', 'Surface water', 'Population'];

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData),
    }));
};

async function beforeRender() {
  await act(async () => {
    renderWithRouter(<App />, { initialEntries: END_POINT });
  });
}

describe('Testa se os campos do sort são renderizados', () => {
  beforeAll(mockFetch);
  beforeEach(beforeRender);
  afterEach(cleanup);

  it('Renderiza as opções do "sort"', () => {
    const column = screen.getByTestId(SORT_COLUMN_SELECTOR);
    expect(column).toHaveProperty('nodeName', 'SELECT');

    const foundColumnSort = Array.from(column.children).map((child) => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(foundColumnSort).toEqual(expect.arrayContaining(DEFAULT_COLUMN_SORT));
  });

  it('Renderiza as opções de direção "Asc", "Desc" e o botão de sort', () => {
    const asc = screen.getByTestId(SORT_ORDER_ASC_SELECTOR);
    const desc = screen.getByTestId(SORT_ORDER_DESC_SELECTOR);
    const button = screen.getByTestId(SORT_APPLY_SELECTOR);
    expect(asc).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});

describe('Testa a função de ordenar a tabela.', () => {
  beforeAll(mockFetch);
  beforeEach(beforeRender);
  afterEach(cleanup);

  it('Verifica a ordenação inicial', () => {
    const initialSort = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];
    const planets = screen.getAllByTestId(PLANET_NAME_SELECTOR);
    const actual = planets.map((planet) => planet.innerHTML);
    expect(actual).toEqual(initialSort);
  });

  it('Ordena os planetas do mais populoso para o menos populoso', () => {
    fireEvent.change(screen.getByTestId(SORT_COLUMN_SELECTOR), { target: { value: 'orbital_period' } });
    fireEvent.click(screen.getByTestId(SORT_ORDER_DESC_SELECTOR));
    fireEvent.click(screen.getByTestId(SORT_APPLY_SELECTOR));

    const expected = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];
    const planets = screen.getAllByTestId(PLANET_NAME_SELECTOR);
    const actual = planets.map((planet) => planet.innerHTML);
    expect(actual).toEqual(expected);
  });

  it('Ordena os planetas com menor tempo de rotação para o maior', () => {
    fireEvent.change(screen.getByTestId(SORT_COLUMN_SELECTOR), { target: { value: 'rotation_period' } });
    fireEvent.click(screen.getByTestId(SORT_ORDER_ASC_SELECTOR));
    fireEvent.click(screen.getByTestId(SORT_APPLY_SELECTOR));

    const expected = ['Bespin', 'Endor', 'Dagobah', 'Hoth', 'Tatooine', 'Alderaan', 'Coruscant', 'Yavin IV', 'Naboo', 'Kamino'];
    const planets = screen.getAllByTestId(PLANET_NAME_SELECTOR);
    const actual = planets.map((planet) => planet.innerHTML);
    expect(actual).toEqual(expected);
  });
});

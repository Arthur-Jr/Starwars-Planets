/* eslint-disable max-len */

import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from './testData';
import renderWithRouter from './RenderWithRouter';

const ROW_ROLE_SELECTOR = 'row';
const INPUT_FILTER_NAME_SELECTOR = 'name-filter';
const COLUMN_FILTER_SELECTOR = 'column-filter';
const COMPARISON_FILTER_SELECTOR = 'comparison-filter';
const VALUE_FILTER_SELECTOR = 'value-filter';
const BUTTON_FILTER_SELECTOR = 'button-filter';
const REMOVE_FILTER_SELECTOR = 'filter';
const END_POINT = ['/planetfinder'];
const DEFAULT_COLUMN_FILTER = ['Population', 'Orbital period', 'Diameter', 'Rotation period', 'Surface water'];

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

describe('Filtra a tabela através de um texto, exibindo somente os planetas cujos nomes incluam o texto digitado', () => {
  beforeAll(mockFetch);
  beforeEach(beforeRender);
  afterEach(cleanup);

  it('Renderiza o campo de texto para o filtro de texto', () => {
    expect(screen.getByTestId(INPUT_FILTER_NAME_SELECTOR)).toBeInTheDocument();
  });

  it('Filtra os planetas que possuem a letra "o" no nome', () => {
    const input = screen.getByTestId(INPUT_FILTER_NAME_SELECTOR);
    userEvent.type(input, 'o');

    const FILTRED_LENGTH = 8;
    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(FILTRED_LENGTH);

    const planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth',
      'Kamino', 'Naboo', 'Tatooine'];
    planetNames.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
  });

  it('Filtra planetas que possuem a letra "oo" no nome', () => {
    const input = screen.getByTestId(INPUT_FILTER_NAME_SELECTOR);
    userEvent.type(input, 'oo');

    const FILTRED_LENGTH = 3;
    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(FILTRED_LENGTH);

    const planetNames = ['Naboo', 'Tatooine'];
    planetNames.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
  });

  it('Faça vários filtros em sequência', () => {
    let planetNames = [];
    const input = screen.getByTestId(INPUT_FILTER_NAME_SELECTOR);

    userEvent.type(input, 'o');
    const FILTRED_LENGTH = 8;
    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(FILTRED_LENGTH);
    planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth',
      'Kamino', 'Naboo', 'Tatooine'];
    planetNames.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());

    fireEvent.change(input, { target: { value: '' } });
    const FILTRED_LENGTH1 = 11;
    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(FILTRED_LENGTH1);
    planetNames = ['Alderaan', 'Bespin', 'Coruscant',
      'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];
    planetNames.forEach((name) => expect(screen.getByText(name)).toBeInTheDocument());
  });
});

describe('Testa se o filtro numérico é renderizado', () => {
  beforeAll(mockFetch);
  beforeEach(beforeRender);
  afterEach(cleanup);

  it('Renderiza o filtro de coluna', () => {
    const column = screen.getByTestId(COLUMN_FILTER_SELECTOR);
    expect(column).toHaveProperty('nodeName', 'SELECT');

    const foundColumnFilter = Array.from(column.children).map((child) => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(foundColumnFilter).toEqual(expect.arrayContaining(DEFAULT_COLUMN_FILTER));
  });

  it('Renderiza o filtro de comparação', () => {
    const column = screen.getByTestId(COMPARISON_FILTER_SELECTOR);
    expect(column).toHaveProperty('nodeName', 'SELECT');

    const columns = ['Greater', 'Equal', 'Lesser'];
    const foundComparisonFilter = Array.from(column.children).map((child) => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(foundComparisonFilter).toEqual(expect.arrayContaining(columns));
  });

  it('Renderiza o campo para o valor do filtro', () => {
    expect(screen.getByTestId(VALUE_FILTER_SELECTOR)).toHaveProperty('nodeName', 'INPUT');
  });

  it('Renderiza o botão para executar a filtragem', () => {
    expect(screen.getByTestId(BUTTON_FILTER_SELECTOR)).toHaveProperty('nodeName', 'BUTTON');
  });
});

describe('Testa as funcionalidades do filtro númerico', () => {
  beforeAll(mockFetch);
  beforeEach(beforeRender);
  afterEach(cleanup);

  it('Filtra utilizando a comparação "Lesser"', () => {
    const FILTRED_LENGTH = 7;

    fireEvent.change(screen.getByTestId(COLUMN_FILTER_SELECTOR), { target: { value: 'surface_water' } });
    fireEvent.change(screen.getByTestId(COMPARISON_FILTER_SELECTOR), { target: { value: 'Lesser' } });
    fireEvent.change(screen.getByTestId(VALUE_FILTER_SELECTOR), { target: { value: '40' } });
    fireEvent.click(screen.getByTestId(BUTTON_FILTER_SELECTOR));

    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(FILTRED_LENGTH);
  });

  it('Filtra utilizando a comparação "Greater"', () => {
    const FILTRED_LENGTH = 8;

    fireEvent.change(screen.getByTestId(COLUMN_FILTER_SELECTOR), { target: { value: 'diameter' } });
    fireEvent.change(screen.getByTestId(COMPARISON_FILTER_SELECTOR), { target: { value: 'Greater' } });
    fireEvent.change(screen.getByTestId(VALUE_FILTER_SELECTOR), { target: { value: '8900' } });
    fireEvent.click(screen.getByTestId(BUTTON_FILTER_SELECTOR));

    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(FILTRED_LENGTH);
  });

  it('Filtra utilizando a comparação "igual a"', () => {
    const FILTRED_LENGTH = 2;

    fireEvent.change(screen.getByTestId(COLUMN_FILTER_SELECTOR), { target: { value: 'population' } });
    fireEvent.change(screen.getByTestId(COMPARISON_FILTER_SELECTOR), { target: { value: 'Equal' } });
    fireEvent.change(screen.getByTestId(VALUE_FILTER_SELECTOR), { target: { value: '200000' } });
    fireEvent.click(screen.getByTestId(BUTTON_FILTER_SELECTOR));

    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(FILTRED_LENGTH);
  });
});

describe('Testa se não é possivel utilizar um filtro mais de uma vez', () => {
  beforeAll(mockFetch);
  beforeEach(beforeRender);
  afterEach(cleanup);

  it('Filtra por população e o remove das opções', () => {
    let column = null;
    let foundColumnFilter = null;

    column = screen.getByTestId(COLUMN_FILTER_SELECTOR);
    expect(column).toHaveProperty('nodeName', 'SELECT');
    foundColumnFilter = Array.from(column.children).map((child) => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(foundColumnFilter).toEqual(expect.arrayContaining(DEFAULT_COLUMN_FILTER));

    fireEvent.change(screen.getByTestId(COLUMN_FILTER_SELECTOR), { target: { value: 'population' } });
    fireEvent.change(screen.getByTestId(COMPARISON_FILTER_SELECTOR), { target: { value: 'Greater' } });
    fireEvent.change(screen.getByTestId(VALUE_FILTER_SELECTOR), { target: { value: '8000' } });
    fireEvent.click(screen.getByTestId(BUTTON_FILTER_SELECTOR));

    const FILTRED_LENGTH = 8;
    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(FILTRED_LENGTH);

    column = screen.getByTestId(COLUMN_FILTER_SELECTOR);
    expect(column).toHaveProperty('nodeName', 'SELECT');
    foundColumnFilter = Array.from(column.children).map((child) => {
      expect(child).toHaveProperty('nodeName', 'OPTION');
      return child.innerHTML;
    });
    expect(foundColumnFilter).toEqual(expect.arrayContaining(['Orbital period', 'Diameter', 'Rotation period', 'Surface water']));

    const FILTRED_LENGTH1 = 4;
    expect(foundColumnFilter).toHaveLength(FILTRED_LENGTH1);
  });
});

describe('Testa a remoção de filtros', () => {
  beforeAll(mockFetch);
  beforeEach(beforeRender);
  afterEach(cleanup);

  const removeFilter = () => {
    const filters = screen.getAllByTestId(REMOVE_FILTER_SELECTOR);
    fireEvent.click(filters[0].querySelector('button'));
  };

  it('Adiciona um filtro e verifica se a tabela foi atualizada com as informações filtradas, depois remove o filtro e verifica se os valores da tabela voltaram ao original', () => {
    const INITIAL_PLANETS = 11;

    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(INITIAL_PLANETS);

    fireEvent.change(screen.getByTestId(COLUMN_FILTER_SELECTOR), { target: { value: 'diameter' } });
    fireEvent.change(screen.getByTestId(COMPARISON_FILTER_SELECTOR), { target: { value: 'Greater' } });
    fireEvent.change(screen.getByTestId(VALUE_FILTER_SELECTOR), { target: { value: '8900' } });
    fireEvent.click(screen.getByTestId(BUTTON_FILTER_SELECTOR));

    const FILTRED_LENGTH = 8;
    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(FILTRED_LENGTH);

    removeFilter();

    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(INITIAL_PLANETS);
  });
});

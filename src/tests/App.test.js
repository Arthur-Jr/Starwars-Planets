/* eslint-disable max-len */

import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from '../App';
import testData from './testData';
import renderWithRouter from './RenderWithRouter';
import capitalizeString from '../globalFuncs/capitalizeString';

const ROW_ROLE_SELECTOR = 'row';
const COLUMN_ROLE_SELECTOR = 'columnheader';
const END_POINT = ['/planetfinder'];

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

describe('Faz uma requisição para a API e preenche a tabela com os dados', () => {
  beforeAll(mockFetch);
  beforeEach(beforeRender);
  afterEach(cleanup);

  it('Realiza uma requisição para a API', () => {
    expect(global.fetch).toHaveBeenCalled();
  });

  it('Preenche a tabela com os dados retornados', () => {
    const planets = testData.results;
    planets.forEach((planet) => {
      const name = screen.getByText(planet.name);
      const rotationPeriod = screen.getAllByText(planet.rotation_period);
      const orbitalPeriod = screen.getAllByText(planet.orbital_period);
      const diameter = screen.getAllByText(planet.diameter);
      const climate = screen.getAllByText(capitalizeString(planet.climate));
      const gravity = screen.getAllByText(planet.gravity);
      const terrain = screen.getAllByText(capitalizeString(planet.terrain));
      const surfaceWater = screen.getAllByText(planet.surface_water);
      const population = screen.getAllByText(planet.population);

      expect(name).toBeInTheDocument();
      expect(rotationPeriod.length).toBeGreaterThanOrEqual(1);
      expect(orbitalPeriod.length).toBeGreaterThanOrEqual(1);
      expect(diameter.length).toBeGreaterThanOrEqual(1);
      expect(climate.length).toBeGreaterThanOrEqual(1);
      expect(gravity.length).toBeGreaterThanOrEqual(1);
      expect(terrain.length).toBeGreaterThanOrEqual(1);
      expect(surfaceWater.length).toBeGreaterThanOrEqual(1);
      expect(population.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('Verifica se a tabela tem 9 colunas', async () => {
    const COLUMN_QUANTITY = 9;
    expect(screen.getAllByRole(COLUMN_ROLE_SELECTOR)).toHaveLength(COLUMN_QUANTITY);
  });

  it('Verifica se a tabela tem uma linha para cada planeta retornado', async () => {
    const PLANETS_QUANTITY = 11;
    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(PLANETS_QUANTITY);
  });

  it('Verifica se tem um título com o texto "Planet Finder" ', () => {
    const title = screen.getByRole('heading', { level: 1, name: 'Planet Finder' });
    expect(title).toBeInTheDocument();
  });
});

describe('Testa o footer', () => {
  beforeAll(mockFetch);
  beforeEach(beforeRender);
  afterEach(cleanup);

  it('Checando os elementos do footer', () => {
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    const socials = screen.getAllByTestId('social-icon');
    expect(socials).toHaveLength(2);
    expect(socials[0]).toBeInTheDocument();
    expect(socials[1]).toBeInTheDocument();
  });
});

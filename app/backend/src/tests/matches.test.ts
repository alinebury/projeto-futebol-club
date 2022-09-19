import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const addMatch = {
  "homeTeam": 16,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const addMatchError = {
  "homeTeam": 8,
  "awayTeam": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const editMatch = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1,
}

describe('Matches Testes', () => {
    afterEach(() => {
      sinon.restore();
    })

    it('Verifica retorno 200 com todos as partidas', async () => {
      const response = await chai.request(app)
        .get('/matches');
      expect(response.status).to.equal(200);
    });

    it('Verifica retorno 200 com partida adicionada', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(addMatch);

      expect(response.status).to.equal(200);
    });

    it('Verifica retorno 200 com partida editada para finish', async () => {
      const response = await chai.request(app)
        .patch('/matches/1/finish');
      
      expect(response.status).to.equal(200);
    });

    it('Verifica retorno 200 com partida editada', async () => {
      const response = await chai.request(app)
        .patch('/matches/1')
        .send(editMatch);

      expect(response.status).to.equal(200);
    });

    it('Verifica retorno 404 partida não encontrada', async () => {
      const response = await chai.request(app)
        .patch('/matches/999/finish');

      expect(response.status).to.equal(404);
    });

    it('Verifica retorno 401 adicionado times iguais', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(addMatchError);
      
      expect(response.status).to.equal(401);
    })
});
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Team Testes', () => {
    afterEach(() => {
      sinon.restore();
    })

    it('Verifica retorno 200 com todos os times', async () => {
      const response = await chai.request(app)
        .get('/teams');
      expect(response.status).to.equal(200);
    });

    it('Verifica retorno 200 com um time', async () => {
      const response = await chai.request(app)
        .get('/teams/1');

      expect(response.status).to.equal(200);
    });

    it('Verifica retorno 404 com time invalido', async () => {
      const response = await chai.request(app)
        .get('/teams/99');

      expect(response.status).to.equal(404);
    })
});
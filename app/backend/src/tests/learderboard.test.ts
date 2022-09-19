import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;


describe('Leardboard Testes', () => {
    afterEach(() => {
      sinon.restore();
    })

    it('Verifica retorno 200 com leardboard time da casa', async () => {
      const response = await chai.request(app)
        .get('/leaderboard/home');

      expect(response.status).to.equal(200);
    });

    it('Verifica retorno 200 com leardboard time de fora', async () => {
      const response = await chai.request(app)
        .post('/leaderboard/away');

      expect(response.status).to.equal(200);
    });

    it('Verifica retorno 200 com leaderboard de todos os times', async () => {
      const response = await chai.request(app)
        .patch('/leaderboard');
      
      expect(response.status).to.equal(200);
    });
});
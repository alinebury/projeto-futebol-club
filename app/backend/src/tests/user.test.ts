import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const login = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const loginError = {
  email: 'error@email.com',
  password: 'error',
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIn0sImlhdCI6MTY2MzU5NTYzM30.ZWo1E6_PMYk2XDe3qtuY1VStbrjhvFMKQnlTXAODgLw'

describe('User Testes', () => {
  describe('Login', () => {
    afterEach(() => {
      sinon.restore();
    })

    it('Verifica retorno 200 com login correto', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(login);
      expect(response.status).to.equal(200);
    });

    it('Verifica retorno 400 sem campo email', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginError.password);

      expect(response.status).to.equal(400);
    });

    it('Verifica retorno 400 sem campo password', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginError.email);

      expect(response.status).to.equal(400);
    });

    it('Verifica retorno 401 com email incorreto', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginError);

      expect(response.status).to.equal(401);
    });

    it('Verifica retorno 401 com password incorreto', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginError);

      expect(response.status).to.equal(401);
    });
  });

  describe('login/validate ', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Verifica retorno 200', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set({'Authorization': token});

      expect(response.status).to.equal(200);
    });
  })
})
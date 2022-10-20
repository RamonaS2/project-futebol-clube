// import LoginService from '../services/loginService'
import User from '../database/models/usersModel';
import { app } from '../app';
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
// import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
    email: "users@user.com",
    password: bcrypt.hashSync('secret_user')
  }

  const roleMock = {
    role: 'user',
  }

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0OTk2OTYyLCJleHAiOjE2NjUwODMzNjJ9.RFTRyjE3vh-0iGCeJX7yiEhSA3_I-6tzSfrg5xkOdoI'
  

describe('testes para rota login', () => {
    // const loginService = new LoginService();
    let chaiHttpResponse: Response;
    before(() => {
        sinon.stub(User, 'findOne').resolves({ ...userMock } as User)
       
    })

    after(() => {
        sinon.restore();
    })

    it('se ele retorna o token', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: userMock.email,
            password: 'secret_user',
          });
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.property('token');
    })

    it('se ele retorna mensagem de errro se o email iinserido for incorreto', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({
            email: userMock.email,
            password: 'secret_user',
          });
        expect(chaiHttpResponse.status).to.equal(200);
        expect(chaiHttpResponse.body).to.have.property('token');
    })

    it('Se retorna messagem de erro quando não tem email', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({
          password: 'wrong_password',
        });
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.property('message');
      })

    it('Retorna mensagem de erro quando a senha é incorreta', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({
          email: userMock.email,
          password: 'wrong_password',
        });
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.have.property('message');
      });

      it('Retorna messagem de erro quando não é inserida a senha', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({
          email: userMock.email,
        });
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.have.property('message');
      });
})

describe('validade do token', () => {
    let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        ...roleMock,
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it( 'Retorna "role", quando autenticado com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', token);
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('role');
  });

  

  it('Retorna mensagem quando não há token', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate');
    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.have.property('message');
  });

});

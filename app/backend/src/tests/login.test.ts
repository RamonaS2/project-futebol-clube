// // import LoginService from '../services/loginService'
// import User from '../database/models/usersModel';
// import { app } from '../app';
// import * as chai from 'chai';
// import * as sinon from 'sinon';
// import * as bcrypt from 'bcryptjs';
// // import * as jwt from 'jsonwebtoken';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { Response } from 'superagent';
// chai.use(chaiHttp);

// const { expect } = chai;

// const userMock = {
//     email: "users@user.com",
//     password: bcrypt.hashSync('secret_user')
//   }

//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY0OTk2OTYyLCJleHAiOjE2NjUwODMzNjJ9.RFTRyjE3vh-0iGCeJX7yiEhSA3_I-6tzSfrg5xkOdoI'
  

// describe('testes para rota login', () => {
//     // const loginService = new LoginService();
//     let chaiHttpResponse: Response;
//     before(() => {
//         sinon.stub(User, 'findOne').resolves({ ...userMock } as User)
       
//     })

//     after(() => {
//         sinon.restore();
//     })

//     it('se ele retorna o token', async () => {
//         chaiHttpResponse = await chai.request(app).post('/login').send({
//             email: userMock.email,
//             password: 'secret_user',
//           });
//         expect(chaiHttpResponse.status).to.equal(200);
//         expect(chaiHttpResponse.body).to.have.property('token');
//     })
// })
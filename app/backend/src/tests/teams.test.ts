import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockTeams = [
  {
    id: 1,
    teamName: "Atletico Mineiro",
  },
  {
    id: 2,
    teamName: "Qualquer outro",
  },
]

describe('teste da rota /teams', () => {
      before(() => {
        Sinon.stub(Team, 'findAll').resolves(mockTeams as Team[])
      });

      after(() => {
        Sinon.restore();
      })

      it('Se retorna todos os times cadastrados', async () => {
        const response = await chai.request(app).get('/teams');
        expect(response.body).to.deep.equal(mockTeams);
      });
      it('Se retorna status 200', async () => {
        const response = await chai.request(app).get('/teams');
        expect(response.status).to.equal(200);
      });
    });



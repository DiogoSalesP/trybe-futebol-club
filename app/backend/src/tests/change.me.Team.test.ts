import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  describe('successful request', () => {
    it('should return status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/teams')
      expect(httpResponse.status).to.equal(200)
    })
  })
  describe('id not found', () => {
    it('should return status 404', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/teams/999')
      expect(httpResponse.status).to.equal(404)
    })
  })
  describe('successful request', () => {
    it('should return status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/teams/4')
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal({ id: '4', teamName: 'Corinthians'})
    })
  })
})

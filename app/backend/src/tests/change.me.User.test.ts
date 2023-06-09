import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('e-mail not informed', () => {
    it('should return status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'secret_admin'})
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({message: "All fields must be filled"})
    })
  })
  describe('password not informed', () => {
    it('should return status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com'})
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({message: "All fields must be filled"})
    })
  })
  describe('e-mail not found', () => {
    it('should return status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admim.com', password: 'secret_admin'})
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({message: "Incorrect email or password"})
    })
  })
  describe('password not found', () => {
    it('should return status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secretAdmin'})
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({message: "Incorrect email or password"})
    })
  })
  describe('successful request', () => {
    it('should return status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin'})
      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.have.key('token')
    })
  })
})

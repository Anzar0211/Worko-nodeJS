const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const sinon = require('sinon');
const bcryptjs = require('bcryptjs');
const userService = require('./userService')

chai.use(chaiHttp);


describe('GET /users with token verification', () => {
  let token;

  before((done) => {
    
    chai.request(app)
      .post('/login')
      .send({
        username: 'testUser',
        password: 'testPassword'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        token = res.body.token;
        done();
      });
  });

  it('should return a list of users without passwords', (done) => {
    chai.request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`) // Use the token
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((user) => {
          expect(user).to.not.have.property('password');
          expect(user).to.have.all.keys('id', 'name', 'email');
        });
        done();
      });
  });

});

describe('GET /user/:userId', () => {
  it('should return user details without the password', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword123'
    };
    userService.getUserById = jest.fn().mockResolvedValue(mockUser);

    const userId = 1;
    const res = await request(app)
      .get(`/user/${userId}`);

    expect(userService.getUserById).toHaveBeenCalledWith(userId);

    
    expect(res.statusCode).toEqual(200);

    
    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });

    
    expect(res.body.password).toBeUndefined();
  });

  it('should handle errors and return a 500 status code', async () => {
    
    userService.getUserById = jest.fn().mockRejectedValue(new Error('Internal server error'));

    const userId = 1;
    const res = await request(app)
      .get(`/user/${userId}`);


    expect(userService.getUserById).toHaveBeenCalledWith(userId);

    
    expect(res.statusCode).toEqual(500);

    expect(res.text).toEqual('Internal server error');
  });
});


describe('GET /user/:userId', () => {
  it('should return user details without the password', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedpassword123'
    };
    userService.getUserById = jest.fn().mockResolvedValue(mockUser);

    const userId = 1;
    const res = await request(app)
      .get(`/user/${userId}`);
    expect(userService.getUserById).toHaveBeenCalledWith(userId);

    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });

    expect(res.body.password).toBeUndefined();
  });

  it('should handle errors and return a 500 status code', async () => {

    userService.getUserById = jest.fn().mockRejectedValue(new Error('Internal server error'));

    const userId = 1;
    const res = await request(app)
      .get(`/user/${userId}`);

    expect(userService.getUserById).toHaveBeenCalledWith(userId);

    expect(res.statusCode).toEqual(500);

    expect(res.text).toEqual('Internal server error');
  });
});
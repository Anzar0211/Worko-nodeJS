const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;


chai.use(chaiHttp);

describe("Registration", () => {
    it('should register a user and return the user object', (done) => {
        chai.request(app)
            .post('/worko/user/signup')
            .send({
                "email": "random@gmail.com",
                "password": "random",
                "name": "random",
                "age": 20,
                "city": "random",
                "zipCode": "random"
            })
            .end((err, res) => {
                expect(err).to.be.null; 
                expect(res).to.have.status(201); 
                expect(res.body).to.be.an('object'); 
                expect(res.body).to.include.keys('email', 'name', 'age', 'city', 'zipCode');
                done();
            });
    });
});

describe("Login", () => {
    it('should login a user and return the user object', (done) => {
        chai.request(app)
            .post('/worko/user/login')
            .send({
                "email": "random@gmail.com",
                "password": "random"
            })
            .end((err, res) => {
                expect(err).to.be.null; 
                expect(res).to.have.status(200); 
                expect(res.body).to.be.an('object'); 
                expect(res.body).to.include.keys('email', 'name', 'age', 'city', 'zipCode');
                done();
            });
    })
});

describe("Logout",()=>{
    it('should logout the user', (done) => {
        chai.request(app)
            .get('/worko/user/logout')
            .end((err, res) => {
                expect(err).to.be.null; 
                expect(res).to.have.status(200); 
                done();
            });
    })
})
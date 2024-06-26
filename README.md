Worko Node.js Project


Worko is a Node.js application that helps job seekers request referrals, review resumes, and receive interview guidance and mock interview services.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Signup, Login)
- Resume Review Service
- Interview Scheduling and Notes
- Career Guidance
- Mock Interviews

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/worko.git
    cd worko
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add your environment variables:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/worko
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Usage

### Signup

```bash
curl -X POST http://localhost:3000/worko/user/signup \
    -H 'Content-Type: application/json' \
    -d '{"email": "testuser@example.com", "password": "password123"}'



Login
bash
Copy code
curl -X POST http://localhost:3000/worko/user/login \
    -H 'Content-Type: application/json' \
    -d '{"email": "testuser@example.com", "password": "password123"}'




Use the returned token for authenticated routes.

API Endpoints

Auth Routes
Signup: POST /worko/auth/signup
Signin: POST /worko/auth/login
Signout:POST /worko/auth/logout

User Routes
getAllUsers: GET /worko/user
getUserDetail: GET /worko/user/:userId
updateUser: PUT /worko/user/:userId
deleteUser: DELETE /worko/user/:userId

Resume Routes
getResumeList: GET /worko/resume
getResumeDetails: GET /worko/resume/:resumeId
createResume: POST /worko/resume
updateResume: PUT /worko/:userId/:resumeId
eleteResume: DELETE /worko/:userId/:resumeId

Interview Routes
getInterviewList: GET /worko/interview
getInterviewDetails: GET /worko/interview/:interviewId
createInterview: POST /worko/interview
Update: PUT /worko/interview/:userId/:interviewId
Delete: DELETE /worko/interview/:userId/:interviewId


Guidance Routes
getGuidanceList: GET /worko/guidance
getGuidanceDetails: GET /worko/guidance/:id
createGuidance: POST /worko/guidance
updateGuidance: POST /worko/guidance/:guidanceId
deleteGuidance: DELETE /worko/guidance/:guidanceId

Mock Interview Routes
getMockInterviewList: GET /worko/mock-interview
getMockInterviewDetails: GET /worko/mock-interview/:mockInterviewId
createMockInterview: POST /worko/mock-interview
updateMockInterview: PUT /worko/mock-interview/:userId/:mockInterviewId
deleteMockInterview: DELETE /worko/mock-interview/:userId/:mockInterviewId




AUTH TESTS

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

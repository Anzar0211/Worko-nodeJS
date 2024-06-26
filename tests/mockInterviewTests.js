const request = require('supertest');
const app = require('../app');  // Ensure your app.js exports the app instance

describe('Mock Interview API', () => {
    let token;
    let userId;

    beforeAll(async () => {
        const userResponse = await request(app)
        .post('/worko/user/signup')
        .send({ email: 'mockinterviewuser@example.com', password: 'password123' });
        token = userResponse.body.token;
        userId = userResponse.body.user._id;
    });

    it('should create a new mock interview', async () => {
        const response = await request(app)
        .post('/worko/mock-interview')
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, schedule: new Date(), feedback: 'Feedback for the mock interview' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    it('should get a mock interview by id', async () => {
        const mockInterview = await request(app)
        .post('/worko/mock-interview')
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, schedule: new Date(), feedback: 'Feedback for the mock interview' });

        const response = await request(app)
        .get(`/worko/mock-interview/${mockInterview.body._id}`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
    });

    it('should update a mock interview', async () => {
        const mockInterview = await request(app)
        .post('/worko/mock-interview')
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, schedule: new Date(), feedback: 'Feedback for the mock interview' });

        const response = await request(app)
        .put(`/worko/mock-interview/${mockInterview.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ schedule: new Date(), feedback: 'Updated feedback for the mock interview' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('feedback', 'Updated feedback for the mock interview');
    });

    it('should delete a mock interview', async () => {
        const mockInterview = await request(app)
        .post('/worko/mock-interview')
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, schedule: new Date(), feedback: 'Feedback for the mock interview' });

        const response = await request(app)
        .delete(`/worko/mock-interview/${mockInterview.body._id}`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });
});

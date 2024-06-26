const request = require('supertest');
const app = require('../app');  // Make sure your app.js exports the app instance

describe('Resume API', () => {
    it('should create a new resume', async () => {
        const response = await request(app)
        .post('/worko/resume')
        .send({ userId: 'user123', content: 'This is a resume content.' });
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should get a resume by id', async () => {
        const resume = await request(app)
        .post('/worko/resume')
        .send({ userId: 'user123', content: 'This is a resume content.' });

        const response = await request(app).get(`/worko/resume/${resume.body.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });
});

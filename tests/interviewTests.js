const request = require('supertest');
const app = require('../app');  // Ensure your app.js exports the app instance

describe('Interview API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    const userResponse = await request(app)
      .post('/worko/user/signup')
      .send({ email: 'interviewuser@example.com', password: 'password123' });
    token = userResponse.body.token;
    userId = userResponse.body.user._id;
  });

  it('should create a new interview', async () => {
    const response = await request(app)
      .post('/worko/interview')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, schedule: new Date(), notes: 'Interview notes' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should get an interview by id', async () => {
    const interview = await request(app)
      .post('/worko/interview')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, schedule: new Date(), notes: 'Interview notes' });

    const response = await request(app)
      .get(`/worko/interview/${interview.body._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id');
  });

  it('should update an interview', async () => {
    const interview = await request(app)
      .post('/worko/interview')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, schedule: new Date(), notes: 'Interview notes' });

    const response = await request(app)
      .put(`/worko/interview/${interview.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ schedule: new Date(), notes: 'Updated notes' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('notes', 'Updated notes');
  });

  it('should delete an interview', async () => {
    const interview = await request(app)
      .post('/worko/interview')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, schedule: new Date(), notes: 'Interview notes' });

    const response = await request(app)
      .delete(`/worko/interview/${interview.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

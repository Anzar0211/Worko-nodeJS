const request = require('supertest');
const app = require('../app');  // Ensure your app.js exports the app instance

describe('Guidance API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    const userResponse = await request(app)
      .post('/worko/user/signup')
      .send({ email: 'guidanceuser@example.com', password: 'password123' });
    token = userResponse.body.token;
    userId = userResponse.body.user._id;
  });

  it('should create a new guidance', async () => {
    const response = await request(app)
      .post('/worko/guidance')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, guidanceType: 'career', description: 'Career guidance' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should get a guidance by id', async () => {
    const guidance = await request(app)
      .post('/worko/guidance')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, guidanceType: 'career', description: 'Career guidance' });

    const response = await request(app)
      .get(`/worko/guidance/${guidance.body._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id');
  });

  it('should update a guidance', async () => {
    const guidance = await request(app)
      .post('/worko/guidance')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, guidanceType: 'career', description: 'Career guidance' });

    const response = await request(app)
      .put(`/worko/guidance/${guidance.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ guidanceType: 'technical', description: 'Technical guidance' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('description', 'Technical guidance');
  });

  it('should delete a guidance', async () => {
    const guidance = await request(app)
      .post('/worko/guidance')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, guidanceType: 'career', description: 'Career guidance' });

    const response = await request(app)
      .delete(`/worko/guidance/${guidance.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

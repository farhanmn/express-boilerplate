import request from 'supertest'

import { app, shutDown } from './../../app.js'
import { Connect, Close } from '#tests/helpers/db-handler.js'

import userServices from '#services/userServices.js'
import { hash } from '#helper/crypto.js'
import { create_token } from '#helper/user.js'

describe('Testing Auth Routes', () => {
  let user
  afterAll(async () => {
    await userServices.delUser({ email: 'only4Test@testing.com' })
    await userServices.delUser({ email: 'only4Test1@testing.com' })

    await Close()
    shutDown()
  })
  beforeAll(async () => {
    await Connect()
    const hashedPassword = hash('password')

    user = await userServices.createUser({
      name: 'Testing',
      email: 'only4Test@testing.com',
      password: hashedPassword.pwd,
      password_salt: hashedPassword.salt,
      status: 1,
    })

    await userServices.createUser({
      name: 'Testing',
      email: 'only4Test1@testing.com',
      password: hashedPassword.pwd,
      password_salt: hashedPassword.salt,
      status: 0,
    })
  })

  describe('Testing login route', () => {
    it('should login successfully', async () => {
      const response = await request(app)
        .post('/v1/users/login')
        .send({ email: 'only4Test@testing.com', password: 'password' })
        .expect(200)
      const body = response.body
      expect(body).toHaveProperty('status')
      expect(body).toHaveProperty('data')
      expect(body.data).toHaveProperty('token')
    })

    it('should not login with wrong password', async () => {
      const response = await request(app)
        .post('/v1/users/login')
        .send({ email: 'only4Test@testing.com', password: 'password1' })
        .expect(401)

      const body = response.body
      expect(body).toHaveProperty('status', 'error')
      expect(body).toHaveProperty('message', 'Email or password is incorrect')
      expect(body).not.toHaveProperty('token')
    })

    it('should not login with wrong email', async () => {
      const response = await request(app)
        .post('/v1/users/login')
        .send({ email: 'only4Test@testing1.com', password: 'password1' })
        .expect(401)

      const body = response.body
      expect(body).toHaveProperty('status', 'error')
      expect(body).toHaveProperty(
        'message',
        'User with that email or phone does not exist'
      )
      expect(body).not.toHaveProperty('token')
    })

    it('should not login with inactive account', async () => {
      const response = await request(app)
        .post('/v1/users/login')
        .send({ email: 'only4Test1@testing.com', password: 'password' })
        .expect(401)

      const body = response.body
      expect(body).toHaveProperty('status', 'error')
      expect(body).toHaveProperty('message', 'User is not active')
      expect(body).not.toHaveProperty('token')
    })
  })

  describe('Testing profile route', () => {
    it('should get profile successfully', async () => {
      const { token } = create_token(
        {
          id: user[0].id,
          name: 'Testing',
        },
        '1m'
      )
      const response = await request(app)
        .get('/v1/users/profile')
        .set('authorization', `Bearer ${token}`)
        .expect(200)

      const body = response.body
      expect(body).toHaveProperty('status', 'success')
      expect(body).toHaveProperty('data')
      expect(body.data).toHaveProperty('id')
      expect(body.data).toHaveProperty('email')
    })

    it('should not get profile with wrong token', async () => {
      const response = await request(app)
        .get('/v1/users/profile')
        .set('Authorization', 'Bearer wrongToken')
        .expect(401)

      const body = response.body
      expect(body).toHaveProperty('status', 'error')
      expect(body).toHaveProperty('message', 'Invalid token')
    })

    it('should not get profile with no token', async () => {
      const response = await request(app).get('/v1/users/profile').expect(401)

      const body = response.body
      expect(body).toHaveProperty('status', 'error')
      expect(body).toHaveProperty('message', 'No token provided')
    })

    it('Should success update profile', async () => {
      const { token } = create_token(
        {
          id: user[0].id,
          name: 'Testing',
        },
        '1m'
      )

      const response = await request(app)
        .put('/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Testing 1',
        })
        .expect(200)
      const body = response.body
      expect(body).toHaveProperty('status', 'success')
      expect(body).toHaveProperty('data')
    })
  })
})

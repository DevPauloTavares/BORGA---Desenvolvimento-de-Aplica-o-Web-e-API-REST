//npm install supertest --save-dev

const request = require('supertest');
const express = require('express');

const borgaData = require('../borga-db.js')
const borgaServices = require('../borga-services.js')(borgaData)
const borgaApiRouter = require('../borga-web-api.js')(express.Router(),borgaServices)
const app = express()
app.use('/api',borgaApiRouter)

test('get all groups', () => {
    return request(app)
      .get('/api/groups')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        console.log(response.body)
        expect(response.body).toStrictEqual(  [
            {
              id: 'dIJ3On4Bu4GvZhtux1Lt',
              name: 'Root',
              description: 'nelson',
              userId: 'meGwJ34BWq8ddl4pi6Ly'
            }
          ])
      })

  });

  router.post('/groups',createNewGroup)                               

test('Create new  group', () => {
    return request(app)
      .get('/api/groups')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        console.log(response.body)
        expect(response.body).toStrictEqual(  [
            {
              id: 'dIJ3On4Bu4GvZhtux1Lt',
              name: 'Root',
              description: 'nelson',
              userId: 'meGwJ34BWq8ddl4pi6Ly'
            }
          ])
      })

  });

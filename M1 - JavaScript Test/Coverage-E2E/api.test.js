const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite Test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP Status 200', async() => {
            const response = await request(app)
                        .get('/contact')
                        .expect(200)
            assert.deepStrictEqual(response.text, 'contact us page')
            console.log('response', response)
        })
    })

    describe('/hello', () => {
        it('should request an inexistent route /hi and redirect to /hello and return HTTP Status 200', async() => {
            const response = await request(app)
                        .get('/hi')
                        .expect(200)
            assert.deepStrictEqual(response.text, 'Hello World!')
            console.log('response', response)
        })
    })

    describe('/login', () => {
        it('should login successfully on the login route and return HTTP Status 200', async() => {
            const response = await request(app)
                        .post('/login')
                        .send({username: "rafaelsiebeneichler", password: "123456"})
                        .expect(200)
            assert.deepStrictEqual(response.text, 'Loging has succeeded!')
        })
        it('should unauthorize a request when using wrong credentials and return HTTP Status 200', async() => {
            const response = await request(app)
                        .post('/login')
                        .send({username: "xuxadasilva", password: "123456"})
                        .expect(401)
            assert.deepStrictEqual(response.text, 'Login has failed!')
            console.log('response', response)
        })
    })
})
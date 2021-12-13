const Service = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
const BASE_URL_1 = "https://swapi.dev/api/planets/1/"
const BASE_URL_2 = "https://swapi.dev/api/planets/2/"
const mocks = {
    tatooine: require('./files/tatooine.json'),
    alderaan: require('./files/alderaan.json'),
}
;
(async() => {
    // {
    //     // vai para a internet
    //     const service = new Service()
    //     const withouStub = await service.makeRequest(BASE_URL_1)
    //     console.log(JSON.stringify(withouStub))
    // }
    const service = new Service()
    const stub = sinon.stub(service, service.makeRequest.name)

    stub
      .withArgs(BASE_URL_1)
      .resolves(mocks.tatooine)

    stub
      .withArgs(BASE_URL_2)
      .resolves(mocks.alderaan)

    // {
    //     const response = await service.makeRequest(BASE_URL_1)
    //     console.log('response', response)
    // }
    {
        const expected = {
            "name": "Tatooine",
            "surfaceWater": "1",
            appearedIn: 5
        }
        const result = await service.getPlanets(BASE_URL_1)
        deepStrictEqual(result, expected)
    }
    {
        const expected = {
            "name": "Alderaan",
            "surfaceWater": "40",
            appearedIn: 2
        }
        const result = await service.getPlanets(BASE_URL_2)
        deepStrictEqual(result, expected)
    }
})()
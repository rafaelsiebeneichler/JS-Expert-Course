const Car = require('./../src/entities/car')
const CarCategory = require('./../src/entities/carCategory')
const Customer = require('./../src/entities/customer')

const { random } = require('faker')
const faker = require('faker')

console.log({
    id: faker.random.uuid(),
    name: faker.name.firstName()
})
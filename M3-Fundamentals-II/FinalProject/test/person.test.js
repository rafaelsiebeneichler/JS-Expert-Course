import { describe, it } from 'mocha'
import { expect } from 'chai'
import Person from '../src/person.js'

describe('Persion', () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '2 Bike,Patinete 6000 2020-01-01 2021-01-01'
        )
        const expected = {
            id: "2",
            vehicles: ['Bike', 'Patinete'],
            kmTraveled: '6000',
            from: '2020-01-01',
            to: '2021-01-01'
        }

        expect(person).to.be.deep.equal(expected)
    })

    it('should format values', () => {
        const person = new Person({
            id: "2",
            vehicles: ['Bike', 'Patinete'],
            kmTraveled: '6000',
            from: '2020-01-01',
            to: '2021-01-01'
        })
        const result = person.formatted('pt-BR')
        const expected = {
            id: 2,
            vehicles: 'Bike e Patinete',
            kmTraveled: '6.000 km',
            from: '01 de janeiro de 2020',
            to: '01 de janeiro de 2021'
        }
        expect(result).to.be.deep.equal(expected)
    })
})
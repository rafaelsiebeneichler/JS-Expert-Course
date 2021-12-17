const assert = require('assert')

// --- keys 
const uniqueKey = Symbol('username')
const user = {}

user["username"] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

// console.log('getting normal Objects', user.username)
// // sempre único em nível de endereço de memoria
// console.log('getting symbol value', user[Symbol("username")])
// console.log('getting symbol value', user[uniqueKey])

assert.deepStrictEqual(user.username, 'value for normal Objects')
assert.deepStrictEqual(user[Symbol("username")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

// é díficil de pegar, mas não é secreto!
// console.log('symbols', Object.getOwnPropertySymbols(user)[0])
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nem tem no cobase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)

// well known symbols
const obj = {
    //iterators
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }

    })
}

// for (const item of obj) {
//     console.log('item', item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }
    [Symbol.toPrimitive](coercionType) {
        if(coercionType !== "string") throw new TypeError()

        const itens = this[kItems]
                        .map(item => 
                                new Intl
                                    .DateTimeFormat("pt-BR", {month: "long", day: "2-digit", year: "numeric"})
                                    .format(item)
                            )
        return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction"}).format(itens)
    }
    *[Symbol.iterator]() {
        for (const item of this[kItems]) {
            yield item
        }
    }
    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms))
        for (const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }
    get [Symbol.toStringTag]() {
        return 'WHAT?'
    }
}

const myDate = new MyDate(
    [2020, 03, 01],
    [2021, 02, 02]
)

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2021, 02, 02)
]

// console.log('myDate', myDate)
// console.log('expectedDates', expectedDates)

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
assert.throws(() => myDate + 1, TypeError)
// console.log('String(myDate)', String(myDate))
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2021')
// implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates)

;(async() => {
    for await(const item of myDate) {
        console.log('asyncIterator', item)
    }
})()
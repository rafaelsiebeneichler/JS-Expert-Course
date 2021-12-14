class Tax {
    static get taxesBasedOnAge() {
        return [
            { from: 18, to: 25, then: 1.1},
            { from: 26, to: 49, then: 1.2},
            { from: 50, to: 100, then: 1.3}
        ]
    }
}

module.exports = Tax
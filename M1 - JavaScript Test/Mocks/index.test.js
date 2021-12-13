const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
;
(async() => {
    {
        const filePath = './files/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './files/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './files/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [  
            {
                "name": "Rafael",
                "id": 1,
                "profession": "JS",
                "age": 24
            },
            {
                "name": "Joao",
                "id": 2,
                "profession": "Mobile",
                "age": 21
            },
            {                
                "name": "Fabio",
                "id": 3,
                "profession": "Analista",
                "age": 35
            }       
        ]
        
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))        
    }
})()

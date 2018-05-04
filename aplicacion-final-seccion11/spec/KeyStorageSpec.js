const { KeyStorage } = require("../src/modules/KeyStorage");
const fs = require('fs')

let mockCrypter = {
    encrypt: (text) => { return text },
    decrypt: (text) => { return text },
    setKey: (key) => { }
}

describe("KeyStorage 1", () => {

    let keyStorage
    let keyfile

    beforeEach(() => {

        keyfile = __dirname + '/keyfile';
        if (fs.existsSync(keyfile)) {
            fs.unlinkSync(keyfile)
        }
        keyStorage = new KeyStorage(mockCrypter, keyfile)
        keyStorage.openDataFile("laclave")
    })

    it("Debe crear un fichero json vacío", () => {

        let file = fs.readFileSync(keyfile, 'utf8')

        expect(file).toBe('{}')
    })

    it("Debe añadir una entrada", () => {
        let keyregister = {
            nombre: "el nombre",
            apellidos: "los apellidos"
        }
        keyStorage.add(keyregister)

        keyStorage.save()

        let json_string = fs.readFileSync(keyfile, 'utf8')

        let _object = JSON.parse(json_string)

        expect(_object.nombre).toBeDefined()
        expect(_object.nombre).toBe("el nombre")
        expect(_object.apellidos).toBeDefined()
        expect(_object.apellidos).toBe("los apellidos")

    })

})

describe("KeyStorage 2", () => {

    let keyStorage
    let keyfile

    beforeEach(() => {
        keyfile = __dirname + '/keyfile';
        if (fs.existsSync(keyfile)) {
            fs.unlinkSync(keyfile)
        }
        keyStorage = new KeyStorage(mockCrypter, keyfile)
        keyStorage.openDataFile("laclave")

        let keyregister1 = {
            clave1: {
                nombre: "el nombre",
                apellidos: "los apellidos"
            }
        }
        let keyregister2 = {
            clave2: {
                nombre: "el nombre2",
                apellidos: "los apellidos2"
            }
        }

        keyStorage.add(keyregister1)
        keyStorage.add(keyregister2)
        keyStorage.save()

    })

    it("Debe encontrar una entrada", () => {


        let k_found = keyStorage.find("clave1")

        expect(k_found.nombre).toBeDefined()
        expect(k_found.nombre).toBe("el nombre")
        expect(k_found.apellidos).toBeDefined()
        expect(k_found.apellidos).toBe("los apellidos")
    })

    it("debe borrar una entrada", () => {
        let k1_deleted = keyStorage.delete('clave1')

        let k1_found = keyStorage.find('clave1')

        expect(k1_found).toBeUndefined()
        
    })

    it("debe pillar todos los items", () => {
        let all = keyStorage.getAll()

        expect(all.clave1).toBeDefined()
        expect(all.clave2).toBeDefined()
        expect(all.clave1.nombre).toBeDefined()
        expect(all.clave1.apellidos).toBeDefined()
        expect(all.clave2.nombre).toBeDefined()
        expect(all.clave2.apellidos).toBeDefined()
    })

    
})
const fs = require("fs");

describe("GUI", () => {
  const { JSDOM } = require("jsdom");
  const {GUI} = require("../src/modules/GUI")

  let document;
  let gui;

  let html = fs.readFileSync(__dirname + "/../src/renderers/index.html", "utf8");

  beforeEach(() => {
    dom = new JSDOM(html);
    document = dom.window.document
    gui = new GUI(document);
  });

  it("debe añadir 2 registros al listado", () => {
    let registers = {
      key1: {
        title: "título1",
        username: "usuario1",
        password: "password1",
        url: "http://url1.com",
        notes: "La nota 1"
      },
      key2: {
        title: "título2",
        username: "usuario2",
        password: "password2",
        url: "http://url2.com",
        notes: "La nota 2"
      },
    }

    let docu = gui.updateRegisterList(registers)

    console.log(document)
    console.log(docu)
    console.log(docu == document)

    expect(docu.getElementById('key1')).not.toBeNull()
    expect(docu.getElementById('key2')).not.toBeNull()
    expect(docu.getElementById('key1').className).toBe("list-group-item active")
  })

  it("debe cambiar los campos del formulario", () => {
    let register = {
      title: "título1",
      username: "usuario1",
      password: "password1",
      url: "http://url1.com",
      note: "La nota 1"
    }

    gui.updateForm(register)

    expect(document.getElementById('title').value).toBe('título1')
    expect(document.getElementById('username').value).toBe('usuario1')
    expect(document.getElementById('password').value).toBe('password1')
    expect(document.getElementById('url').value).toBe('http://url1.com')
    expect(document.getElementById('note').value).toBe('La nota 1')
  })
})

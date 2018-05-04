class GUI {
  constructor(document) {
    this.document = document;
    this.app_title = this.document.getElementById("app_title");
    this.form = this.document.getElementById("form");
    this.title = this.document.getElementById("title");
    this.username = this.document.getElementById("username");
    this.password = this.document.getElementById("password");
    this.url = this.document.getElementById("url");
    this.note = this.document.getElementById("note");
    this.btn_ok = this.document.getElementById("btn_ok");
    this.btn_cancel = this.document.getElementById("btn_cancel");
    this.btn_edit = this.document.getElementById("btn_edit");

    this.current_key = null

    this.keystorage = null
  }

  init() {
    console.log(app_title);
    this.app_title.innerHTML =
      "Almacén de claves ACME (Carga un almacén para comenzar)"
    //this.form.style.visible = "hidden"
    this.addEventsListeners()
    this.putFormInReadOnlyMode();
  }

  setKeyStorage(keystorage) {
    this.keystorage = keystorage
  }

  getCurrentKey() {
    return this.current_key
  }

  editRegister() {
    this.putFormInWriteMode();
    this.title.focus()
  }

  deleteRegister(){
    this.keystorage.delete(this.current_key)
    this.keystorage.save()
    this.updateRegisterList(this.keystorage.getAll())
  }

  addEventsListeners() {
    this.btn_edit.addEventListener('click', (e) => {
      e.preventDefault()
      this.editRegister()
    })

    this.btn_cancel.addEventListener('click', (e) => {
      e.preventDefault()
      this.putFormInReadOnlyMode()
    })

    this.btn_ok.addEventListener('click', (e) => {
      e.preventDefault()
      let register = {}
      register[this.current_key] = {
        title: this.title.value,
        username: this.username.value,
        password: this.password.value,
        url: this.url.value,
        note: this.title.value
      }
      this.keystorage.add(register)
      this.keystorage.save()
      this.updateRegisterList(this.keystorage.getAll())
      this.putFormInReadOnlyMode()
      console.log(e)
    })
  }

  setAppTitle(title) {
    this.app_title.innerHTML = title;
  }

  /**
   *
   * registers, es un objeto con registros
   *
   * Crea un array de elementos li de este tipo:
   *
   * <li id="key1" class="list-group-item active">
   *       <div class="media-body">
   *           <strong>clave1</strong>
   *           <p>http://miservicio.com</p>
   *       </div>
   *   </li>
   */
  updateRegisterList(registers) {
    let reg_list = this.document.getElementById("register-list");
    while (reg_list.firstChild) {
      reg_list.removeChild(reg_list.firstChild);
    }

    let i = 0;
    for (let key in registers) {
      let reg_element = this.document.createElement("li");
      this.current_key = key
      reg_element.className = `list-group-item ${(i == 0) ? 'active' : ''}`;
      reg_element.id = key;
      reg_element.innerHTML = `<div class="media-body">
            <strong>${registers[key].title}<strong>
            <p>${registers[key].url}</p>
        </div>`;

      reg_list.appendChild(reg_element)

      reg_element.addEventListener('click', (e) => {
        let active = this.document.getElementsByClassName("active")[0]
        active.classList.remove("active")
        reg_element.className += ' active'
        this.updateForm(registers[key])
        this.current_key = key
      })
      i++
    }

    if (i > 0) {
      let first_key = Object.keys(registers)[0]
      //this.form.style.visible = "visible";
      this.updateForm(registers[first_key]);
      this.putFormInReadOnlyMode()
    }

    return this.document
  }

  /**
   * register es un objeto registro
   *
   * Actualiza los campos del formulario con el valor del registro
   */
  updateForm(register) {
    this.title.value = register.title;
    this.username.value = register.username;
    this.password.value = register.password;
    this.url.value = register.url;
    this.note.value = register.note;
  }

  /**
   *
   * @param {*} key_pattern
   */
  filterRegisterForm(key_pattern) { }

  putFormInReadOnlyMode() {
    this.title.readOnly = true
    this.username.readOnly = true
    this.password.readOnly = true
    this.url.readOnly = true
    this.note.readOnly = true
    this.btn_cancel.style.display = "none";
    this.btn_ok.style.display = "none";
    this.btn_edit.style.display = "inline";
  }

  putFormInWriteMode() {
    this.title.readOnly = false
    this.username.readOnly = false
    this.password.readOnly = false
    this.url.readOnly = false
    this.note.readOnly = false
    this.btn_cancel.style.display = "inline";
    this.btn_ok.style.display = "inline";
    this.btn_edit.style.display = "none";
  }
}

module.exports.GUI = GUI;
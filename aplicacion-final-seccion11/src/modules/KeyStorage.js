const fs = require("fs");

class KeyStorage {
  constructor(crypter, key_filepath) {
    this.crypter = crypter;
    this.key_filepath = key_filepath;
    this.data_object = null;
  }

  openDataFile(key) {
    this.crypter.setKey(key);

    // Si el fichero no existe lo creamos
    if (!fs.existsSync(this.key_filepath)) {
      fs.writeFileSync(this.key_filepath, this.crypter.encrypt("{}"));
    }

    let data = fs.readFileSync(this.key_filepath, "utf8");
    let decoded_data = this.crypter.decrypt(data);

    // Lanza una excepción si falla
    
    this.data_object = JSON.parse(decoded_data);
  }

  add(key_register) {
   
    Object.assign(this.data_object, key_register);
  }

  save() {
    let data_json = JSON.stringify(this.data_object);
    let encoded_data = this.crypter.encrypt(data_json);

    fs.writeFileSync(this.key_filepath, encoded_data, "utf8");
  }

  find(name){
      return this.data_object[name]
  }

  getAll(){
    return this.data_object
  }

  delete(name){
      return delete this.data_object[name]
  }
}

module.exports.KeyStorage = KeyStorage
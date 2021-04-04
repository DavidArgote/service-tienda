const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const COLLECTION = 'auth';

module.exports = function(injectedStore) {
  let store = injectedStore;
  if(!store) {
    store = require('../../../store/dummy');
  }
  async function login(username, password) {
    const data = await store.query(COLLECTION, { username: username });
    const isValidPassword = await bcrypt.compare(password, data.password);
    if(isValidPassword) {
      return auth.sign(data);
    } else {
      throw new Error('Invalid information');
    }
  }
  async function insert(data) {
    if(data.password) {
      data.password = await bcrypt.hash(data.password, 5);
    }
    return store.insert(COLLECTION, data);
  }
  return {
    insert,
    login,
  }
}
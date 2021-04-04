const auth = require('../auth');
const COLLECTION = 'users';
const ObjectId = require('mongodb').ObjectId;

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(COLLECTION);
  }

  function get(id) {
    return store.get(COLLECTION, id);
  }

  async function insert(body) {
    let { name, lastname, username, email, password } = body;
    const _id = ObjectId();
    
    if (password || username) {
      await auth.insert({
        _id,
        username,
        password,
      });
    }
    return store.insert(COLLECTION, { _id, name, lastname, username, email });
  }

  function update(body) {
    return store.update(COLLECTION, body);
  }

  return {
    list,
    get,
    insert,
    update,
  }
}
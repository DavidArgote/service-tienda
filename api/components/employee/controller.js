const COLLECTION = 'employees';

module.exports = function(injectedStore) {
  let store = injectedStore;
  if(!store) {
    store = require('../../../store/dummy');
  }

  function insert(employee) {
    return store.insert(COLLECTION, employee);
  }

  function update(employee) {
    return store.update(COLLECTION, employee);
  }

  function remove(id) {
    return store.drop(COLLECTION, id);
  }

  function get(id) {
    return store.get(COLLECTION, id);
  }

  function list() {
    return store.list(COLLECTION);
  }

  return {
    insert,
    update,
    remove,
    get,
    list,
  }

}
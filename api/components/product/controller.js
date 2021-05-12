const COLLECTION = 'products';

module.exports = function(injectedStore) {
  let store = injectedStore;
  if(!store) {
    store = require('../../../store/dummy');
  }

  function insert(body) {
    return store.insert(COLLECTION, body);
  }

  function update(body) {
    return store.update(COLLECTION, body);
  }

  function get(id) {
    return store.get(COLLECTION, id);
  }

  function list() {
    return store.list(COLLECTION);
  }

  function drop(id) {
    return store.drop(COLLECTION, id);
  }

  function reportStock() {
    return store.query(COLLECTION, { stock: { $lte: 1 } });
  }

  function updateStock({ id, value }) {
    return store.updateAttribute(COLLECTION, id, { $set: { stock: value } });
  }

  return {
    insert,
    update,
    get,
    list,
    drop,
    updateStock,
    reportStock,
  }

}
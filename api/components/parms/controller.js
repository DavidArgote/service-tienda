const COLLECTION_PARAMS = 'params';

module.exports = function(injectedStore) {
    store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    function get(id) {
        return new Promise( (resolve, reject) => {
            store.get(COLLECTION_PARAMS, id)
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    function list() {
        return new Promise( (resolve, reject) => {
            store.list(COLLECTION_PARAMS)
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    function insert(object) {
        return new Promise( (resolve, reject) => {
            store.insert(COLLECTION_PARAMS, object)
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    function update(object) {
        return new Promise( (resolve, reject) => {
            store.update(COLLECTION_PARAMS, object)
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    return {
        get,
        list,
        insert,
        update,
    }
}
const COLLECTION = 'invoices';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    function create(data) {
        return store.insert(COLLECTION, data);
    }

    function get(id) {
        return store.get(COLLECTION, id);
    }

    function remove(id) {
        return store.drop(COLLECTION, id);
    }

    function list() {
        return store.list(COLLECTION);
    }

    function reportTotals(sdate, fdate) {
        return new Promise((resolve, reject) => {
            store.query(COLLECTION, { date: { 
                $gte: new Date(`${sdate}T00:00:00.000Z`),
                $lte: new Date(`${fdate}T23:59:59.999Z`) 
            }}).then((invoices) => {
                let totalSales = 0;
                let totalProducts = 0;
                let totalInvoices = 0;
                if(invoices.length > 0) {
                    totalInvoices = invoices.length;
                    for(invoice of invoices) {
                        totalSales += Number(invoice.total_pay);
                        totalProducts += Number(invoice.products.length);
                    }
                }
                resolve({ totalSales, totalProducts, totalInvoices });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    return {
        create,
        get,
        remove,
        list,
        reportTotals,
    }
}
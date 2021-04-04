const db = {
  'user': [
    {
      id: '1',
      name: 'David'
    }
  ]
}
async function list(table) {
  return db[table] || [];
}
async function get(table, id) {
  let colllection = await list(table);
  return colllection.filter( (element) => element.id === id)[0] || null;
} 
async function upsert(table, data) {
  if(!db[table]) {
    db[table] = [];
  }
  await db[table].push(data);
  const insert = await get(table, data.id);
  return insert;
}
async function remove(table, id) {
  return true;
}
async function query(table, params) {
  let colllection = await list(table);
  let keys = Object.keys(params);
  let key = keys[0];
  return colllection.filter( (element) => element[key] === params[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
}
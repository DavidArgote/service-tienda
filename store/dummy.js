const db = {
  'user': [
    {
      id: '1',
      name: 'David'
    }
  ]
};

async function list(table) {
  return db[table];
}
async function get(table, id) {
  let colllection = await list(table);
  return colllection.filter( (element) => element.id === id)[0] || null;
} 
async function upsert(table, data) {
  let colllection = await list(table);
  await db[colllection].push(data);
  return get(table, data.id);
}
async function remove(table, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove
}
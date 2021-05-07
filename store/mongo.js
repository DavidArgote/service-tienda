const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const config = require('../config');

const client = new MongoClient(config.mongodb.url, { useUnifiedTopology: true });
let connection = null;

function connect() {
  client.connect((error) => {
    if(error) return console.error(error);
    console.log('MongoDB connected!');
    connection = client.db(config.mongodb.database);
  });
}

connect();
  
function get(nameCollection, id) {
  const collection = connection.collection(nameCollection);
  return new Promise((resolve, reject) => {
    collection.find({ _id: ObjectId(id)}).toArray((error, docs) => {
      if(error) reject(error);
      resolve(docs);
    });
  });
}

function list(nameCollection) {
  const collection = connection.collection(nameCollection);
  return new Promise((resolve, reject) => {
    collection.find({}).toArray((error, docs) => {
      if(error) reject(error);
      resolve(docs);
    });
  });
}

function update(nameCollection, data) {
  const collection = connection.collection(nameCollection);
  return new Promise((resolve, reject) => {
    const { _id, ...newData } = data;
    collection.updateOne({ _id: ObjectId(_id) }, 
      { $set:  newData }, (error, result) => {
        if(error) reject(error);
        resolve(result);
      });
  });
}

function insert(nameCollection, data) {
  if(data.date) {
    data.date = new Date(data.date);
  }
  const collection = connection.collection(nameCollection);
  return new Promise((resolve, reject) => {
    collection.insertOne(data, (error, response) => {
      if(error) reject(error);
      resolve(response);
    });
  });
}

function query(nameCollection, query) {
  const collection = connection.collection(nameCollection);
  return new Promise((resolve, reject) => {
    collection.find(query).toArray((error, docs) => {
      if(error) reject(error);
      resolve(docs);
    });
  });
}

function drop(nameCollection, id) {
  const collection = connection.collection(nameCollection);
  return new Promise((resolve, reject) => {
    collection.deleteOne({ _id: ObjectId(id) }, (error, result) => {
      if(error) reject(error);
      resolve(result);
    })
  });
}

module.exports = {
  insert,
  update,
  get,
  drop,
  list,
  query,
}
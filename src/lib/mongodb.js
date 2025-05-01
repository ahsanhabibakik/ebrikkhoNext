import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

export async function dbConnect() {
  if (!client) {
    client = new MongoClient(uri, options);
    clientPromise = await client.connect();
  }
  return clientPromise.db(process.env.MONGODB_DB);
}

export default clientPromise;

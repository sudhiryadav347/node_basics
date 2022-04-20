const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://sudhiryadav347:DMD9c8e59shVTLC@mongo-node-project-01.ztgy2.mongodb.net/shop?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let _db;

const mongoConnect = (cb) => {
  client
    .connect()
    .then((client) => {
      console.log('connected!');
      // console.log(client);
      _db = client.db()
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => { 
    if(_db){
        return _db;
    }
    throw 'No database found.';
 }

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
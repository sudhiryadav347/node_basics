const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://sudhiryadav347:DMD9c8e59shVTLC@mongo-node-project-01.ztgy2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const mongoConnect = (cb) => {
  client
    .connect()
    .then((client) => {
      console.log('connected!');
      // console.log(client);
      cb(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;

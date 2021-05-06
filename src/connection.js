const mongoose = require("mongoose");

const user = process.env.DBUSER;
const password = process.env.DBPASSWORD;
const dbname = process.env.DBNAME;
const host = "cluster0.ymykr.mongodb.net";

const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

module.exports = mongoose.connect(
  uri,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

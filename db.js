//create an instance of mongoose module
var mongoose = require('mongoose')

//connect to database
mongoose.connect("mongodb://tasks:taskspass@ds031417.mongolab.com:31417/task")

//define a schma for our data - this will ensure our data is always of this form
//if hackers try to insert stuff we don't want in our database, it won't work

var db = {};

var tasksSchema = mongoose.Schema({
  name: String,
  detail: String
})

//this is our model - we will use this to query data
db.tasksModel = mongoose.model("tasksModel", tasksSchema)


exports.db = db;


//static db that is kept in server memory
//this is unusable because every time we restart the server data gets erased
var db = {
  tasks : [
    { name: "teach this really long class",   
      detail: "web apps class"
    },
    { name: "make some new songs",   
      detail: "big hits"
    }
   ] 
}

//create an instance of mongoose module
var mongoose = require('mongoose')

//connect to database
mongoose.connect("mongodb://tasks:taskspass@ds031417.mongolab.com:31417/task")

//define a schma for our data - this will ensure our data is always of this form
//if hackers try to insert stuff we don't want in our database, it won't work
var tasksSchema = mongoose.Schema({
  name: String,
  detail: String
})

//this is our model - we will use this to query data
var tasksModel = mongoose.model("tasksModel", tasksSchema)

/* GET home page. */
exports.home = function(req, res){

  //query the data using our model - we are asking for all the data in the model
  tasksModel.find(function(err,tasks){
    //we are inside the callback function
    //this function doesn't execute immidiately - only after the database returns the responce
    //if there is no error we return our home page and populate the data
    if(!err){
      res.render('index', { 
        title: 'My Tasks',
        tasks: tasks
      });
    }
  })
};

//Get individual task page
exports.task = function(req, res){
    
  //we grab the id form the url - params are defined in route /task/:id
  var id = req.params.id 

  //query our model for data but this time we only want data with specific id
  tasksModel.find({_id:id},function(err,task){ 
    //again we are inside the callback
    //data return by .find method is always an array, even if we get only one element
    //so we must use task[0]
    console.log(task[0])
    if(!err){
      res.render('task', { 
        title: 'My Task',
        task: task[0]
      });
    }
    else{
      res.send(err)
    }
  })
};

//this get request creates a new task
exports.new = function(req, res){

  //grab name of task and detail from url
  //get queries have the form ?key1=value1&key2=value2 and so on
  var name = req.query.name
  var detail = req.query.detail

  //we create a new task object
  var newTask = {
    name : name,
    detail : detail
  }

  //we create a new db model from our taks object
  var task = new tasksModel(newTask);
  //save our new model
  task.save( function(err, obj){
    if(err)
      console.log(err)
    else{
      console.log(obj)
      var id = obj.id
      res.json({id:id})
    }
  })
}






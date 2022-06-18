// init project
const express = require('express'); // the library we will use to handle requests. import it here
const mongodb = require("mongodb"); // load mongodb

const app = express(); // instantiate express
app.use(require("cors")()) // allow Cross-domain requests 
app.use(require('body-parser').json()) // When someone sends something to the server, we can recieve it in JSON format

// listen for requests on port 4567
const port = 4567;

const uri = "mongodb://localhost:27017/";

mongodb.MongoClient.connect(uri, (err, db) => {
    const collection = db.db("MH").collection("Monsters");

    app.get("/:name", (req, res) => {
        console.log(collection);
        let monster = req.params.name;
        monster = monster.charAt(0).toUpperCase() + monster.slice(1);
        console.log(`[GET REQUEST TO /${monster}] Sending back information 
                            about the monster ${monster}`); 
        collection.find({ name: monster }).toArray((err, docs) => {
            if (err) {
              // if an error happens
              res.send("Error in GET req.");
            } else {
              // if all works
              res.send(docs); // send back all monsters found with the matching name
            }
          });
    });

    // base route. Responds to GET requests to the root route ('/')
    app.get("/",(req,res) => {
        collection.find().toArray((err, docs) => {
            if (err) {
              // if an error happens
              res.send("Error in GET req.");
            } else {
              // if all works
              res.send(docs); // send back all users found with the matching username
            }
          });

    });

    // base route. Responds to POST requests to the root route
    app.post("/", (req, res) => {
        res.send("Sending it through the post 📬") // always responds with the string "TODO"
    });

    // Responds to PUT requests to the root route
    app.put("/", (req, res) => {
        res.send("Don't you dare put me up to this.") // always responds with the string "TODO"
    });



    var listener = app.listen(port, () => {
     console.log('Your app is listening on port ' + listener.address().port);
    });

});
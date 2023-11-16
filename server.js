const express = require("express");
const cors = require("cors");
/* const multer = require('multer');
const upload = multer({
  dest: "upload",
  storage: multer.diskStorage({
    destination: (req, file, cb) => { // setting destination of uploading files        
      console.log(file);
      if (file.fieldname === "audio") { // if uploading resume
        cb(null, 'upload');
      } else { // else uploading image
        cb(null, '');
      }
    },
    filename: (req, file, cb) => { // naming file
      let ext;
      if (file.fieldname === "audio") { // if uploading resume
        ext = ".mp3"
      } else { // else uploading image
        ext = ".txt"
      }
      cb(null, file.fieldname+"-"+req.body.ccode+ext);
    }
  })
}); */

const app = express();

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
/* app.use(upload.fields(
  [
    { 
      name: 'audio',
      maxCount: 1 
    }, 
    { 
      name: 'data', 
      maxCount: 1 
    }
  ]
)); */
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded

// app.use(bodyParser.json({limit: '4MB'}))

/* app.use( bodyParser.json({limit: "50mb", type:'application/json'}) );
app.use(bodyParser.urlencoded({ 
  limit: "50mb",
  extended: true,
  parameterLimit: 50000,
  type: 'application/json'

})); */

// app.use(bodyParser());
// app.use(bodyParser.json({limit: '500mb'}))

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PT server." });
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4380;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
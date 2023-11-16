/* const multer = require('multer');
const sftpStorage = require('multer-sftp')
const upload = multer({
  dest: "upload",
  storage: sftpStorage({
    sftp: {
      host: 'ftpupload.net',
      port: 21,
      username: 'epiz_33142324',
      password: 'hZ0vptXWW2R'

    },
    destination: (req, file, cb) => { // setting destination of uploading files        
      console.log(file);
      if (file.fieldname === "audio") { // if uploading resume
        cb(null, 'htdocs/upload');
      } else { // else uploading image
        cb(Error("File not audio"), '');
      }
    },
    filename: (req, file, cb) => { // naming file
      let ext;
      if (file.fieldname === "audio") { // if uploading resume
        ext = ".wav"
      } else { // else uploading image
        ext = ".txt"
      }
      cb(null, file.fieldname+"-"+req.body.ccode+ext);
    }
  })
}); */
module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();
  // var router = app.Router();

  // Create a new Employee
  router.post("/rgemployee", tutorials.registerUser);

  //verifyEmail
  router.post("/verifyemail", tutorials.verifyEmail);

  // Record a new Employer
  router.post("/stemployer", tutorials.recordTemployer);

  // Record Report
  router.post("/store", /* upload.single('audio'),  */tutorials.recordReport);

  // Retrieve all Tutorials
  // router.get("/", tutorials.findAll);
  // router.get("/", tutorials.do);
  router.get("/listen", tutorials.listening);
  router.get("/checkonline", tutorials.online);

  // Retrieve all Industries
  // router.get("/industries", tutorials.getIndustries);

  // Retrieve all start
  router.get("/start", tutorials.start);

  // Retrieve updates
  router.get("/getupdates", tutorials.getUpdates);

  router.get("/employers", tutorials.getEmployers);

  router.post("/employer", tutorials.getEmployer);

  router.get("/published", tutorials.findAllPublished);

  router.get("/download/:id", tutorials.download);


  app.use('/api/pt', router);
};
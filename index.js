var express = require('express')
var bodyParser = require('body-parser')
var validate = require('./utilities/check')
var fs = require('fs');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart(
  { uploadDir:  './uploads'
});
var app = express()
const port = 3000
var data


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text());


app.post('/api/upload', multipartMiddleware, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var actualFileName = req.files.uploads[0].name;
  console.log(actualFileName)
  toBeUploadedPath = './uploads/' + actualFileName;
  console.log(toBeUploadedPath)
  fs.rename(req.files.uploads[0].path, toBeUploadedPath, function(err) {
    if (err) throw err;
    fs.unlink(req.files.uploads[0].path, function() {
        if (err) throw err;
        else{
          validate.toJSON(toBeUploadedPath).then(function (result) {
            console.log(validate.check(result));
            if(validate.check(result)){
              res.json({
                'message': 'File uploaded succesfully.',
                "data": result,
                'status': 200
              });
              // res.status(200).send({
              //   'message': 'File uploaded succesfully.',
              //   "data": result
              //   'status'
              // });
            }
            else{
              // res.status(400).send({'message': 'Incorrect File Format'});
              res.json({
                'message': 'Incorrect File Format',
                'status': 400
              });
            }
          });
        }
    });
  });

});
 
app.listen(port, ()=>{
  console.log(`Listening at http://localhost:${port}`)  
})
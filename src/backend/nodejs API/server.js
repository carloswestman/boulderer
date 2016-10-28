//REQUIRES

//funtions used to calculate Longitud and Latitude increment to define a squared window
// arround latitude and longitude at a distance of radius meters.

 // The number of kilometers per degree of longitude is approximately
    // (2*pi/360) * r_earth * cos(theta)
    // where theta is the latitude in degrees and r_earth is approximately 6378 km.
    // The number of kilometers per degree of latitude is approximately the same at all locations, approx
    // (2*pi/360) * r_earth = 111 km / degree 
    // So you can do:
    // new_latitude  = latitude  + (dy / r_earth) * (180 / pi);
    // new_longitude = longitude + (dx / r_earth) * (180 / pi) / cos(latitude * pi/180);
    // As long as dx and dy are small compared to the radius of the earth and you don't get too close to the poles.

deltaLatitudeFromMeters = function(latitude, longitude, radius) 
{
    return new_latitude  = (radius / 1000 / 6378) * (180 / Math.PI);
};
deltaLongitudeFromMeters = function(latitude, longitude, radius) 
{
    return new_longitude = (radius / 1000 / 6378) * (180 / Math.PI) / Math.cos(latitude * Math.PI /180);
};


var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose   = require('mongoose');
var Grid = require('gridfs-stream');
var im = require('imagemagick');

//Load configuration and private API Tokens
var config = require('./server.config.json');
var upload = multer({ dest: 'uploads/' });
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({ dest: './tmp/'}));

// DIRECTORY STRUCTURE: Create the "uploads" folder if it doesn't exist
fs.exists(__dirname + '/uploads', function (exists) {
    if (!exists) {
        console.log('Creating directory ' + __dirname + '/uploads');
        fs.mkdir(__dirname + '/uploads', function (err) {
            if (err) {
                console.log('Error creating ' + __dirname + '/uploads');
                process.exit(1);
            }
        })
    }
});

//MONGODB-GRIDFS-MOONGOSE INIT
//handle MongoDB connection events
mongoose.connection.on('error', function (err) {
 // Do something
console.log(err);
});
var gfs;
mongoose.connection.on('open', function () {

   gfs = Grid(mongoose.connection.db, mongoose.mongo);
console.log('gfs created'); 
  // all set! 
});
var MongoConnectionString = config.mongoConnectionString; 
mongoose.connect(MongoConnectionString); // connect to our database

var Boulder     = require('./models/boulder');
//EXPRESS ROUTING
 

app.get('/api/pictures/:_id', function(req, res) {
var file_id = mongoose.Types.ObjectId(req.params._id);
       gfs.files.find({ _id: file_id }).toArray(function (err, files) {

            if(files.length===0){
                console.log("no gfs files found");
                        return res.status(400).send({
                                message: 'File not found'
                        });
            }
                console.log("gfs files found");
                res.writeHead(200, {'Content-Type': files[0].contentType});
                var readstream = gfs.createReadStream({
                          _id: files[0]._id
                });
 
            readstream.on('data', function(data) {
                res.write(data);
            });
            
            readstream.on('end', function() {
                res.end();        
            });
 
                readstream.on('error', function (err) {
                  console.log('An error occurred!', err);
                  throw err;
                });
        });

}
);

//new post method base on NodeJs tutorial
app.post('/api/pictures', upload.single('file'), function (req, res) {

    var response = {};
   console.log("incoming file name:" + req.file.name);
   console.log("incoming file path:" + req.file.path);
   console.log("incoming file type:" + req.file.type);

   var file = __dirname + "/" + req.file.name;
    var fileThumb = file + "_thumb";
   console.log("new file path:" + file);
    
   fs.readFile( req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
         if( err ){
              console.log( err );
         };

            //store file into GridFS
              gfsWriteStream = gfs.createWriteStream({
                  filename: 'myimage',
                  mode: 'W',
                  content_type: 'image/jpeg'
                });
            

            gfsWriteStream.on('close', function(file){
                console.log('savedFile data:');
                console.log(file);
                response = {
                   message:'File uploaded successfully',
                   filenameorig:req.file.name,
                   filenamedest: file,
                    id: file._id
              };
                console.log("111");
                res.writeHead(200);
                res.end(JSON.stringify(response));
                //res.end(response);
                console.log("222");
            });
            // Handle stream events --> finish, and error
            gfsWriteStream.on('finish', function(savedFile) {
            console.log("GridFS Write completed. ");
                
            });

            gfsWriteStream.on('error', function(err){
            console.log(err.stack);
            });
            // Write the data to stream with encoding to be utf8
            gfsWriteStream.write(data,'UTF8');

            // Mark the end of file
            gfsWriteStream.end();
            
  });
            
       });
   });


app.route('/api/boulders')
    // create a boulder (accessed at POST http://localhost:8080/api/boulder)
    .post(function(req, res) {        
        console.log('creating boulder');
        var boulder = new Boulder();      // create a new instance of the Boulder model
        boulder.name = req.body.name;  // set the boulder name (comes from the request)
        boulder.ownerId = req.body.ownerId;
        boulder.ownerName = req.body.ownerName;
        boulder.svgViewPortWidth= req.body.svgViewPortWidth;
        boulder.svgViewPortHeight= req.body.svgViewPortHeight;
        boulder.svgData = req.body.svgData;
        boulder.pictureId = req.body.pictureId;
        boulder.pictureNaturalWidth = req.body.pictureNaturalWidth;
        boulder.pictureNaturalHeight = req.body.pictureNaturalHeight;
        boulder.longitude = req.body.longitude;
        boulder.latitude = req.body.latitude;
        boulder.accuracy = req.body.accuracy;
        boulder.grade = req.body.grade;
        // save the boulder and check for errors
        boulder.save(function(err) {
            if (err)
                res.send(err);
console.log(req.body);
            console.log(boulder);
            res.json({ message: 'Boulder created, go for it and crush it man!' });
            console.log('Boulder created, go for it and crush it man!' );
        })
})
        
   // get all the boulders (accessed at GET http://localhost:8080/api/boulders)
   // param: 
    .get(function(req, res) {
        console.log("GET /boulders")
        //get URL params
        var fromDate = req.param("fromDate");
        var longitude = parseFloat(req.param("longitude"));
        var latitude = parseFloat(req.param("latitude"));
        var radius = parseFloat(req.param("radius"));
    
var query = {};    
    
console.log("param fromDate: " + fromDate);
        if(typeof fromDate != 'undefined')
{
query = {"updatedAt": { $gt : fromDate }};
}
console.log("param longitude: " + longitude);
console.log("param latitude: " + latitude);
console.log("param radius: " + radius);
    // x !== x check that x is NaN in javascript
 if ( (longitude == longitude)  && (latitude == latitude)  && (radius == radius))
{

latMinus = (latitude - deltaLatitudeFromMeters(latitude, longitude, radius)) ;
latPlus =   (latitude + deltaLatitudeFromMeters(latitude, longitude, radius));
lonMinus =  (longitude - deltaLongitudeFromMeters(latitude, longitude, radius));
lonPlus =  (longitude  + deltaLongitudeFromMeters(latitude, longitude, radius));
console.log(latMinus);
console.log(latPlus);
    console.log(lonMinus);
    console.log(lonPlus);
query.latitude = { $gt : latMinus , $lt : latPlus };
query.longitude =  { $gt : lonMinus , $lt : lonPlus } ;

}

console.log({"query": query });



        Boulder.find(query,function(err, boulders) {
            if (err)
                res.send(err);

            res.json(boulders);
            console.log("GET /boulders Response Ending");
            res.end();
            console.log("GET /boulders Response Ended");
        });
    });

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

// app/models/boulder.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//var geolocationSchema = new Schema({
//Latitude: Number
//Longitude: Number,
//Altitude: Number,
//Accuracy: Nuber,
//Altitude Accuracy: Number,
//Heading: Number,
//Speed: Number,
//Timestamp: String
//});

var BoulderSchema   = new Schema({
name: String,
ownerId: String,
ownerName: String,
svgViewPortWidth: Number,
svgViewPortHeight: Number,
svgData: String,
pictureId: String,
pictureNaturalWidth: Number,
pictureNaturalHeight: Number,
latitude: Number,
longitude: Number,
accuracy: Number,
grade: Number,
communityGrade: Number,
likes: String,
crush: String

},
{
    timestamps: true
}
);



module.exports = mongoose.model('Boulder', BoulderSchema);

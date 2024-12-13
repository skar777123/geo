var IPGeolocationAPI = require("ip-geolocation-api-javascript-sdk");
var GeolocationParams = require("ip-geolocation-api-javascript-sdk/GeolocationParams.js");
var dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var app = express();

var ipgeolocationApi = new IPGeolocationAPI(process.env.API, false);
var geolocationParams = new GeolocationParams();

function handleResponse(json) {
  try {
    app.use("/location", async (req, res) => {
      res.status(200).json({
        "city": json.city,
        "state": json.state_prov,
        "district": json.district,
        "zip-code": json.zipcode,
        "latitude": json.latitude,
        "longitude": json.longitude,
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

ipgeolocationApi.getGeolocation(handleResponse, geolocationParams);

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});

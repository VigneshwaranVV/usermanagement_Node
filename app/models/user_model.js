const appRoot = require('app-root-path');
var redis = require('redis');
var client = redis.createClient({host : 'localhost', port : 6379});

//This method process the login API request from client using the response from Mulesoft.
function login(req, res, next) {
  console.log("req.body ======>", req.session)

  const bodyValue = req.body
  if (bodyValue.password == "4321") {
    client.get(req.body.email, function (err, reply) {
      if (reply) {
        res.json({
          "status": "success",
          "ResponseCode": 200,
          "message": "Login succeeded",
          // "userData": JSON.parse(reply)
        });
      }
      else {
        res.json({
          "status": "Failed",
          "ResponseCode": 500,
          "message": "Internal error",
        });
      }
    })

  }
  else {
    res.json({
      "status": "Failed",
      "ResponseCode": 422,
      "message": "Login Failed",
      "Reason": {
        "message": "Incorrect password"
      }
    });
  }

}

//This method process the logout API request from client invalidating the user session details in cache.
function logout(req, res, next) {
  res.json({
    "status": "success",
    "message": "LogOutsucceeded",
  });
}

function registerUser(req, res, next) {
  const reqBody = req.body;
  let formData = reqBody.formData ? reqBody.formData : {};
  client.set(reqBody.email, JSON.stringify(formData), function (err, reply) {
    console.log(reply);
  });
  res.json({
    "status": "success",
    "message": "Registration success",
  });
}


module.exports = {
  login,
  logout,
  registerUser
}
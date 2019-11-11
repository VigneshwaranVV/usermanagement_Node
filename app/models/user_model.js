const appRoot = require('app-root-path');
const rclient = require(appRoot + "/utils/redis_client")();

//This method process the login API request from client using the response from Mulesoft.
function login(req, res, next) {
  console.log("req.body ======>", req.session)

  const bodyValue = req.body
  if (bodyValue.password == "4321") {
    rclient.get(req.body.email, function (err, reply) {
      if (reply) {
        res.json({
          "status": "success",
          "responseCode": 200,
          "message": "Login succeeded",
          "userData": JSON.parse(reply)
        });
      }
      else {
        res.json({
          "status": "Failed",
          "responseCode": 422,
          "message": "User Not found",
        });
      }
    })

  }
  else {
    res.json({
      "status": "Failed",
      "responseCode": 422,
      "message": "Incorrect password"
    });
  }

}

//This method process the logout API request from client invalidating the user session details in cache.
function logout(req, res, next) {
  res.json({
    "status": "success",
    "responseCode": 200,
    "message": "LogOutsucceeded",
  });
}

function registerUser(req, res, next) {
  const reqBody = req.body;
  let formData = reqBody.formData ? reqBody.formData : {};
  rclient.set(formData.email, JSON.stringify(formData), function (err, reply) {
    console.log(reply);
  });
  res.json({
    "status": "success",
    "responseCode": 200,
    "message": "Registration success",
  });
}


module.exports = {
  login,
  logout,
  registerUser
}
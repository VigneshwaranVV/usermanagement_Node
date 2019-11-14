const appRoot = require('app-root-path');
const rclient = require(appRoot + "/utils/redis_client")();
const constants = require(appRoot + "/common/constants")
//This method process the login API request from client using the response from Mulesoft.
function login(req, res, next) {
  console.log("req.body ======>", req.session)

  const bodyValue = req.body
  if (bodyValue.password == "43211") {
    rclient.get(req.body.email, function (err, reply) {
      if (reply) {
        res.json({
          "status": "success",
          "responseCode": constants.STATUS_CODE.SUCCESS,
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
    res.status(401).json({
      "status": "Failed",
      "responseCode": 401,
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

function deleteUser(req, res, next) {
  const reqBody = req.body;
  rclient.del(reqBody.email, function (err, reply) {
    console.log(reply);
  });
  res.json({
    "status": "success",
    "responseCode": 200,
    "message": "User account Removed",
  });
}


module.exports = {
  login,
  logout,
  registerUser,
  deleteUser
}
const appRoot = require('app-root-path');

//This method process the login API request from client using the response from Mulesoft.
function login(req, res, next) {
  console.log("req.body ======>", req.body)
  const bodyValue = req.body
  if (bodyValue.password == "4321") {
    res.json({
      "status": "success",
      "msg": "Login succeeded",
      "userData": [{ name: "Vignesh", msg: "Welcome back" }]
    });
  }
  else {
    res.json({
      "status": "failure",
      "msg": "Login Failed",
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
    "msg": "LogOutsucceeded",
  });
}


module.exports = {
  login,
  logout
}
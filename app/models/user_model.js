const appRoot = require('app-root-path');
const constants = require(appRoot + "/common/constants")
const users_schema = require(appRoot + "/app/models/db_model/users")
const bcrypt = require('bcryptjs');
//This method process the login API request from client using the response from Mulesoft.
function login(req, res, next) {
  const bodyValue = req.body
  users_schema.findOne({ email: bodyValue.email }).then(reply => {
    console.log(reply)
    if (!reply) {
      res.json({
        "status": "Failed",
        "responseCode": 422,
        "message": "User Not found",
      });
    }

    bcrypt.compare(bodyValue.password, reply.password).then(isMatch => {
      if (isMatch) {
        res.json({
          "status": "success",
          "responseCode": constants.STATUS_CODE.SUCCESS,
          "message": "Login succeeded",
          "userData": reply.formData
        });
      }
      else {
        res.status(401).json({
          "status": "Failed",
          "responseCode": 401,
          "message": "Incorrect password"
        });
      }
    })
  })
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

  users_schema.findOne({ email: formData.email }).then(email => {
    if (email) {
      return res.json({
        "status": "failed",
        "responseCode": 401,
        "message": "Email already exist",
      });
    } else {

      let modified = Object.assign({}, formData);
      delete modified.password;

      let newUser = new users_schema({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        formData: modified
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({
              "status": "success",
              "responseCode": 200,
              "data": user.formData,
              "message": "Registration success",
            }))
            .catch(err => {
              console.log(err);
              res.status(400).json({
                "responseCode": constants.STATUS_CODE.INTERNAL_SERVER_ERROR,
                message: "Unable to add user try again later"
              });
            });
        });
      });
    }
  });

}

function deleteUser(req, res, next) {
  const reqBody = req.body;
  users_schema.findOneAndRemove({ email: reqBody.email }).then(() => {
    res.json({
      "status": "success",
      "responseCode": 200,
      "message": "User removed",
    });
  }
  )
    .catch(err => {
      res.status(400).json({
        "responseCode": constants.STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "Internal server error"
      });
    })
}

function updateUser(req, res, next) {
  const reqBody = req.body;
  let formData = reqBody.formData ? reqBody.formData : {};
  users_schema.updateOne({ email: formData.email }, { formData: formData }).then(reply => {
    if (!reply) {
      return res.json({
        "status": "failed",
        "responseCode": 401,
        "message": "User doesn't exist",
      });
    } else {
      res.json({
        "status": "success",
        "responseCode": 200,
        "data": formData,
        "message": "UserData updated",
      })
    }
  });

}
module.exports = {
  login,
  logout,
  registerUser,
  deleteUser,
  updateUser
}
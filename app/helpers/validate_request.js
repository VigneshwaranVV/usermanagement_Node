

class ValidateRequestController {
    validateRegistrationData(req, res, next) {
        let mandatoryDataValidationFailedCount = 0;
        let errorMsg = "Not valid"
        const reqBody = req.body;
        if (reqBody !== undefined) {
            let email_regex = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;
            if(!reqBody.formData.email){
                mandatoryDataValidationFailedCount++;
                errorMsg = "email field is required" 
            }
            else if (reqBody.formData.email && !(email_regex.test(reqBody.formData.email))) {
                mandatoryDataValidationFailedCount++;
                errorMsg = "Please provide valid email"
            }
            if (mandatoryDataValidationFailedCount > 0) {
                res.status(400).json({
                    Status: "failure",
                    ResponseCode: 400,
                    Reasons: [
                        {
                            ReasonCode: 601,
                            ReasonDescription: errorMsg
                        }
                    ]
                });
            }
            else {
                next();
            }

        }
        else {
            res.status(401).json({
                Status: "failure",
                ResponseCode: 422,
                Reasons: [
                    {
                        ReasonCode: 601,
                        ReasonDescription: "Register data not valid."
                    }
                ]
            });
        }
    }
}

module.exports = ValidateRequestController;
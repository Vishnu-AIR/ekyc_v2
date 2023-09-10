var request = require("request");
const UserServices = require("./service");


exports.consent = async (name, caseId, aadhaar) => {

  const currentEpochTimeSeconds = Math.floor(Date.now() / 1000);
  console.log("qwert");
  var options1 = {
    method: "POST",
    url: "https://testapi.karza.in/v3/aadhaar-consent",
    headers: {
      "x-karza-key": "1noblAZ0o8J6NJsj",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lat: "19",
      long: "82",
      userAgent: "Mozilla",
      deviceId: "xxxx-optional",
      deviceInfo: "1234-optional",
      browserInfo: "Browser Data",
      consent: "Y",
      name: name,
      consentTime: currentEpochTimeSeconds,
      consentText: "I hereby declare that.",
      clientData: {
        caseId: caseId,
      },
    }),
  };


  await request(options1, function (error, response) {
    if (error) throw new Error(error);
  
    var options2 = {
      method: "POST",
      url: "https://testapi.karza.in/v2/aadhaar-verification",
      headers: {
        "x-karza-key": "1noblAZ0o8J6NJsj",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aadhaarNo: aadhaar,
        consent: "Y",
        checkValidation: true,
        accessKey: JSON.parse(response.body).requestId,
        clientData: {
          caseId: caseId,
        },
      }),
    };
    console.log(JSON.parse(response.body));
    request(options2, function (err, response) {
      if (error) throw new Error(error);
      
      const data = {
        "mobile": "123456",
        "gender": "male",
        "state": "delhi",
        "ageBand": "20-30",
        "isIssued": "Y",
        "caseId": JSON.parse(response.body).clientData.caseId
      }
      console.log(JSON.parse(response.body).clientData.caseId);

      UserServices.registerUser(data)
    });
  });
  //return "qwrty";
};


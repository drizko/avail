require("dotenv").config();
const fetch = require("node-fetch");
const HTMLParser = require("node-html-parser");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const links = [
  // Insert links here
];

// format +15555555555
const fromNumber = "";
const toNumber = "";

links.forEach(url => {
    fetch(url)
      .then((res) => res.text())
      .then((result) => {
        let root = HTMLParser.parse(result);

        let tmp = root.querySelectorAll('.unavailable');
        if (tmp.length) {
            client.messages
              .create({
                body: url,
                from: fromNumber,
                to: toNumber,
              })
              .then((message) => console.log(message.sid));
        }
      });
})

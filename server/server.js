const {request} = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const uuid4 = require('uuid4');
const nodemailer = require("nodemailer");
const creds = require("./config");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded());




const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  });
  
  transporter.verify((err, success) => {
    if (err) {
      console.log(error);
    } else {
      console.log("Successfully signed into Gmail account");
    }
  });
  
  app.post("/send", (req, res) => {
    const { name } = req.body;
    const { message } = req.body;
  
    let mail = {
      from: name,
      to: "Enter your email here",
      subject: "Feedback From The Blog",
      html: `${message}` + "<br><br>Kindly,<br>" + `${name}`
    };
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({ msg: "err" });
      } else {
        res.json({ msg: "suc" });
      }
    });
  });












app.listen(8080, () => {
    console.log('The server is running');
});


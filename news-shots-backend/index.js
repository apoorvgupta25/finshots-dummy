require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');

var nodemailer = require('nodemailer');
const { google } = require("googleapis");

var draftToHtml = require('draftjs-to-html');
const fetch = require('cross-fetch');

// var {getAllSubs} = require('./config.js');

const app = express();

// DB connection
mongoose.connect(process.env.DATABASE, {}).then(() => {
    console.log("DB CONNECTED");
});


// Middleware
const bodyParser =  require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const postRoutes = require('./routes/post');
const subscriberRoutes = require('./routes/subscriber');

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", postRoutes);
app.use("/api", subscriberRoutes);


const port = 3001;

app.get('/', (req, res) => {
    res.send('Working');
})

app.listen(port, () => { console.log("Port is ready");})

// Email Notification
// OAuth setup
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
     process.env.client_id,
     process.env.client_secret,
     "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({ refresh_token: process.env.refresh_token });

const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: "samplesample892@gmail.com",
          clientId: process.env.client_id,
          clientSecret: process.env.client_secret,
          refreshToken: process.env.refresh_token,
          accessToken: accessToken
     }
});

// send mail
app.post('/api/send/post', (req, res, next) => {
    var title = req.body.title
    var desc = req.body.description
    var content = req.body.content
    var link = req.body.link

    content = draftToHtml(JSON.parse(content))

    var emails = [];
    var ids = [];
    fetch(`${process.env.BACKEND_API}/all/subscribers`, { method: "GET"})
        .then(response => response.json())
        .then(data => subs = data)
        .then(() => {
            subs.map((subscriber, index) => {
                emails.push(subscriber.email)
                ids.push(subscriber._id)
            })

            emails.map((email, idx) => {
                const mail = {
                     from: "samplesample892@gmail.com",
                     to: email,
                     subject: `NewsShots Daily - ${title}`,
                     html:
                         `desc: ${desc}<br/>
                         <a href="http://localhost:3000/daily/${link}">Read Whole Article</a><br/>
                         ${content}

                         <br/>
                         <a data-confirm="Are you sure?" data-method="delete" href="${process.env.BACKEND_API}/remove/subscriber/${ids[idx]}" rel="nofollow">Unsubscribe</a>
                         `
                };

                smtpTransport.sendMail(mail, (err, data) => {
                    if (err){
                        res.json({ status: 'fail' })
                    } else {
                        res.json({ status: 'success' })
                    }
                     smtpTransport.close();
                });
            })
        })
        .catch(err => console.log(err));
})

// Email Confirmation Link

app.post('/api/verify', (req, res, next) => {

    var mail = req.body.email;

    const verify_mail = {
         from: "samplesample892@gmail.com",
         to: mail,
         subject: "Email For Verfication to Subscribe to News-shots",
         html:
         `
         Subscribe to News-shots
         <form action="${process.env.BACKEND_API}/add/subscriber" method="post">
            <input type="hidden" id="email" name="email" value=${mail}><br><br>
            <input type="submit" value="Confirm Email To Subscribe">
         </form>
         `
    };

    smtpTransport.sendMail(verify_mail, (err, data) => {
        if (err){
            res.json({ status: 'fail' })
        } else {
            res.json({ status: 'success' })
        }
         smtpTransport.close();
    });
})

// send verification message
smtpTransport.verify((error, success) => {
  if (error) { console.log(error); }
  else { console.log(`Server is ready to take messages at port ${port}`); }
});

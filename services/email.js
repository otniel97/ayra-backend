// ====================================================
//      EMAIL SERVICE
//      By ARYA Team ©
// ====================================================

const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

//config mail
var smtpTrans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
        expires: 1484314697598
    },
    tls: {
        rejectUnauthorized: false
    }
});

smtpTrans.use('compile', handlebars({
    viewEngine: {
        partialsDir: '../templates',
        layoutsDir: '../templates',
        defaultLayout: false
    },
    viewPath: './templates'
}))

async function sendMail(subject, email, template, context) {

    var mailOptions = {
        to: email,
        from: process.env.EMAIL_USER, //change this
        subject: subject,
        template: template,
        context: context
    };

    smtpTrans.sendMail(mailOptions, function(error) {
        if (error) {
            console.log(error);
            return false;
        } else
            return true;
    });

}

function dateForEmail(dbbDate) {
    var emailDate = new Date(dbbDate);

    var month = emailDate.getMonth() + 1;
    var day = emailDate.getDate();
    var year = emailDate.getFullYear();
    return day + "-" + month + "-" + year;
}

async function sendMultipleInvitationMails(objectArray, subject, template, event, body) {

    if (objectArray.length !== 0) {
        objectArray.forEach((item) => {
            var context = {
                name: item.name,
                email: item.email,
                date: dateForEmail(event.realDate),
                place: event.place,
                time: event.time,
                eventName: event.name,
                reason: body.description
            }

            var mailOptions = {
                to: item.email,
                from: process.env.EMAIL_USER, //change this
                subject: subject,
                template: template,
                context: context
            };

            smtpTrans.sendMail(mailOptions, function(error) {
                if (error) {
                    console.log(error);
                    return false;
                }
            });
        })
    } else
        return true
}

async function sendMultipleGuestMails(objectArray, subject, template, event, body) {

    if (objectArray.length !== 0) {
        objectArray.forEach((item) => {
            var context = {
                name: item.name,
                email: item.email,
                date: body.realDate,
                place: event.place,
                time: event.time,
                eventName: event.name,
            }

            var mailOptions = {
                to: item.email,
                from: process.env.EMAIL_USER, //change this
                subject: subject,
                template: template,
                context: context
            };

            smtpTrans.sendMail(mailOptions, function(error) {
                if (error) {
                    console.log(error);
                    return false;
                }
            });
        })
    } else
        return true
}

module.exports = {
    sendMail,
    sendMultipleGuestMails,
    sendMultipleInvitationMails
}
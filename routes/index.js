// ====================================================
//      Rutas API
//      By ARYA Team ©
// ====================================================

const express = require('express');
const app = express();

//archivo de rutas de modelo donationtype
app.use('/donationtype', require('./donationtype'));

app.use('/donation', require('./donation'));

app.use('/organization', require('./organization'));

app.use('/faq', require('./faq'));

app.use('/message', require('./message'));

app.use('/pharmacy', require('./pharmacy'));

app.use('/medicalcenter', require('./medicalcenter'));

app.use('/servicetype', require('./servicetype'));

app.use('/service', require('./service'));

//archivo de rutas for get files
app.use('/file', require('./file'));

app.use('/generalinformation', require('./generalinformation'));

app.use('/illness', require('./illness'));

app.use('/riskfactor', require('./riskfactor'));

app.use('/speciality', require('./speciality'));

app.use('/persontype', require('./persontype'));

app.use('/role', require('./role'));

app.use('/app', require('./application'));

app.use('/function', require('./systemfunction'));

app.use('/systemFunctionRole', require('./systemfunctionrole'));

app.use('/donative', require('./donative'));

app.use('/web', require('./web'));

app.use('/messagetype', require('./messagetype'));

app.use('/posttype', require('./posttype'));

app.use('/postcategory', require('./postcategory'));

app.use('/eventtype', require('./eventtype'));

app.use('/appointmenttype', require('./appointmenttype'));

app.use('/participanttype', require('./participanttype'));

app.use('/resource', require('./resource'));

app.use('/requesttype', require('./requesttype'));

app.use('/resultparameter', require('./resultparameter'));

app.use('/measurementtype', require('./measurementtype'));

app.use('/ratingtype', require('./ratingtype'));

app.use('/timetable', require('./timetable'));

app.use('/user', require('./user'));

app.use('/people', require('./people'));

app.use('/notificationtype', require('./notificationtype'));

app.use('/post', require('./post'));

app.use('/comment', require('./comment'));

app.use('/personTimetable', require('./persontimetable'));

app.use('/prepatient', require('./prepatient'));

app.use('/patient', require('./patient'));

app.use('/legalGuardian', require('./legalguardian'));

app.use('/glucoseMeasurement', require('./glucosemeasurement'));

app.use('/appointment', require('./appointment'));

app.use('/assignedDonative', require('./assigneddonative'));

app.use('/appointmentcancel', require('./appointmentcanceltype'));

app.use('/messagecancel', require('./messagecanceltype'));

app.use('/eventcancel', require('./eventcanceltype'));

app.use('/diabetes', require('./diabetestype'));

app.use('/request', require('./request'));

app.use('/bitacora', require('./bitacora'));

app.use('/event', require('./event'));

app.use('/eventDetail', require('./eventdetail'));

app.use('/eventContingency', require('./eventcontingency'));

app.use('/rating', require('./rating'));

app.use('/notification', require('./notification'));

module.exports = app;
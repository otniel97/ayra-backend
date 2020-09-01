// ====================================================
//      NOTIFICATION SERVICE
//      By ARYA Team ©
// ====================================================

const Notification = require('../models').Notification;
const models = require('../models');
const pushNotification = require('../services/pushnotification');

async function newAppointmentAdmission(personId) {
    try {
        const person = await models.People.findOne({
            where: { id: personId },
            include: {
                model: models.User
            }
        });
        await Notification.create({ typeId: 1, userId: person.userId, model: 'appointment admission', status: false });
        if (person.User.mobileToken)
            pushNotification.sendPushNotification(1, person.User.mobileToken);
    } catch (error) {
        console.log(error.message);
    }
}

async function newAppointment(personId, patientId) {
    try {
        const person = await models.People.findOne({
            where: { id: personId },
            include: {
                model: models.User
            }
        });
        const patient = await models.Patient.findOne({
            where: { id: patientId },
            include: {
                model: models.User
            }
        });
        await Notification.create({ typeId: 1, userId: person.userId, model: 'appointment new', status: false });
        await Notification.create({ typeId: 1, userId: patient.userId, model: 'appointment new', status: false })
        if (person.User.mobileToken)
            pushNotification.sendPushNotification(1, person.User.mobileToken);
        if (patient.User.mobileToken)
            pushNotification.sendPushNotification(1, patient.User.mobileToken);
    } catch (error) {
        console.log(error.message);
    }
}

async function cancelAppointment(personId, patientId) {
    try {
        const person = await models.People.findOne({
            where: { id: personId },
            include: {
                model: models.User
            }
        });
        const patient = await models.Patient.findOne({
            where: { id: patientId },
            include: {
                model: models.User
            }
        });
        await Notification.create({ typeId: 2, userId: person.userId, model: 'appointment cancel', status: false });
        await Notification.create({ typeId: 2, userId: patient.userId, model: 'appointment cancel', status: false });
        if (person.User.mobileToken)
            pushNotification.sendPushNotification(2, person.User.mobileToken);
        if (patient.User.mobileToken)
            pushNotification.sendPushNotification(2, patient.User.mobileToken);
    } catch (error) {
        console.log(error.message);
    }
}

async function appointmentCompleted(patientId) {
    try {
        const patient = await models.Patient.findOne({
            where: { id: patientId },
            include: {
                model: models.User
            }
        });
        await Notification.create({ typeId: 15, userId: patient.userId, model: 'appointment completed', status: false });
        if (patient.User.mobileToken)
            pushNotification.sendPushNotification(15, patient.User.mobileToken);
    } catch (error) {
        console.log(error.message);
    }
}

async function glucoseMeasurement(patientId) {
    try {
        const patient = await models.Patient.findOne({
            where: { id: patientId },
            include: {
                model: models.User
            }
        });
        await Notification.create({ typeId: 3, userId: patient.userId, model: 'glucose', status: false });
        if (patient.User.mobileToken)
            pushNotification.sendPushNotification(3, patient.User.mobileToken)
    } catch (error) {
        console.log(error.message);
    }
}

async function newMessage() {
    try {
        const roles = await models.Role.findAll({
            include: {
                model: models.SystemFunction,
                where: { id: 44 }
            },
        });
        const roleIds = [];
        await roles.forEach((item) => {
            roleIds.push(item.id);
        });
        const users = await models.User.findAll({
            include: {
                model: models.Role,
                where: { id: roleIds }
            }
        });
        await users.forEach((item) => {
            Notification.create({ typeId: 4, userId: item.id, model: 'message new', status: false });
        });
        pushNotification.sendUserPushNotifications(4, users);
    } catch (error) {
        console.log(error.message);
    }
}

async function newRequest() {
    try {
        const roles = await models.Role.findAll({
            include: {
                model: models.SystemFunction,
                where: { id: 41 }
            },
        });
        const roleIds = [];
        await roles.forEach((item) => {
            roleIds.push(item.id);
        });
        const users = await models.User.findAll({
            include: {
                model: models.Role,
                where: { id: roleIds }
            }
        });
        await users.forEach((item) => {
            Notification.create({ typeId: 5, userId: item.id, model: 'request new', status: false });
        });
        pushNotification.sendUserPushNotifications(5, users);
    } catch (error) {
        console.log(error.message);
    }
}

async function newPrepatient() {
    try {
        const roles = await models.Role.findAll({
            include: {
                model: models.SystemFunction,
                where: { id: 40 }
            },
        });
        const roleIds = [];
        await roles.forEach((item) => {
            roleIds.push(item.id);
        });
        const users = await models.User.findAll({
            include: {
                model: models.Role,
                where: { id: roleIds }
            }
        });
        await users.forEach((item) => {
            Notification.create({ typeId: 6, userId: item.id, model: 'prepatient new', status: false });
        });
        pushNotification.sendUserPushNotifications(6, users);
    } catch (error) {
        console.log(error.message);
    }
}

async function newAssignedDonative(patientId) {
    try {
        const patient = await models.Patient.findOne({
            where: { id: patientId },
            include: {
                model: models.User
            }
        });
        await Notification.create({ typeId: 7, userId: patient.userId, model: 'donative new', status: false });
        if (patient.User.mobileToken)
            pushNotification.sendPushNotification(7, patient.User.mobileToken);
    } catch (error) {
        console.log(error.message);
    }
}

async function eventInvitation(typeId, eventDetailId, reason, patients, participants) {
    try {
        const ids = [];
        const users = [];
        const tokens = [];
        if (patients) {
            await patients.forEach((item) => {
                ids.push(item.userId);
            });
            const us = await models.User.findAll({ where: { id: ids } })
            await us.forEach((item) => {
                users.push(item.id);
                if (item.mobileToken)
                    tokens.push(item.mobileToken);
            });
        }
        if (participants)
            await participants.forEach((item) => {
                users.push(item.userId);
                if (item.User.mobileToken)
                    tokens.push(item.User.mobileToken);
            });
        await users.forEach((item) => {
            Notification.create({ typeId, userId: item, modelId: eventDetailId, model: reason, status: false });
        });
        pushNotification.sendPushNotificationsByTokens(typeId, tokens);
    } catch (error) {
        console.log(error.message);
    }
}

async function eventContingency(typeId, eventDetailId, reason, patients, participants) {
    try {
        const users = [];
        const ids = [];
        const tokens = [];
        if (patients) {
            await patients.forEach((item) => {
                ids.push(item.patientId);
            });
            const ps = await models.Patient.findAll({ where: { id: ids }, include: [models.User] })
            await ps.forEach((item) => {
                users.push(item.userId);
                if (item.User.mobileToken)
                    tokens.push(item.User.mobileToken);
            });
        }
        if (participants)
            await participants.forEach((item) => {
                users.push(item.userId);
                if (item.User.mobileToken)
                    tokens.push(item.User.mobileToken);
            });
        await users.forEach((item) => {
            Notification.create({ typeId, userId: item, modelId: eventDetailId, model: reason, status: false });
        });
        console.log(tokens);
        if (tokens.length > 0)
            pushNotification.sendPushNotificationsByTokens(typeId, tokens);
    } catch (error) {
        console.log(error.message);
    }
}

async function messageResponse(userId) {
    try {
        const user = await models.User.findOne({ where: { id: userId } });
        await Notification.create({ typeId: 11, userId, model: 'message response', status: false });
        if (user.mobileToken)
            pushNotification.sendPushNotification(11, user.mobileToken);
    } catch (error) {
        console.log(error.message);
    }
}

async function requestResponse(userId) {
    try {
        console.log('as');
        const user = await models.User.findOne({ where: { id: userId } });
        await Notification.create({ typeId: 12, userId, model: 'request response', status: false });
        if (user.mobileToken)
            pushNotification.sendPushNotification(12, user.mobileToken);
    } catch (error) {
        console.log(error.message);
    }
}

async function newPublication(postId) {
    try {
        const roles = await models.Role.findAll({
            include: {
                model: models.SystemFunction,
                where: { id: 37 }
            },
        });
        const roleIds = [];
        await roles.forEach((item) => {
            roleIds.push(item.id);
        });
        const users = await models.User.findAll({
            include: {
                model: models.Role,
                where: { id: roleIds }
            }
        });
        await users.forEach((item) => {
            Notification.create({ typeId: 13, userId: item.id, modelId: postId, model: 'publication new', status: false });
        });
        pushNotification.sendUserPushNotifications(13, users);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    newAppointmentAdmission,
    newAppointment,
    cancelAppointment,
    appointmentCompleted,
    glucoseMeasurement,
    newMessage,
    newRequest,
    newPrepatient,
    newAssignedDonative,
    eventInvitation,
    eventContingency,
    messageResponse,
    requestResponse,
    newPublication
}
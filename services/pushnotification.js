// ====================================================
//      PUSH NOTIFICATIONS
//      By ARYA Team ©
// ====================================================

const admin = require('firebase-admin');
const NotificationType = require('../models').NotificationType;

const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://aryaproject-ea993.firebaseio.com'
});

async function sendPushNotification(typeId, userToken) {

    //tipo de notificacion
    var notificationType = await NotificationType.findOne({ where: { id: typeId } });

    //mensaje
    const message = {
        notification: {
            tittle: notificationType.name,
            body: notificationType.message
        }
    }

    //manda la notificacion al usuario
    admin.messaging().sendToDevice(userToken, message)
        .then(function(response) {
            console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });
}

async function sendUserPushNotifications(typeId, users) {
    //array que guardara los objetos
    var tokensArray = [];
    if (users) {
        //recorrer el arreglo del body
        users.forEach((item) => {
            if (item.mobileToken !== null)
                tokensArray.push(item.mobileToken);
        });
    }

    //tipo de notificacion
    var notificationType = await NotificationType.findOne({ where: { id: typeId } });

    //el mensaje de la notificacion
    const message = {
        notification: {
            tittle: notificationType.name,
            body: notificationType.message
        }
    }

    //manda la notificacion
    admin.messaging().sendToDevice(tokensArray, message)
        .then(function(response) {
            console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });
}

async function sendPushNotificationsByTokens(typeId, tokens) {
    //tipo de notificacion
    var notificationType = await NotificationType.findOne({ where: { id: typeId } });

    //el mensaje de la notificacion
    const message = {
        notification: {
            tittle: notificationType.name,
            body: notificationType.message
        }
    }

    //manda la notificacion
    admin.messaging().sendToDevice(tokens, message)
        .then(function(response) {
            console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });
}

module.exports = {
    sendPushNotification,
    sendUserPushNotifications,
    sendPushNotificationsByTokens
}
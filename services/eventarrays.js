// ====================================================
//         EVENT ARRAYS
//      By ARYA Team ©
// ====================================================

function eventResourcesArray(array, eventId) {
    //array que guardara los objetos
    var resourcesArray = [];

    if (array) {
        //recorrer el arreglo del body
        array.forEach((item) => {
            var newEventResource = {
                eventDetailId: eventId,
                resourceId: item.id,
                quantity: item.quantity,
                status: true
            }

            resourcesArray.push(newEventResource);
        });
    }

    return resourcesArray;
}

function eventGuestsArray(array, eventId) {
    //array que guardara los objetos
    guestsArray = [];

    if (array) {
        //recorrer el arreglo del body
        array.forEach((item) => {
            var newGuest = {
                eventDetailId: eventId,
                status: true,
                name: item.name,
                email: item.email,
                phone: item.phone,
                occupations: item.occupation,
                description: item.description
            }

            guestsArray.push(newGuest);
        });
    }
    return guestsArray;
}

function eventParticipantsArray(array, eventId) {
    //array que guardara los objetos
    participantsArray = [];

    if (array) {
        //recorrer el arreglo del body
        array.forEach((item) => {
            var newParticipant = {
                eventDetailId: eventId,
                userId: item.userId,
                participantTypeId: item.participantTypeId,
                status: true
            }

            participantsArray.push(newParticipant);
        });
    }

    return participantsArray;
}

function eventResultParametersArray(array, eventId) {
    //array que guardara los objetos
    resultParametersArray = [];

    //recorrer el arreglo del body
    if (array) {
        array.forEach((item) => {
            var newResultParameter = {
                eventDetailId: eventId,
                resultParameterId: item.resultParameterId,
                minValue: item.minValue,
                maxValue: item.maxValue
            }

            resultParametersArray.push(newResultParameter);
        });
    }

    return resultParametersArray;
}

module.exports = {
    eventResourcesArray,
    eventGuestsArray,
    eventParticipantsArray,
    eventResultParametersArray
}
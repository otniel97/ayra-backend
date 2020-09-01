// ====================================================
//      Service EventDetailPatient
//      By ARYA Team ©
// ====================================================

const EventDetail = require('../models').EventDetail;
const Event = require('../models').Event;
const { saveBitacora } = require('../services/bitacora');
const Patient = require('../models').Patient;
const EventDetailPatient = require('../models').EventDetailPatient;
const MedicalRecord = require('../models').MedicalRecord;

const { Op } = require("sequelize");

//si es hombre o mujer
function genderToWord(body){
    if(body.female === true)
        return 'femenino'
    if(body.male === true)
        return 'masculino'
}

//filtrar los pacientes
async function filterPatients(body){

    var typesArray = [];
    body.diabetesTypes.forEach((item) => {
        typesArray.push(item.id);
    });
    
    //hace el filtrado
    if(body.all === true){
    	var patients = await Patient.findAll({
	        where:{
	        	status: true
	        },
	        include: {
	            model: MedicalRecord,
	            where: {
	                diabetesId: typesArray
	            }
	        }
	    });	
    }
    else{
		var patients = await Patient.findAll({
	        where:{
	        	status: true,
	            gender: genderToWord(body)
	        },
	        include: {
	            model: MedicalRecord,
	            where: {
	                diabetesId: typesArray
	            }
	        }
    	});  	
    }

    return patients;
}

function arrayEventDetailPatient(patients, eventDetailId){

	var detailPatients = [];

    patients.forEach((item) => {
        var newDetailPatient = {
        	patientId: item.id,
        	eventDetailId: eventDetailId,
        	status: true
        }
        detailPatients.push(newDetailPatient);
    });

    return detailPatients;
}

module.exports = {
	filterPatients,
	arrayEventDetailPatient
}


'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('WebContents', [{
            initialDescription: "Bienvenidos al portal de la Fundación “Marjorie” para la prevención y el tratamiento de la diabetes. Desplázate hacia abajo y comienza tu visita hoy.",
            weImage: "weImage.jpg",
            weDescription: "Somos una fundación dedicada al tratamiento y atención de pacientes diabéticos, facilitando su control de citas médicas, manejo del expediente, seguimiento general de sus valores físicos, y otros cuidados pertinentes. La calidad de vida de cada miembro es nuestra prioridad, y es por ello que nuestros servicios son completamente personalizados. Comprendemos las complicaciones y limitaciones de nuestros pacientes, y estamos aquí para ayudarte cuando lo necesites. Contamos con un equipo de expertos a tu disposición. Conócenos, y descubre todos los beneficios que ofrecemos para ti.",
            serviceDescription: "Contamos con los mejores servicios y especialistas disponibles para ti. Únete a nosotros y disfrutá de estos servicios exclusivos para ti.",
            interestDescription: "Conoce más sobre la diabetes y la importancia de esta patología en la vida de las personas",
            newsDescription: "Descubre información de interés sobre la diabetes, tratamiento, cuidado de tu salud y más.",
            eventsDescription: "Entérate de nuestros próximos eventos. ¡Ven y conoce más sobre la diabetes, su tratamiento y prevención!",
            downloadDescription: "Para mayor comodidad en el seguimiento de tus niveles de glucosa, control de citas y agenda de actividades, puedes usar nuestra aplicación móvil. Descarga de inmediato y ten un control personalizado de la Diabetes.",
            downloadImage: "downloadImage.png",
            missionImage: "missionImage.jpg",
            visionImage: "visionImage.jpg",
            targetImage: "targetImage.jpg",
            mainImage: "mainImage.jpg",
            voluntaryTitle: "¿Quieres ser voluntario?",
            voluntaryMessage: "Puedes ser parte de nuestra organización, en especialidades, realización de actividades y eventos, y más.",
            voluntaryDescription: "Para ser voluntario lo primero que debes hacer es contactarnos. Dirígete a la sección de contacto y envia un mensaje. Luego,debes esperar nuestra respuesta y te estaremos informando de cualquier otro detalle. ",
            donationTitle: "¿Cómo realizar una donación?",
            donationMessage: "Toda donación que puedas realizar es bien recibida, tanto de medicinas e insumos, como de papeleria y otras, que contribuyan a buen funcionamiento de nuestra fundación",
            donationDescription: "Para hacer una donación en nuestra fundación lo primero que debes hacer es contactarnos. Dirígete a la sección de contacto y envia un mensaje con los insumos y/o medicamentos con los que deseas colaborar. Luego, debes esperar nuestra respuesta donde te indicaremos el día que puedes acercarte con tus donativos",
            sitesTitle: "Centros y Farmacias",
            sitesMessage: "Ubica los centros y farmacias más cercanos donde encontrarás los medicamentos que necesites al momento",
            createdAt: new Date(),
            updatedAt: new Date(),
            maxService: 3,
            maxGeneral: 3,
        }, ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('WebContents', null, {});

    }
};
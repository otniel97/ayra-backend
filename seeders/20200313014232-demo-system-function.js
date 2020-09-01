'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('SystemFunctions', [{
            name: 'Inicio',
            description: 'Vista principal del usuario al iniciar sesión en el sistema.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Vista principal paciente',
            description: 'Vista principal de un usuario paciente al iniciar sesión en el sistema.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Vista principal médico',
            description: 'Vista principal de un usuario médico al iniciar sesión en el sistema.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Vista principal general',
            description: 'Vista principal de un usuario voluntarioal iniciar sesión en el sistema.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Vista principal administrador',
            description: 'Vista principal de un usuario administrador al iniciar sesión en el sistema.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Agenda',
            description: 'Permiso para ver la agenda donde se visualizan las citas y actividades.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Reportes',
            description: 'Permiso para acceder  a los reportes estructurados, no estructurados  y estadísticos.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Estructurados y no estructurados',
            description: 'Permiso para acceder a los reportes estructurados y no estructurados.',
            status: true,
            parentId: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Estadísticos',
            description: 'Permiso para acceder los reportes estadísticos.',
            status: true,
            parentId: 7,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Gestión de usuarios',
            description: 'Permiso para realizar operaciones referentes a los usuarios del sistema.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Usuarios',
            description: 'Permisos para crear, editar y eliminar la información de los usuarios del sistema.',
            status: true,
            parentId: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Horarios',
            description: 'Permisos para ver el listado de horarios del usuario que inició sesión.',
            status: true,
            parentId: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Asignación de horarios',
            description: 'Permisos para asignar los horarios según la disponibilidad de la persona.',
            status: true,
            parentId: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Asignación de representantes',
            description: 'Permisos para  registrar, actualizar y asignar el representante a un paciente..',
            status: true,
            parentId: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Servicios',
            description: 'Permisos para realizar todo el proceso de servicios de un usuario paciente.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Solicitar cita ',
            description: 'Permisos para solicitar una cita por parte de un usuario paciente.',
            status: true,
            parentId: 15,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Citas pendientes',
            description: 'Permisos para  ver y cancelar las citas pendientes .',
            status: true,
            parentId: 15,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Citas canceladas',
            description: 'Permisos para ver las citas canceladas y solicitar una nueva cita .',
            status: true,
            parentId: 15,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Citas completadas',
            description: 'Permisos para ver el listado de citas completadas con opcion de calificar .',
            status: true,
            parentId: 15,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Control de glucosa',
            description: 'Permiso para registrar, editar y eliminar los registros del control de glucosa.',
            status: true,
            parentId: 15,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Citas médicas',
            description: 'Permisos para gestionar todo el proceso de citas.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Lista de pacientes ',
            description: 'Permisos para ver la lista de pacientes y el historial médico de los mismos.',
            status: true,
            parentId: 21,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Atender citas pendientes',
            description: 'Permisos para ver la lista de  citas pendientes, atender o rechazar las mismas.',
            status: true,
            parentId: 21,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Atender citas de admisión',
            description: 'Permisos para ver la lista de citas de admisión, con opción de aprobar y rechazar, crear usuario paciente y expediente médico.',
            status: true,
            parentId: 21,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Citas canceladas',
            description: 'Permisos para ver la lista de  citas canceladas.',
            status: true,
            parentId: 21,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Citas completadas',
            description: 'Permisos para ver la lista de  citas terminadas de un paciente.',
            status: true,
            parentId: 21,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Actividades',
            description: 'Permisos para realizar el proceso de actividades de la organización.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Crear actividad ',
            description: 'Permisos para crear, editar, ver y eliminar una actividad. Así, como la opción de planificar la misma.',
            status: true,
            parentId: 27,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Planificación de actividades ',
            description: 'Permisos de ver el listado de actividades planificadas, con opción de editarla, eliminarla y agendarla.',
            status: true,
            parentId: 27,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Actividades agendadas ',
            description: 'Permisos de ver el listado de actividades agendadas, con opción de cancelarlas, reprogramarlas y finalizarlas.',
            status: true,
            parentId: 27,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Actividades reagendadas',
            description: 'Permisos de ver el listado de actividades reagendadas, con opción de cancelarlas y reprogramarlas.',
            status: true,
            parentId: 27,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Actividades canceladas',
            description: 'Permisos de ver el listado de actividades canceladas.',
            status: true,
            parentId: 27,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Actividades terminadas',
            description: 'Permisos de ver el listado de actividades terminadas y calificar.',
            status: true,
            parentId: 27,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Lista de actividades',
            description: 'Permisos para ver el listado de las actividades de la organización.',
            status: true,
            parentId: 27,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Publicaciones',
            description: 'Permisos para gestionar el proceso de publicaciones de la organización.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Crear publicación',
            description: 'Permiso para crear, editar y eliminar las publicaciones que realiza la organización.',
            status: true,
            parentId: 35,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Blog',
            description: 'Permiso para ver y comentar las publicaciones realizadas por un usuario de la organización.',
            status: true,
            parentId: 35,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Gestión de solicitudes',
            description: 'Permisos para gestionar el proceso de solicitudes de la organización.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Solicitudes',
            description: 'Permisos para enviar y ver solicitudes por parte de un usuario.',
            status: true,
            parentId: 38,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Atender solicitudes de ingreso',
            description: 'Permisos para atender las solicitudes de ingresos que recibe la organización y programar la cita inicial.',
            status: true,
            parentId: 38,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Administración de solicitudes de usuarios',
            description: 'Permisos para atender otros tipos de solicitudes que recibe la organización.',
            status: true,
            parentId: 38,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Contacto y sugerencia',
            description: 'Permisos de la gestión de contacto y sugerencias de la organización.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Mensajes',
            description: 'Permisos para enviar y ver mensajes.',
            status: true,
            parentId: 42,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Administración de mensajes',
            description: 'Permisos para ver y responder los mensajes de la organización.',
            status: true,
            parentId: 42,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Donaciones',
            description: 'Permiso para crear, editar y eliminar los registros de las donaciones y asignar las mismas a un paciente.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Listado de donaciones',
            description: 'Permiso para ver la lista de donaciones y realizar el registro (crear y  editar) de donaciones que realizan las personas a la organización.',
            status: true,
            parentId: 45,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Asignación de donaciones',
            description: 'Permisos para asignar algún donativo al paciente.',
            status: true,
            parentId: 45,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Donaciones recibidas',
            description: 'Permiso para ver listado de donaciones recibidas del paceinte.',
            status: true,
            parentId: 45,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Calificaciones',
            description: 'Permiso de ver las calificaciones de los servicios y actividades.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Calificaciones de servicios',
            description: 'Permiso de ver las calificaciones de los servicios.',
            status: true,
            parentId: 49,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Calificaciones de actividades',
            description: 'Permiso de ver las calificaciones de las actividades.',
            status: true,
            parentId: 49,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Configuración de la organización',
            description: 'Permisos para registrar, editar, ver y desactivar los datos del perfil, servicios, horarios, colores del sistema e información del portal web de la organización.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Perfil de la organización',
            description: 'Permisos para registrar, editar, ver y desactivar los datos del perfil de la organización.',
            status: true,
            parentId: 52,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Contenido web móvil',
            description: 'Permisos para registrar, editar y ver el contenido web móvil.',
            status: true,
            parentId: 52,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Bloques Horarios',
            description: 'Permisos para registrar, editar, ver y desactivar los horarios de la organización.',
            status: true,
            parentId: 52,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Servicios',
            description: 'Permisos para registrar, editar, ver y desactivar los servicios de la organización.',
            status: true,
            parentId: 52,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'FAQS',
            description: 'Permisos para registrar, editar, ver y desactivar las preguntas frecuentes .',
            status: true,
            parentId: 52,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Información general',
            description: 'Permisos para registrar, editar, ver y desactivar la informacion general del portal web.',
            status: true,
            parentId: 52,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Centros médicos',
            description: 'Permisos para registrar, editar, ver y desactivar la informacion de centros médicos del portal web.',
            status: true,
            parentId: 52,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Farmacias',
            description: 'Permisos para registrar, editar, ver y desactivar la informacion de las farmacias del portal web.',
            status: true,
            parentId: 52,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Colores del sistema',
            description: 'Permisos para registrar, editar, ver y desactivar los colores del sistema.',
            status: true,
            parentId: 52,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Seguridad Funcional',
            description: 'Permisos para  crear, editar, ver y desactivar roles de usuario, asignar y desactivar funciones a los usuarios del sistema.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Roles',
            description: 'Permisos para  crear, editar, ver y desactivar roles de usuario.',
            status: true,
            parentId: 62,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Funciones',
            description: 'Permisos para ver las funciones del sistema.',
            status: true,
            parentId: 62,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Asignar funciones',
            description: 'Permisos para  asignar y desactivar funciones a los usuarios del sistema.',
            status: true,
            parentId: 62,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Configuración básica',
            description: 'Permisos para realizar operaciones básicas (ver, crear, editar y desactivar) sobre los registros básicos del sistema.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo notificación',
            description: 'Permiso para crear, ver y editar el mensaje de un tipo de notificación.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo calificación',
            description: 'Permiso para crear, editar, ver y desactivar   el registro de un tipo de calificación.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo participante',
            description: 'Permiso para crear, editar y desactivar  el registro de un tipo de participante.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo servicio',
            description: 'Permiso para crear, editar y desactivar  el registro de un tipo de servicio.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo mensaje',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo  de mensaje.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo cancelación mensaje',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de cancelación de mensaje.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo de cita',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo  de cita.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo de cancelación de cita',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de cancelación de cita.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo diabetes',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de diabetes.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Enfermedad',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de enfermedades.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Factor riesgo',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de factor riesgo.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo de donativo',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de donación.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Especialidad',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de especialidades.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo persona',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de persona.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo de medición',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de medición.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo de publicación',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de publicación.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Categoría publicación',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de una categoría de publicación.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo actividad',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de actividad.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo cancelación de actividad',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de cancelación de actividad.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Parámetro resultado',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de  párametros de resultados.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Tipo solicitud',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de un tipo de solicitud.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Donativo',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de donativos.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Recursos',
            description: 'Permiso para crear, editar, ver y desactivar  el registro de los recursos.',
            status: true,
            parentId: 66,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Operaciones de base de datos',
            description: 'Permisos de administrar el sistema en funciones como base de datos y bitácora.',
            status: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Bitácora',
            description: 'Permisos de ver  el registro e historial de las operaciones realizada en el sistema por otros usuarios.',
            status: true,
            parentId: 90,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Gestión de base de datos',
            description: 'Permisos para las operaciones de importar, exportar, limpiar y respaldar la base de datos.',
            status: true,
            parentId: 90,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('SystemFunctions', null, {});
    }
};
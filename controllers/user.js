// ====================================================
//      Controller User
//      By ARYA Team ©
// ====================================================

const User = require('../models').User;
const Role = require('../models').Role;
const models = require('../models');
const { Op } = require("sequelize");
const servicePeople = require('../services/people');
const servicePatient = require('../services/patient');
const bcrypt = require('bcrypt');
const { uploadFile } = require('./upload');
const serviceMail = require('../services/email');
const { saveBitacora } = require('../services/bitacora');

//======================================
//Mostrar todos los usuarios
//======================================
async function getUsers(req, res) {
    await User.findAll({
            include: [{
                    model: Role,
                    required: false,
                },
                {
                    model: models.Patient,
                    required: false,
                },
                {
                    model: models.People,
                    required: false,
                }
            ]
        })
        .then(users => {
            if (users.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay usuarios registrados',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    users
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//==============================================
//Mostrar todos los usuarios
//==============================================
async function getUsersByStatus(req, res) {
    let status = req.params.status;
    await User.findAll({
            where: { status },
            include: [{
                    model: Role,
                    required: false,
                },
                {
                    model: models.Patient,
                    required: false,
                },
                {
                    model: models.People,
                    required: false,
                }
            ]
        })
        .then(users => {
            if (users.length === 0) {
                return res.status(200).json({
                    ok: false,
                    message: `No hay usuarios registrados con el estatus ${status}`,
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    users
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//=================================
//Mostrar usuario por id
//=================================
async function getUserById(req, res) {
    let id = req.params.id;
    await User.findOne({
            where: { id },
            include: [{
                    model: Role,
                    required: false,
                },
                {
                    model: models.Patient,
                    required: false,
                },
                {
                    model: models.People,
                    required: false,
                }
            ]
        })
        .then(user => {
            if (user === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No existe un usuario con ese id asociado',
                });
            } else {
                res.status(200).json({
                    ok: true,
                    message: 'correcto',
                    user
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//==============================
//Crear usuario administrador
//==============================
async function saveUser(req, res) {
    let body = req.body;

    if (body.password !== body.passwordConfirm) {
        return res.status(400).json({
            ok: false,
            message: 'Contraseñas no coinciden',
        });
    }

    let checkUser = await User.findOne({
        where: {
            [Op.or]: [{
                    username: {
                        [Op.eq]: body.username
                    }
                },
                {
                    email: {
                        [Op.eq]: body.email
                    }
                }
            ]
        }
    });

    //verificar si el usuario existe
    if (checkUser)
        return res.status(500).send({
            ok: false,
            message: 'Ya existe un usuario con este correo o nombre de usuario',
        });

    let user = {
        email: body.email,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        status: body.status || true,
        roleId: body.roleId,
        mobileApp: true,
        notifications: true
    }

    await User.create(user)
        .then(async user => {
            saveBitacora('User', user.id, user.email, 'create admin', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Usuario creado con éxito',
                user
            });
        })
        .catch(err => {
            res.status(500).send({
                ok: false,
                message: 'Usuario no creado, ha ocurrido un error',
                error: err.parent.detail
            });
        });
}

//==============================
//Actualizar usuario
//==============================
async function updateUser(req, res) {
    let id = req.params.id;

    await User.update(req.body, { where: { id: id } })
        .then(async user => {
            if (user == 1) {
                saveBitacora('User', id, 'update user', 'update', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Usuario actualizado con éxito',
                    user
                });
            } else {
                res.status(200).json({
                    ok: false,
                    message: `No existe el usuario con id = ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el usuario con id = ${id}.`,
                error: err.parent.detail
            });
        });
}

//=====================================
//Activar desactivar usuario
//=====================================
async function statusUser(req, res) {
    let id = req.params.id;

    await User.findOne({
            where: { id },
            include: [{
                    model: models.Patient,
                    required: false,
                },
                {
                    model: models.People,
                    required: false,
                }
            ]
        })
        .then(async user => {
            if (user === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay usuario con el id requerido',
                });
            } else {
                if (user.Patient) {
                    user.status = !user.status;
                    user.Patient.status = !user.Patient.status;
                    user.save();
                    user.Patient.save();
                }
                if (user.Person) {
                    user.status = !user.status;
                    user.Person.status = !user.Person.status;
                    user.save();
                    user.Person.save();
                }
                saveBitacora('User', user.id, user.email, 'update status', req.user.id);
                res.status(200).json({
                    ok: true,
                    message: 'Usuario actualizado con éxito',
                    user
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });
}

//=====================================
//Activar desactivar notificaciones
//=====================================
async function notificationsUser(req, res) {
    let id = req.params.id;

    let user;
    await User.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay usuario con el id requerido',
                });
            } else {
                user = result;
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });

    if (user.notifications === true)
        user.notifications = false;
    else
        user.notifications = true;

    await user.save()
        .then(async data => {
            saveBitacora('User', user.id, user.email, 'update notifications', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Usuario actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el usuario con id = ${id}.`,
                error: err.message
            });
        });
}

//=====================================
//Activar desactivar mobileApp
//=====================================
async function mobileUser(req, res) {
    let id = req.params.id;

    let user;
    await User.findOne({ where: { id } })
        .then(result => {
            if (result === null) {
                return res.status(200).json({
                    ok: false,
                    message: 'No hay usuario con el id requerido',
                });
            } else {
                user = result;
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error: err.message
            });
        });

    if (user.mobileApp === true)
        user.mobileApp = false;
    else
        user.mobileApp = true;

    await user.save()
        .then(async data => {
            saveBitacora('User', user.id, user.email, 'update mobile', req.user.id);
            res.status(200).json({
                ok: true,
                message: 'Usuario actualizado con éxito',
                data
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: `No se pudo actualizar el usuario con id = ${id}.`,
                error: err.message
            });
        });
}

//=========================================
//Actualizar imagen de perfil
//=========================================
async function updateImageProfile(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay archivo seleccionado"
            }
        });
    }
    req.params.type = 'users';
    req.params.format = 'image';
    saveBitacora('User', req.params.id, 'image profile', 'update', req.user.id);
    await uploadFile(req, res)
}

//=========================================
//Crear usuario persona
//=========================================
async function savePeople(req, res) {
    let body = req.body;

    today = new Date().toISOString().slice(0, 10);
    if (body.birthdate >= today)
        res.status(400).json({
            ok: false,
            message: `La fecha de nacimiento debe ser menor que la fecha actual ${today}`
        });
    else {
        let checkUser = await User.findOne({
            where: {
                [Op.or]: [{
                        username: {
                            [Op.eq]: body.username
                        }
                    },
                    {
                        email: {
                            [Op.eq]: body.email
                        }
                    }
                ]
            }
        });

        //verificar si el usuario existe
        if (checkUser)
            return res.status(500).send({
                ok: false,
                message: 'Ya existe un usuario con este correo o nombre de usuario',
            });

        let checkPerson = await models.People.findOne({
                where: {
                    [Op.or]: [{
                            cedula: {
                                [Op.eq]: body.cedula
                            }
                        },
                        {
                            rif: {
                                [Op.eq]: body.rif
                            }
                        }
                    ]
                }
            })
            //verificar si la persona existe
        if (checkPerson)
            return res.status(500).send({
                ok: false,
                message: 'Ya existe un usuario con este rif o cédula',
            });

        let user = {
            email: body.email,
            username: body.username,
            password: bcrypt.hashSync(body.password, 10),
            status: body.status || true,
            roleId: body.roleId,
            mobileApp: true,
            notifications: true
        }

        await User.create(user)
            .then(async user => {
                saveBitacora('User', user.id, user.email, 'create people', req.user.id);
                //servicePeople.savePeople(req, res, user)
                var context = {
                    email: user.email,
                    username: user.username,
                    password: body.password,
                    name: body.name
                }

                if (serviceMail.sendMail('Registro de usuario', body.email, 'welcome', context))
                    servicePeople.savePeople(req, res, user)
                else
                    return res.status(200).json({
                        ok: false,
                        message: 'No se ha podido enviar correo de confirmacion.'
                    })
            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Usuario no creado, ha ocurrido un error',
                    error: err.parent.detail
                });
            });;
    }
}

//=========================================
//Crear usuario paciente
//=========================================
async function savePatient(req, res) {
    let body = req.body;

    today = new Date().toISOString().slice(0, 10);
    if (body.birthdate >= today)
        res.status(400).json({
            ok: false,
            message: `La fecha de nacimiento debe ser menor que la fecha actual ${today}`
        });
    else {
        let checkUser = await User.findOne({
            where: {
                [Op.or]: [{
                        username: {
                            [Op.eq]: body.username
                        }
                    },
                    {
                        email: {
                            [Op.eq]: body.email
                        }
                    }
                ]
            }
        });
        if (checkUser)
            return res.status(500).send({
                ok: false,
                message: 'Ya existe un usuario con este correo o nombre de usuario',
            });

        let checkPatient = await models.Patient.findOne({
                where: {
                    [Op.or]: [{
                            cedula: {
                                [Op.eq]: body.cedula
                            }
                        },
                        {
                            rif: {
                                [Op.eq]: body.rif
                            }
                        }
                    ]
                }
            })
            //verificar si la persona existe
        if (checkPatient)
            return res.status(500).send({
                ok: false,
                message: 'Ya existe un usuario con este rif o cédula',
            });

        let user = {
            email: body.email,
            username: body.username,
            password: bcrypt.hashSync(body.password, 10),
            status: false,
            roleId: body.roleId,
            mobileApp: true,
            notifications: true
        }

        await User.create(user)
            .then(user => {
                saveBitacora('User', user.id, user.email, 'create patient', req.user.id);
                //servicePatient.savePatient(req, res, user)
                var context = {
                    email: user.email,
                    username: user.username,
                    password: body.password,
                    name: body.name
                }

                if (serviceMail.sendMail('Registro de usuario', body.email, 'welcome', context))
                    servicePatient.savePatient(req, res, user)
                else
                    return res.status(200).json({
                        ok: false,
                        message: 'No se ha podido enviar el correo de confirmación.'
                    })
            })
            .catch(err => {
                res.status(500).send({
                    ok: false,
                    message: 'Usuario no creado, ha ocurrido un error',
                    error: err.parent.detail
                });
            });;
    }
}

//esto es solo para probar los emails
/*async function sendMailUser(req, res){
    let body = req.body;
    let user = await User.findOne({where: {id: 12}});
    var context = {
        email: body.email,
        username: body.username,
        password: body.password,
        name: body.name
    }

    if (serviceMail.sendMail('Registro de usuario', body.email, 'welcome', context))
        return res.status(200).json({
            ok: true,
            message: 'Usuario creado con éxito'
        });
    else
        return res.status(200).json({
            ok: false,
            message: 'No se ha podido enviar el correo de confirmación.'
        })
}*/

module.exports = {
    getUsers,
    getUsersByStatus,
    getUserById,
    saveUser,
    updateUser,
    statusUser,
    notificationsUser,
    mobileUser,
    updateImageProfile,
    savePeople,
    savePatient
}
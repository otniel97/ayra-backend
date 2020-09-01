// ====================================================
//      Controller Application
//      By ARYA Team ©
// ====================================================

const User = require('../models').User;
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const generator = require('generate-password');
const serviceMail = require('../services/email');
const { Op } = require("sequelize");
const Role = require('../models').Role;
const People = require('../models').People;
const Patient = require('../models').Patient;
const SystemFunction = require('../models').SystemFunction;
const { saveBitacora } = require('../services/bitacora');

async function login(req, res) {
    let body = req.body;

    await User.findOne({
            where: {
                [Op.or]: [{
                        username: {
                            [Op.eq]: body.user
                        }
                    },
                    {
                        email: {
                            [Op.eq]: body.user
                        }
                    }
                ]
            },
            include: [Role, Patient, People]
        })
        .then(async user => {
            if (!user)
                return res.status(200).json({
                    ok: false,
                    message: 'El usuario no existe en el sistema'
                });

            if (!bcrypt.compareSync(body.password, user.password))
                return res.status(200).json({
                    ok: false,
                    message: 'Contraseña incorrecta'
                });

            else {
                if (!user.status)
                    return res.status(400).json({
                        ok: false,
                        message: 'Usuario bloqueado, comuníquese con la organización'
                    });
                //Asignar el token y hacer el login
                let token = jwt.sign({ user: user }, process.env.SEED, { expiresIn: process.env.EXPIRATION_DATE });
                let role = await Role.findOne({
                    where: { id: user.Role.id },
                    include: [SystemFunction]
                })
                var set = [];
                set.push(1);
                await role.SystemFunctions.forEach((item) => {
                    if (item.parentId != null)
                        set.push(item.parentId);
                    set.push(item.id);
                });
                let functions = [...new Set(set)];
                //actualizar el last login at
                user.lastLoginAt = new Date();
                if (body.mobileToken)
                    user.mobileToken = body.mobileToken;
                await user.save();
                saveBitacora('User', user.id, user.email, 'login', user.id);
                //regresar la respuesta
                return res.status(200).json({
                    ok: true,
                    message: 'Login realizado con exito',
                    user: user,
                    functions,
                    token: token
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                err: err.message
            });
        });
}

//================================
//       Cambiar contraseña
//================================
async function changePassword(req, res) {
    let body = req.body;

    //get usuario autenticado
    let id = req.user.id;
    let user = await User.findOne({ where: { id } })

    //verificar que las contraseñas sean correctas
    if (body.newPassword !== body.newPasswordConfirm)
        return res.status(200).json({
            ok: false,
            message: 'El campo contraseña y confirmar contraseña deben ser iguales'
        });
    console.log(user);

    //verificar que la contraseña actual sea correcta
    if (!bcrypt.compareSync(body.password, user.password))
        return res.status(200).json({
            ok: false,
            message: 'Contraseña incorrecta'
        });
    else {
        //encriptar la nueva contraseña
        bcrypt.genSalt(10, async function(error, salt) {
            bcrypt.hash(body.newPassword, salt, async function(error, hash) {
                if (error) {
                    return res.status(500).send(error);
                }

                //asignar nueva contraseña al usuario
                User.update({ password: hash }, { where: { id: user.id } }).then(updatedUser => {
                        saveBitacora('User', user.id, user.email, 'Update password', user.id);
                        console.log(updatedUser);
                        return res.status(200).json({
                            ok: true,
                            message: 'Contraseña cambiada con éxito.'
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            ok: false,
                            message: 'Ha ocurrido un error',
                            error: err.message
                        });
                    });
            })
        })
    }
}

//================================
//       Recuperar contraseña
//================================
async function recoverPassword(req, res) {
    let body = req.body;

    //revisar si el email esta asociado a un usuario
    User.findOne({ where: { email: body.email } }).then(user => {
        if (!user)
            return res.status(200).json({
                ok: false,
                message: 'No existe un usuario asociado a ese correo.'
            });

        else {
            //generar nueva contrasenna
            var newPassword = generator.generate({ length: 20, numbers: true });

            //encriptar contraseña
            bcrypt.genSalt(10, async function(error, salt) {
                bcrypt.hash(newPassword, salt, async function(error, hash) {
                    if (error) {
                        return res.status(500).send(error);
                    }

                    //asignar nueva contraseña al usuario
                    User.update({ password: hash }, { where: { id: user.id } }).then(updatedUser => {
                            //enviar correo con clave temporal

                            //contexto para el correo. La variables que recibe
                            var context = {
                                email: body.email,
                                password: newPassword,
                            }

                            //Comprobar si se envió el correo
                            if (serviceMail.sendMail('Recuperación de contraseña', body.email, 'passwordRecovery', context)) {
                                saveBitacora('User', user.id, user.email, 'Reset password', user.id);
                                res.status(200).json({
                                    ok: true,
                                    message: 'Se ha enviado la nueva contraseña a: ' + user.email
                                });
                            } else
                                return res.status(500).json({
                                    ok: false,
                                    message: 'No se ha podido enviar el correo de confirmación'
                                });

                        })
                        .catch(err => {
                            res.status(500).json({
                                ok: false,
                                message: 'Ha ocurrido un error',
                                error: err.message
                            });
                        });
                })
            })
        }
    });
}

//================================
//  Registrar usuario (temporal)
//================================

/*estructura del JSON
{
    "username": "testUser5",
    "email": "prueba@gmail.com",
    "password": "holamundo",
    "role": 1
}
*/

async function registerUser(req, res) {
    let body = req.body;

    //Para encontrar el id del rol correspondiente a paciente
    let role = await Role.findOne({ where: { id: body.role } });

    //Esto para revisar si ya existe un usuario con ese username o email registrado
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

    //sino existe
    else {

        let user = {
            username: body.username,
            email: body.email,
            password: body.password,
            statusUser: "pending approval", //ahorita este es un nombre como provisional
            status: true,
            verificationCode: "a",
            roleId: role.id
        }

        bcrypt.genSalt(10, async function(error, salt) {
            bcrypt.hash(user.password, salt, async function(error, hash) {
                if (error) {
                    return res.status(500).send(error);
                }
                user.password = hash;
                await User.create(user)
                    .then(user => {
                        res.status(200).json({
                            ok: true,
                            message: 'Usuario creado con éxito.',
                            user
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            ok: false,
                            message: 'Usuario no creado, ha ocurrido un error',
                            error: err.parent.detail
                        });
                    });;

            });
        });
    }
}


module.exports = {
    login,
    changePassword,
    recoverPassword,
    registerUser
}
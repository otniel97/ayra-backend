'use strict';
const User = require('../models').User
const Post = require('../models').Post

module.exports = {
    up: async(queryInterface, Sequelize) => {
      const user = await User.findAll()
      const post = await Post.findAll()
      
      return queryInterface.bulkInsert('Comments', [{
        message: 'Que bueno, me gustaria probarlo',
        status: true,
        userId: user[3].id,
        postId: post[0].id,
        createdAt:new Date(),
        updatedAt:new Date()
      } , {
        message: 'Sería bueno que todo el personal de la fundación pudiera asistir a este taller también',
        status: true,
        userId: user[5].id,
        postId: post[2].id,
        createdAt:new Date(),
        updatedAt:new Date()
      } , {
        message: 'Es recomendable que todo la familia que vive con el paciente diabetico asista a estos talleres',
        status: true,
        userId: user[1].id,
        postId: post[2].id,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
   
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Comments', null, {});
    
  }
};

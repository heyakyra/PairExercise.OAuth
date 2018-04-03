const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/loggin', {logging: false})

const User = db.define('users', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING,
  }
})

module.exports = {
  db,
  User
}


//1044276389797-5cfotuf6prsnlkjhv653u46le7jn1erb.apps.googleusercontent.com

//QKiFAE_Xc_amP5CkFHgOS1fw

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.statics.signup = async function(email, password) {

  if (!email || !password) {
    throw Error('Необходимо заполнить все поля')
  }
  if (!validator.isEmail(email)) {
    throw Error('Некорректный email')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Слабый пароль')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Пользователь с таким email уже существует')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('Необходимо заполнить все поля')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Некорректный email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Некорректный пароль')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
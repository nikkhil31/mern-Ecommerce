import User from '../models/userModel.js'

export const checkEmailDuplication = async value => {
  //   console.log('from dupli')
  try {
    const user = await User.findUserByEmail(value)
    if (user) {
      return Promise.reject('E-mail already in use')
    }
  } catch (error) {
    return Promise.reject(error.message)
  }
}

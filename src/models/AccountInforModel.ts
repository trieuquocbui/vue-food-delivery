class UserModel {
  phoneNumber!: string
  fullName!: string
  address?: string
  gender?: number
  dob?: Date
}

export default class AccountModel {
  username!: string
  password!: string
  conformPassword!: string
  thumbnail?: string
  status?: number
  user: UserModel = new UserModel()
}

export { UserModel }

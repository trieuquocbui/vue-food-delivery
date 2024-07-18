import type AccountModel from './AccountInforModel'
import type OrderModel from './OrderModel'

export default class AssignmentModel {
  _id?: string
  admin?: AccountModel
  employee!: string | AccountModel
  order!: string | OrderModel
  status?: number
  assignedAt?: Date
}

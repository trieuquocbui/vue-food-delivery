import { UserModel } from './AccountInforModel'
import type ProductModel from './ProductModel'

class OrderDetailModel {
  product!: ProductModel | string
  quantity!: number
  price!: number
  _id!: string
}

export default class OrderModel {
  _id!: string
  customer!: UserModel | string
  totalAmount!: number
  status!: number
  address1!: string
  address2!: string
  createdAt!: Date
  assignmented?: Boolean
  orderDetails!: OrderDetailModel[]
}

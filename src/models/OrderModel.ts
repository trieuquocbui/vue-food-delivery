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
  address!: string
  createdAt!: Date
  orderDetails!: OrderDetailModel[]
}

import { InforModel } from './AccountInforModel'

class OrderDetailModel {
  productId!: string
  quantity!: number
  price!: number
  _id!: string
}

export default class OrderModel {
  _id!: string
  customerId!: InforModel | string
  totalAmount!: number
  status!: number
  address!: string
  createdAt!: Date
  orderDetails!: OrderDetailModel[]
}

export default class ProductModel {
  id!: string
  name!: string
  description!: string
  quantity?: number
  status!: boolean
  featured!: boolean
  price?: number
  categoryId!: string
  thumbnail!: string
  sold?: number
  appliedAt?: Date
}

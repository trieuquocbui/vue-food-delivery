export default class ValidatedProductModel {
  id?: string
  name!: string
  description!: string
  quantity!: string
  status!: boolean
  featured!: boolean
  price!: string
  categoryId!: string
  file!: string
}
